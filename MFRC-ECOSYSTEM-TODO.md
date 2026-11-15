# MFRC / TLS / SandiaGEO / FRA disclosure & linking — to-do

Decided, not hypothetical: disclose common ownership across all four
properties instead of leaving it unstated. Stress-tested with six AI
responses across four systems (Claude, Gemini x2, Perplexity x2, ChatGPT,
Grok) using a corrected, non-leading prompt that gave them permission to
read the actual sites/repos. Unanimous verdict: disclose, don't hide — net
positive for all four properties, no concrete objection to the core
strategy survived.

## Do this now at TLS — doesn't wait on anything else

- [ ] **Rewrite `Footer.astro`'s ownership line.** It currently says TLS's
      evaluation model "has no financial interest in finding something to
      sell" — flagged independently by three separate AI responses
      (Perplexity, ChatGPT, Gemini) as overstated. Being paid a flat
      investigation fee isn't the same as the ownership group having zero
      stake in downstream repair revenue — TLS sells the repairs. The fix
      already exists, just on the wrong page: `contact-us.astro` already
      says it precisely —
      > "TLS Foundations and SandiaGEO are owned by the same principals.
      > We keep investigation and repair as separate revenue streams on
      > purpose — so that when we evaluate your foundation, the
      > recommendation follows the evidence, not the invoice."
      Bring that phrasing (or close to it) into the Footer. Don't invent
      new language — the precise version is already written and live.

