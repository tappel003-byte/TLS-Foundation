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
    // Root-relative path, e.g. '/images/job-notes/some-photo.webp'. Optional --
    // falls back to a plain header if omitted.
    heroImage: z.string().optional(),
    // Manual override to hold a dated article back regardless of publishDate.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
