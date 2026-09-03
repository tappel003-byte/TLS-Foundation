This directory holds Job Notes articles as markdown files. It's empty on
purpose -- nothing publishes until real articles are added.

## Adding an article

Create a new `.md` file here (the filename becomes the URL slug, e.g.
`swamp-cooler-season.md` → `/job-notes/swamp-cooler-season`) with
frontmatter matching this shape:

```md
---
title: "A title for the article"
description: "Meta description, ~160 characters or under."
summary: "Longer summary shown in the Summarize-this-page popup -- a
  paragraph or two is fine."
publishDate: 2026-04-01
heroImage: "/images/job-notes/whatever.webp"   # optional
draft: false                                    # optional, defaults to false
---

The article body goes here as normal markdown -- paragraphs, `##`
headings, `> blockquotes` (styled as pull-quotes), lists, links.
```

## How publishing actually works

There's no manual "publish" step. An article with a `publishDate` in the
future produces zero output at build time -- no page exists for it, not
even an unlinked one -- until a build happens to run on or after that
date. `.github/workflows/scheduled-rebuild.yml` makes sure a build runs
once a day regardless of whether anyone pushed a commit, so a
pre-written, future-dated article goes live on its own on the right day.

Setting `draft: true` holds an article back regardless of its
`publishDate` -- use it if something needs to stay hidden past its date
for any reason.

## Making the section public

The listing page (`/job-notes`) and this whole mechanism work today, but
the site's nav (`src/components/Header.astro`) doesn't link to it yet.
Add that link when the section is ready to be public -- until then the
page exists (reachable if someone knows the URL) but isn't advertised
anywhere on the site.