Everything else below either waits on MFRC's own disclosure going live
first (don't have TLS actively point at an undisclosed-looking MFRC), or
waits on the About Us page (~Jan 1, per Tim going full-time).

## The hardest question, and where it landed

Does disclosure fully kill the "trust-transfer" critique — MFRC builds
credibility, that credibility gets spent downstream where TLS/SandiaGEO/FRA
make money? Unanimous answer across all six responses: no, not entirely —
that's structurally true of any expert who publishes free education while
also practicing (the physician/patient-guide, engineer/method-notes
comparison came up independently in two responses). What disclosure
actually does is convert it from a hidden vulnerability into an ordinary,
disclosed fact — the critique shrinks from "you're running a deceptive
front" to "you educate people and also sell the services you educate them
about," which is how every reputable content-driven service business
works. Nobody found a version of the critique that survives *as evidence of
deception* once disclosure is real and in the right place.

## Convergent findings (confirmed independently by multiple responses)

- Retire "independent educational resource" as MFRC's blanket headline
  claim. It's an express claim, and a disclosure elsewhere on the site
  doesn't cure an express claim that's false (this was the one sharp,
  sourced objection that survived the whole exercise — citing FTC material
  on company-controlled sites claiming independent opinions).
- Disclosure needs to sit *at the point of recommendation* — near the
  article/byline, and right beside any actual mention of TLS/SandiaGEO/FRA
  — not just in a footer or on a standalone disclosure page a reader has to
  go find.
- Ownership *facts* should stay identical regardless of region (an Arizona
  reader needs to know about the TLS connection too, not just FRA) — only
  the "which provider to actually contact" service link should vary by
  region.
- Keep links contextual/editorial, not a sitewide footer link network.
  Branded anchor text only (company name or article title, never a
  commercial search phrase). Consider `rel="nofollow"` on MFRC's outbound
  links to TLS/SandiaGEO/FRA specifically to signal "this is for human
  navigation, not passing ranking credit" and remove any algorithmic
  ambiguity (Gemini's suggestion).
- TLS ranking better *because of* MFRC is a reasonable goal, but the real
  mechanism isn't link equity (which the nofollow guidance above
  deliberately caps) — it's entity trust: Google and AI answer engines
  building a picture of "this is the same real, credible people" from
  consistent disclosed signals, plus branded search growth as readers
  trust MFRC and later search for TLS by name directly. Don't expect the
  hyperlink itself to move rankings; expect the disclosed, consistent
  identity to.
- A good asset already exists and should be reused, not reinvented:
  SandiaGEO's own contact page already states plainly, "Sandia GEO and TLS
  Foundations share the same two owners." TLS's contact page has the
  matching language. Surface this existing phrasing more prominently
  rather than drafting something new.

## One real disagreement in the council — Tim's call, not resolved here

Foundation Repair Advocate's homepage says "We're independent of repair,
not opposed to it." Perplexity wants this softened the same way as MFRC's
"independent," on the theory that an ordinary reader hears an ownership
claim, not just a scope claim. Gemini disagrees — argues it's literally
true (FRA does zero repair work or commissions anywhere) and just needs the
ownership disclosure added *alongside* it, not retreated from, since
walling off the conflict in Arizona while disclosing the NM connection
actually reinforces credibility rather than undermining it. Not settled;
decide when FRA's disclosure page gets its update.

---

## MFRC (repo: `myfoundationrepairconsultant`)

- [ ] Retire "independent educational resource" as the blanket sitewide
      label (see above) — replace with accurate language about the actual
      editorial practice (no CTAs, no lead forms, will say when repair
      isn't needed) without using "independent" as the headline framing.
- [ ] Add ownership disclosure in three layers, not just one:
  1. A single "Ownership & Editorial Practices" page — full explanation of
     who owns/writes MFRC, what TLS/SandiaGEO/FRA each sell, and MFRC's
     actual no-CTA/no-lead-form practices.
  2. A short, plain-text ownership note near article bylines/openings,
     linking to that full page — not relying on a footer a reader may
     never reach.
  3. A specific inline note beside any actual mention or recommendation of
     TLS, SandiaGEO, or FRA (e.g. "TLS Foundations is owned by MFRC's
     publisher and sells foundation repair services") — don't rely on the
     general disclosure page to cover the moment it's actually relevant.
- [ ] Sitewide footer, region-aware on the *service link*, consistent on
      the *ownership fact*:
  - Plain text naming TLS Foundations, SandiaGEO (ownership fact, same
    everywhere) — hyperlinks not required to satisfy disclosure; one
    internal link to the full Ownership & Editorial Practices page is
    enough and avoids the Google link-structure question almost entirely.
  - Region-specific: which provider is actually relevant to contact (NM →
    TLS/SandiaGEO, AZ → FRA).
  - Decide whether it shows on Knowledge Center articles
    (`[...slug].astro`, `isArticle` pages) or only hub/structural pages —
    `BaseLayout` already receives a `hub` prop and `[...slug].astro`
    already knows `isArticle`, so this is a small prop addition.
- [ ] Consider turning the current one-link referral page into a genuine
      options directory — list TLS/SandiaGEO/FRA as commonly-owned, but
      also give real guidance on vetting *other* local providers. Makes
      the page legitimately useful beyond funneling to your own
      businesses, which weakens the trust-transfer critique in substance,
      not just in wording (Gemini's suggestion).
- [ ] Retiring `/investigate-further` and `/investigate-further-arizona`
      entirely is now optional, not required — zero organic search
      impressions means no SEO cost either way, but the pages may still
      serve a real navigational purpose (separating "just learning" from
      "ready for a referral") independent of the disclosure question. If
      retired: remove both entries from `SiteHeader.astro` nav, remove
      both paths from `BaseLayout.astro`'s `quotePages` set, and fix the 6
      inbound links so nothing breaks (`foundation-behavior-in-arizona.astro`,
      `foundation-behavior-in-new-mexico.astro`, `know-before-you-sign.astro`,
      `start-here.astro`, plus the two pages' own cross-links) — run
      `npm run check-links` after.
- [ ] Amend `AGENTS.md` itself once the footer/disclosure exists — its
      current rule ("only `/investigate-further` may link to operating
      companies") will otherwise directly contradict the new footer.
- [ ] Do **not** create a separate Google Business Profile for MFRC — not
      a local storefront/service-area business, wouldn't qualify.

## TLS Foundations (this repo)

- [x] ~~Rewrite Footer.astro's "no financial interest" line~~ — see "Do
      this now," above. Not blocked on anything else.
- [ ] About Us page (blocked on Tim going full-time, ~Jan 1): disclose the
      MFRC/SandiaGEO/FRA relationship plainly, reuse the existing "owned by
      the same principals... recommendation follows the evidence, not the
      invoice" language rather than inventing new phrasing, work in
      "sometimes the ground works, and sometimes it doesn't" to the
      founding story.
- [ ] Link out to specific MFRC articles from TLS content pages where it
      genuinely fits — only after MFRC's own disclosure is live (don't
      point to an undisclosed-looking site). Frame as "we also publish
      this," never as outside validation. Anchor text on the article
      title/topic, not a commercial phrase.
- [ ] Google Business Profile: add Posts/Updates linking to helpful MFRC
      articles — same sequencing, after MFRC discloses. Keep the primary
      GBP website URL as tlsfoundations.com.

## SandiaGEO (sandiageo.com — not in this repo)

- [ ] Already has the clearest disclosure language in the whole ecosystem
      ("share the same two owners," on its contact page) — just needs a
      reciprocal link to TLS's About Us page (and eventually MFRC) once
      that page exists. SandiaGEO already links to TLS one-way.
- [ ] Its "Distress Investigations" page recommends TLS by name but doesn't
      disclose common ownership right at that recommendation — add it
      there specifically, not just rely on the separate contact page.

## Foundation Repair Advocate (foundationrepairadvocate.com — Squarespace, not in this repo)

- [ ] Add an ownership disclosure alongside its existing scope disclosure
      (`/disclosure/` currently covers scope only — what the service
      is/isn't — not who runs it or what else they own).
- [ ] Decide the "independent of repair" wording question — see "one real
      disagreement," above.
