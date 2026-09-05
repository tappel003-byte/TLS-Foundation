# Content trim log

Running record of content cut from the site during the "earn a call, not a
lecture" pass. Nothing here is gone for good — every entry has a commit
hash. `git show <hash>` shows the exact diff; `git show <hash>:<path>`
pulls the whole file as it existed right before that cut. If something on
this list turns out to matter, it's a restore, not a rewrite.

Entries are newest first.

---

## Glossary (`src/pages/glossary.astro`)

**Commit:** `66aa0d4`

Ran the systematic repeated-phrase scan (7-word shingles) across the
full 86-term glossary rather than spot-reading a sample, given the file's
size. Came back almost entirely clean — this is reference content where
topical closeness between related terms (Expansive Clay vs. Expansive
Soil, Settlement vs. Differential Settlement) is intentional, each term
needs to stand alone. Also grepped for the sitewide manifesto phrases
("Sandia GEO," "you reach the owner," "55 years," etc.) — found exactly
one mention of Sandia GEO, appropriately placed inside the definition of
"Conflict of Interest" (the one term where it's actually the relevant
example), not scattered as padding.

- **One real duplicate found:** the "Dead Load" and "Push Pier" entries
  each independently derived the identical conclusion — that wood-frame
  NM homes lack enough dead load to drive push piers to depth — in
  near-identical wording. Trimmed Dead Load's version down to a pointer
  ("see Push Pier for why...") linking to the entry where that
  conclusion actually belongs, using the existing inline related-term
  popup mechanism rather than writing new UI.
- **Kept as-is:** all 86 term definitions, the two-tier short/long
  description structure (brief text feeds the DefinedTermSet schema and
  the popup; longer text is the full definition), the A-Z letter nav,
  and the autocomplete search.

## Foundation Repair Methods (`src/pages/foundation-repair-methods.astro`)

**Commit:** `e99b09c`

This page already avoided the "same argument restated" problem — it
correctly never imports the investigation-first/Sandia GEO argument that
belongs to `/our-approach`. The real issue was narrower: 4 of the 8
method cards (Push Piers, Micropiles, Compaction Grouting, Foam
Injection) had "expand for more" bodies that were pure filler — vaguer
restatements of the preview text with zero new information ("one of
several tools we may use," "not a one-size-fits-all answer") — unlike
the Drainage card right next to them, which names specific real hazards
(Mancos Shale heave, karst voids, mine subsidence).

- Replaced all 4 filler bodies with genuine technical distinctions:
  Push Piers now states the real reason they're usually wrong for NM
  residential work (not enough dead load in wood-frame construction to
  seat them) — a fact already stated on `index.astro`'s services list
  but missing from this page's own dedicated card. Micropiles now
  explains why they're chosen (drilled/grouted, not driven/torqued —
  works where hard rock or caliche stops a helical pier). Compaction
  Grouting and Foam Injection now explicitly distinguish themselves
  from each other (densifying soil under pressure vs. lifting by
  expansion force) instead of each just disclaiming "not a universal
  fix" in different words.
- **Kept as-is:** the 4-step process flow, the stats bar, the Drainage
  card's original body (already the strongest of the 8), and all 6
  symptom flip-cards.

---

## Draft promotions (Home, Why NM's Different, Why Foundations Move, Common Concerns)

**Commit:** `74024eb`

Tim: "go balls deep, get it all done" -- the 4 already-fixed, already-
verified drafts are promoted to replace their live counterparts, since
redoing the same fix twice (once in draft, once live) would be wasted
work. The live pages now have the interactive widgets (tabs, stepper,
clickable spectrum, faceted concern-finder) and the content fixes
described in the "Draft redesigns" entry below.

- `index.astro` (Home) replaced with the fixed home-v2 content.
- `our-approach.astro` (the canonical "Why NM's Different" page)
  replaced with the fixed our-approach-v2 content -- this was the
  single highest-priority promotion, since every other page is
  supposed to link to this page rather than re-derive its argument,
  and it was the most repetitive page on the site until now.
