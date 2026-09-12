import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// "Job Notes" articles. Each entry is a markdown file in src/content/articles/
// with frontmatter matching the schema below. publishDate gates whether the
// article gets built at all -- see src/pages/job-notes/[slug].astro and
// index.astro, both of which filter to publishDate <= now. An article dated
// in the future produces zero output (no page exists, not even unlinked)
// until a later build runs past that date -- see
// .github/workflows/scheduled-rebuild.yml for what triggers that build.
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // Meta description -- keep under ~160 characters, matching the rest of the site.
    description: z.string(),
    // Shown in the "Summarize this page" popup (see PageSummary.astro).
    summary: z.string(),
    publishDate: z.date(),
    // Groups the article under one of the topic filters on the /job-notes
    // index page (see src/pages/job-notes/index.astro for labels).
    topic: z.enum(['water-drainage', 'soil-ground', 'diagnosis-timing', 'bids-scope']),
    // Root-relative path, e.g. '/images/job-notes/some-photo.webp'. Optional --
    // falls back to a plain header if omitted.
    heroImage: z.string().optional(),
    // Slugs of other articles this one pairs naturally with (e.g. two notes
    // on the same underlying mechanism). Rendered as a small "Related field
    // note" list at the bottom of the article -- gated the same way as any
    // other cross-link, so a slug listed here before its own publishDate
    // simply doesn't render until it's actually live.
    relatedNotes: z.array(z.string()).default([]),
    // Manual override to hold a dated article back regardless of publishDate.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
