# Content trim log

Running record of content cut from the site during the "earn a call, not a
lecture" pass. Nothing here is gone for good — every entry has a commit
hash. `git show <hash>` shows the exact diff; `git show <hash>:<path>`
pulls the whole file as it existed right before that cut. If something on
this list turns out to matter, it's a restore, not a rewrite.

Entries are newest first.

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

**Commit:** `<pending>`

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
