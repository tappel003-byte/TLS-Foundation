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
//
// Also handles /api/track -- a small write-only conversion log in the
// EVENTS D1 database. Cloudflare Web Analytics (the beacon already on
// every page) only ever reports page views; it has no public custom-
// event API, so "which pages actually turn into a call or a submitted
// form" isn't something it can answer on its own. This fills that one
// gap without pulling in Google Analytics, which Tim explicitly wants
// to hold off on. No PII here -- event type, page path, an optional
// short detail string, and the referrer header. The actual name/phone/
// message on a submitted form still only ever goes to Web3Forms -> the
// inbox, same as before; this table never sees it.

export interface Env {
  PHOTOS?: R2Bucket;
  EVENTS?: D1Database;
  ASSETS: Fetcher;
}

const MAX_BYTES = 10 * 1024 * 1024; // 10MB per photo
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

// Event names come from two sources: the sitewide phone/text click
// delegation in Layout.astro (a short fixed set), and the existing
// per-page `track(name, params)` helpers already sprinkled through
// Symptom Guide and Cause Library (region_selected, print_results_clicked,
// send_to_tls_submitted, etc.) -- those were built for GA4, which is off,
// so a strict enum here would silently drop all of that richer, already-
// designed instrumentation instead of finally giving it somewhere to go.
// A shape/length check is enough of a guard against junk.
const EVENT_TYPE_PATTERN = /^[a-z0-9_]{1,64}$/;

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

    if (request.method === 'POST' && url.pathname === '/api/track') {
      return handleTrack(request, env);
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

async function handleTrack(request: Request, env: Env): Promise<Response> {
  if (!env.EVENTS) return json({ ok: false }, 503);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false }, 400);
  }
  if (typeof body !== 'object' || body === null) return json({ ok: false }, 400);

  const { event_type, page, detail } = body as Record<string, unknown>;
  if (typeof event_type !== 'string' || !EVENT_TYPE_PATTERN.test(event_type)) {
    return json({ ok: false }, 400);
  }
  if (typeof page !== 'string' || page.length === 0 || page.length > 200) {
    return json({ ok: false }, 400);
  }
  const detailStr = typeof detail === 'string' ? detail.slice(0, 100) : null;
  const referrer = request.headers.get('referer')?.slice(0, 300) || null;

  await env.EVENTS.prepare('INSERT INTO events (event_type, page, detail, referrer) VALUES (?, ?, ?, ?)')
    .bind(event_type, page.slice(0, 200), detailStr, referrer)
    .run();

  // 204 keeps this cheap to fire from sendBeacon/fetch(keepalive) without
  // the caller needing to do anything with a response body.
  return new Response(null, { status: 204 });
}
