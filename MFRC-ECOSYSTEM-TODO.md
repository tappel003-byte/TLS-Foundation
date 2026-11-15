# MFRC / TLS / SandiaGEO / FRA disclosure & linking — to-do

Decided, not hypothetical: disclose common ownership across all four
properties instead of leaving it unstated. Reasoning and verification behind
this call (so it doesn't need re-litigating later):

- TLS already discloses its SandiaGEO affiliation sitewide (Footer.astro)
  with no penalty, ranking fine — real proof disclosed affiliation between
  differently-functioned, commonly-owned companies is something Google
  tolerates, not just theory.
- Reread TLS's `our-approach.astro` against MFRC's
  `how-the-industry-has-changed.html` directly: genuinely different jobs
  (TLS is operationally assertive — refuses free estimates, refers out
  drainage work, recommends monitoring on the record; MFRC teaches
  pattern-recognition) at real depth on both sides. Not duplicate content.
- Stress-tested the plan with Claude and Gemini independently, both asked
  explicitly to find concrete objections rather than hedge. Neither found
  one — both came back with implementation guardrails, not reasons not to
  do it.
- SandiaGEO's own site already links to TLS by name (its "Distress
  Investigations" page, one-way, not yet reciprocal) — part of this is
  already live and has caused no issue.

What "independent" means on MFRC: describes editorial behavior (no CTAs,
no lead forms, will say repair isn't needed), not unaffiliated ownership.
That distinction holds and doesn't need to change.

---

## MFRC (repo: `myfoundationrepairconsultant`)

- [ ] Build a sitewide footer (none exists today — `BaseLayout.astro` has
      no `<footer>` at all). Region-aware:
  - New Mexico pages → TLS Foundations + SandiaGEO
  - Arizona pages → Foundation Repair Advocate
  - Plain, descriptive disclosure language, not imperative/CTA wording
    (e.g. "Published by the managing partners of TLS Foundations and
    SandiaGEO" — not "Need a repair? Call TLS today")
  - Anchor text stays on the company name or article title only — never a
    commercial search phrase (Gemini's catch, matches Google's actual
    link-spam/anchor-text guidance)
  - Decide whether the footer shows on Knowledge Center articles
    (`[...slug].astro`, `isArticle` pages) or only on hub/structural
    pages — `BaseLayout` already receives a `hub` prop and `[...slug].astro`
    already knows `isArticle`, so this is a small prop addition, not a
    fight with the architecture
- [ ] Retire `/investigate-further` and `/investigate-further-arizona`
      (zero organic search impressions in a full year of GSC data — no
      equity to protect by keeping them)
  - Remove both entries from `SiteHeader.astro` nav
  - Remove both paths from `BaseLayout.astro`'s `quotePages` set
  - Fix the 6 inbound links so nothing breaks (AGENTS.md: "never leave
    broken internal links" — run `npm run check-links` after):
    `foundation-behavior-in-arizona.astro`, `foundation-behavior-in-new-mexico.astro`,
    `know-before-you-sign.astro`, `start-here.astro`, plus the two pages'
    own internal cross-links
  - Decide whether "most visitors never need this page" reassurance needs
    a new home (maybe `start-here`) or is fine just going away with the page
- [ ] Do **not** create a separate Google Business Profile for MFRC — it's
      not a local storefront/service-area business, it wouldn't qualify
      (Gemini's catch)

## TLS Foundations (this repo)

- [ ] About Us page (still blocked on Tim going full-time, ~Jan 1): disclose
      the MFRC / SandiaGEO / FRA relationship plainly, reconcile with the
      existing "no financial interest in finding something to sell"
      language already live in `Footer.astro`, work in "sometimes the
      ground works, and sometimes it doesn't" to the founding story
- [ ] Link out to specific MFRC articles from TLS content pages where it
      genuinely fits (e.g. bid-reading, know-before-you-sign-style content)
      — not a fixed quota, only where MFRC's content does the job better
      than TLS's own commercial voice could. Anchor text on the article
      title/topic, not a commercial phrase.
- [ ] Google Business Profile: add Posts/Updates linking to helpful MFRC
      articles ("learn more" style). Keep the primary GBP website URL as
      tlsfoundations.com — the Post link is separate from that field.

## SandiaGEO (sandiageo.com — not in this repo)

- [ ] Add a reciprocal link to TLS Foundations' About Us page (and
      eventually MFRC) once that page exists — SandiaGEO already links to
      TLS one-way; this closes the loop

## Foundation Repair Advocate (foundationrepairadvocate.com — Squarespace, not in this repo)

- [ ] Add an ownership disclosure alongside its existing scope disclosure
      (`/disclosure/` page currently covers scope only — what the service
      is/isn't — not who runs it or what else they own)

## Open / still deciding

- [ ] Whether to send the stress-test prompt to the rest of the AI council
      (ChatGPT, Grok, Copilot, Perplexity, DeepSeek) — paused for now, not
      declined