- `why-foundations-move.astro` replaced with the fixed
  why-foundations-move-v2 content.
- `common-concerns.astro` replaced with the fixed common-concerns-v2
  content. Its 18 "related question" links pointed at
  `/common-concerns-v2#...` anchors -- rewrote all 18 to
  `/common-concerns#...` before promoting, since those are now the
  live page's own anchors, not a separate draft's.
- All 4 `-v2.astro` draft files deleted; the temp "Draft (temp)" nav
  folder removed from `Header.astro` since there are no more drafts
  to route to separately.
- Verified: clean build (22 pages, down from 26 with drafts), zero
  dangling `-v2` references except in this repo's own explanatory
  comments, all 4 promoted pages screenshot-checked, every interactive
  element re-tested after promotion (tab clicks, stepper clicks,
  spectrum clicks, facet-checkbox filtering all still work).

## Grok independent-audit fixes (Albuquerque, Santa Fe)

**Commit:** `851102f`

Tim brought in Grok for a second-opinion content audit against this repo.
Most of Grok's findings didn't hold up on inspection (Rio Rancho's "Always
Be Closing" heading was already removed in an earlier commit; the claim
that common-concerns-v2's 18 answers only exist in client-side JS was
checked against the actual build output and is false — they're fully
present in the static HTML). But four findings were real and are fixed
here:

- **Albuquerque, North Valley section**: the body paragraph and the
  pull-quote next to it said almost the identical sentence about the
  river determining where the city was founded in 1706 — a duplicate
  within one section that both my own pass and Grok's read caught (Grok
  first). Removed the 1706 callback from the body paragraph (Section 1
  and the Duke City section already own that fact) and replaced the
  pull-quote with a fresh point about moisture undermining pier repairs,
  which also naturally added a second "helical pier" mention to a page
  where that term had gone thin after the SEO-accordion cut.
- **Albuquerque zone names weren't headings.** West Mesa, North Valley,
  South Valley, East Side, and The Heights were styled `<div>`s, not
  `<h3>`s — real structural weakness for a page whose actual unique
  value is "here's what's different zone to zone." Converted all five to
  `<h3>` (with a margin reset so the conversion is visually invisible).
- **Santa Fe had the identical `<h3>` twice** — "Common foundation
  concerns in Santa Fe homes" in both Section 1 and Section 2. I'd
  actually noted this in the original Santa Fe review and left it as
  minor; fixing it now. Section 2's heading (which sits over a paragraph
  about the *pattern* of repeat problems, not the list Section 1 has)
  is now "Why these signs repeat across Santa Fe."

## Draft redesigns (home-v2, our-approach-v2, why-foundations-move-v2,
## common-concerns-v2)

**Commit:** `fc783e5`

Tim's call: the 4 redesign drafts were widget reskins (accordion → tabs,
accordion → stepper, static grid → clickable spectrum) with content left
verbatim identical to what they replaced — which is the exact "same page,
different wrapper" problem flagged sitewide. This pass went after content
duplication *within* each draft, not just visual variety.

- **home-v2.astro**: cut the "Dark Band" section entirely — it restated
  the "55 years / NM soil knowledge" stat the page had already made in the
  stat band, word for word in mood, zero new information. Trimmed the
  first tab panel's opening paragraph, which restated the Method
  Statement directly above it ("the method follows the diagnosis") in
  different words. Fixed a real contradiction: the closing CTA claimed
  "we don't have an About Us page... it's not about us" directly under a
  Story section (the "Jerry Maguire moment" narrative) that IS about-us
  content — rewrote the close to argue urgency instead of a claim the
  page itself was disproving. Removed the orphaned `.dark-band` CSS left
  behind by the cut.
  **Follow-up (self-caught on a re-check):** the first pass claimed
  "you reach the owner(s)" went from 4 mentions to 1, but a literal grep
  before/after showed the real number was 3 reader-facing mentions, not
  4, and the fix had only touched 1 of the 3 — the "Something's changing
  fast" routing card still said the identical phrase verbatim
  ("Text or call — you reach the owner, not a scheduler."), missed
  entirely in the first pass. Reworded that card so the phrase now
  appears exactly once on the page (in the tab panel, where it's
  actually explained), not three times.
