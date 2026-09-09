// Small Worker that runs ONLY in front of /api/* (see wrangler.jsonc's
// assets.run_worker_first) -- every other request continues being served
// straight from the static `dist` build, completely untouched. This is
// intentionally a hand-written Worker rather than an Astro SSR adapter:
// switching the whole site to server rendering just to get one upload
// endpoint would have meant every existing static page picking up a new
// rendering mode for no reason. This keeps the blast radius to /api/* only.
//
// Handles photo uploads for the homeowner photo-submission tool
// (/send-photos) into the PHOTOS R2 bucket, and serves them back out by
// key. Object keys are random UUIDs -- not enumerable, not tied to any
// index a stranger could browse -- which is a proportionate privacy bar
// for "photos of a crack in someone's living room," not medical- or
// financial-grade data. No accounts, no auth, matching the rest of the
// tool's "no sign-in, tap a link" design.

export interface Env {
  PHOTOS?: R2Bucket;
  ASSETS: Fetcher;
}

const MAX_BYTES = 10 * 1024 * 1024; // 10MB per photo
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/upload-photo') {
      return handleUpload(request, env);
    }

    if (request.method === 'GET' && url.pathname.startsWith('/api/photos/')) {
      return handleServe(url, env);
    }

    return json({ error: 'Not found' }, 404);
  },
};

async function handleUpload(request: Request, env: Env): Promise<Response> {
  if (!env.PHOTOS) {
    return json({ error: 'Photo storage is not set up yet. Please call or text (505) 991-4180 instead.' }, 503);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!ALLOWED_TYPES.has(contentType)) {
    return json({ error: 'Unsupported file type. Please upload a JPEG, PNG, WEBP, or HEIC photo.' }, 400);
  }

  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > MAX_BYTES) {
    return json({ error: 'Photo is too large. Please keep each photo under 10MB.' }, 413);
  }

  const body = await request.arrayBuffer();
  if (body.byteLength === 0) {
    return json({ error: 'Empty upload.' }, 400);
  }
  if (body.byteLength > MAX_BYTES) {
    return json({ error: 'Photo is too large. Please keep each photo under 10MB.' }, 413);
  }

  const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
  const key = `${crypto.randomUUID()}.${ext}`;

  await env.PHOTOS.put(key, body, {
    httpMetadata: { contentType },
  });

  return json({ ok: true, key, url: `/api/photos/${key}` });
}

async function handleServe(url: URL, env: Env): Promise<Response> {
  if (!env.PHOTOS) return json({ error: 'Not found' }, 404);

  const key = url.pathname.replace('/api/photos/', '');
  if (!key) return json({ error: 'Not found' }, 404);

  const object = await env.PHOTOS.get(key);
  if (!object) return json({ error: 'Not found' }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('cache-control', 'private, max-age=31536000, immutable');

  return new Response(object.body, { headers });
}
