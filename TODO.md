# TODO

## Build city pages: Ruidoso, Cloudcroft, Alamogordo

Three more New Mexico mountain towns to add to the City Pages set, joining
the existing six (Albuquerque, Rio Rancho, Santa Fe, Las Cruces, Gallup,
Farmington). This was originally scoped in a different, unrelated repo
("toolbox-v3") by mistake -- moved here on 2026-11-23 since that's where
the actual tlsfoundations.com site lives and deploys from.

Each should follow the same standard the existing six were held to:

- Real, specific regional geology -- not boilerplate with the town name
  swapped in. Genuine research into what's actually different about each
  town's soil/foundation conditions (elevation, basin geology, construction
  era, whatever is actually distinct), the same way Las Cruces got the
  irrigated-farmland-to-subdivision mechanism and Gallup got Mancos Shale.
- Added to `Header.astro`'s "City Pages" nav folder alongside the existing
  six, and to the `LocalBusiness` schema's `areaServed` array in
  `src/layouts/Layout.astro`.
- A flat navy placeholder hero, not a reused photo from another page,
  unless/until a real photo exists for that town specifically.
- Genuine structural differentiation from the other six pages -- same
  family, different members, not a copy-paste template with find/replace.
- Internal links out to relevant glossary terms, methods, and other
  city/regional pages where the content naturally calls for it (the gap
  found and fixed sitewide on 2026-11-22/23 -- see git log for that work).

Not started yet. No content, research, or page scaffolding exists for any
of the three as of this entry.