- **our-approach-v2.astro**: this is the canonical "Why NM's Different"
  page every other page is supposed to link to rather than re-derive —
  and it was repeating *itself* three times in three wrappers. The
  stepper's "investigation" and "toolkit" panels covered
  investigation-before-recommendation and the Sandia GEO revenue-
  separation point; the differences grid then had a card for each of
  those same two points again; the Model section then named the same
  mechanisms a third time as a supporting list. Cut the two duplicate
  diff-grid cards (six things → four things — the four remaining are
  genuinely new material), trimmed the Model section's mechanism list
  down to the point it's actually making, and cut the closing "Land of
  Entrapment" dark band, which just re-said Section 1's own pull-quote
  with no new information. Diff-grid CSS reflowed from a 3-column (now
  orphaned) layout to a clean 2×2.
- **why-foundations-move-v2.astro**: cut "The Honest Caveat" section,
  which restated the introduction's own closing paragraph almost
  word-for-word ("not a diagnostic tool... gives you vocabulary to ask
  better questions") nine sections later, right before the closing CTA.
  Also removed orphaned `.video-link` CSS in both this draft and the
  live page — leftover from the "prefer it on camera" video-page link
  removed when the video pages came down.
- **common-concerns-v2.astro**: this page didn't have the other three
  drafts' problem — its 18 FAQ answers are deliberately cross-referenced,
  and topical overlap between related questions is intentional (each
  answer needs to stand alone for someone landing on it directly from a
  search). The one real redundancy was structural: the hero tagline, the
  intro paragraph, and the "mission-note" block all made the same "these
  are expensive keywords, here's an honest answer instead of a sales
  pitch" point back to back before the reader reached the actual tool.
  Trimmed mission-note down to the one detail the other two don't cover
  (that contractors pay for these searches).
- **Kept as-is:** all 18 Common Concerns answers, the Symptom Matrix, the
  Intervention Spectrum, "What the Industry Gets Wrong," the geology
  stepper panels, and every diff-grid card that wasn't a duplicate.

---

## Fixes to earlier cuts (regressions caught and closed)

**Commit:** `e7126f3`

- **Albuquerque lost its only on-page mentions of "foam injection" and
  "mudjacking"** when the SEO accordion was deleted (`f8db413`) — verified
  by grep after the fact, not caught during the original cut. Both terms
  are covered site-wide on `/foundation-repair-methods`, but this specific
  page had zero mentions left. Fixed by naming both methods in the West
  Mesa section's existing concrete-lifting line, which already touched the
  topic without naming the methods. No padding added back — just closed
  the gap the cut opened.

---

## Santa Fe (`src/pages/santa-fe-nm.astro`)

**Commit:** `c821337`

- **Cut entirely: the "A-E-G" pro-card grid** in Section 6 ("The Difference")
  — three cards (architects, structural engineers, geotechnical
  investigation) where two of the three just restated points already made
  elsewhere on the page. Card "E" (structural engineers) and card "G"
  (Sandia GEO / investigation threshold) were near-repeats of Section 3
  ("Our Approach"), which already says the investigation-threshold point in
  full. Kept the one genuinely new fact — Santa Fe has a deep bench of
  architects experienced in historic earthen construction — folded into the
  section's lede paragraph instead of its own card. Full original text is
  in the commit diff.
- **Deduplicated a verbatim sentence** that appeared almost word-for-word
  in both Section 2 ("Adobe & Construction") and Section 3 ("Our
  Approach"): "Aggressive pier installation or excavation appropriate for
  a modern concrete slab can cause additional damage to an earthen
  structure. The repair method has to match the structure — not just the
  symptom." Kept it in Section 2, where it belongs thematically. Section
  3's copy was rewritten to make its own point (repair-method decisions,
  not just diagnosis, are where TLS operates differently) without
  restating the adobe-damage fact Section 2 already owns.
- **Trimmed Section 1's ("What We See") heave/settlement/crack-pattern
  paragraph** — it restated Section 2's opening paragraph almost
  word-for-word ("Heave and settlement express themselves differently in
  adobe walls than in concrete slabs..."). Section 2 exists specifically to
  go deep on this; Section 1 now makes the point in one sentence and points
  forward instead of re-explaining it in full.
- **Kept as-is:** the three geology flip-cards (each covers a genuinely
  distinct soil hazard), the History section (Palace of the Governors / San
  Miguel Chapel facts aren't repeated anywhere else), and the 12-item
  desktop / 8-item mobile concern accordions (a proper media-query split,
  not a triple-stack like Albuquerque's original bug).

---

## Rio Rancho (`src/pages/rio-rancho-nm.astro`)

**Commit:** `d374b44`

- **Section 5 ("Our Approach") lost its opening paragraph** — the
  Glengarry Glen Ross "ABC" callback ("That instruction never left the
  business. It just changed products. A rep at the door, a number before
  the tape measure is back in the truck, a signature requested the same
  afternoon. We have seen estimates arrive with a discount attached that
  expires if you don't sign that day. ABC.") was the second of three
  tellings of the same joke on one page. The section's actual point — cost
  follows soil, not a same-day quote — is kept, just without the retread.
- **Section 6 ("The Difference") dropped the "Three letters, used
  differently" ABC-reversal framing** — third telling of the same bit.
  The three cards' actual content (soil investigation first, ask before
  you sign, owner-operated/no scheduler) is kept, relabeled 1/2/3 instead
  of A/B/C, headings reworded to drop the forced wordplay.
- **Section 7 (Q&A accordion) cut from 11 items to 8**: removed "Foundation
  repair Rio Rancho NM — where do you start?" (generic opener, restates
  Section 1) and "Foundation settlement Rio Rancho NM" (restates Section 3
  geology). Merged "Helical piers" + "Push piers" into one "Piers" item —
  both were making the same "soil profile decides the pier" point for two
  different pier types.
- **Kept as-is:** the creed card (Glengarry Glen Ross reference, told once,
  now the only telling), all of History/Geology/Construction Eras
  (sections 1-4), and the "cost follows cause / don't let someone quote
  you before they know the soil" point Tim specifically asked to keep.

## Albuquerque (`src/pages/albuquerque-nm.astro`)

**Commit:** `d374b44`

- **Section 7 ("Duke City") lost its retelling of the 1706 founding
  story** — Section 1 already tells it, with the better line ("The extra
  'r' dropped over time. The ground didn't change at all."). Duke City's
  opening paragraph now just uses the name as a given and moves straight
  to the zones-in-one-city point, instead of re-narrating "In 1706, the
  Duke of Alburquerque's title was planted..." The Old Town Plaza fact box
  (San Felipe de Neri Church, 1793) stays — that's a different fact, not a
  repeat.

**Commit:** `f8db413` (first pass, already pushed)

- **Cut entirely: the "S-G-L" pro-card grid** in the old Duke City section
  — three cards ("Structural engineers with local context," "Geotechnical
  investigation when it matters," "Local knowledge franchises don't
  have") that existed mainly to say "national franchises don't have local
  knowledge" twice. Full original text is in the commit diff.
- **Cut entirely: the 13-item "SEO accordion"** (`id="foundation-concerns"`,
  ~120 lines) — restated the five zone sections' facts under different
  keyword phrasings (helical piers, cracks, heave, settlement, adobe, all
  already covered earlier on the same page in better, more specific form).
  On mobile it was the *third* time the same facts appeared on one page,
  after the zone sections and the condensed mobile accordion. Full
  original text is in the commit diff.
