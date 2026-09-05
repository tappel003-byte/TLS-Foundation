// The sitewide reading order for the mobile prev/next buttons. Matches the
// header's own left-to-right, top-to-bottom order (Header.astro's
// topLevel, then each folder top-to-bottom in the order the folders
// appear, then Contact Us last) -- NOT the old narrative "read the story"
// order, which buried the Reference/Interactive Guides folders' pages
// right after Why Foundations Move instead of where they sit in the nav.
//
// Deliberately excludes the temp "Draft (temp)" folder -- those 4 pages
// were spliced in here for review at one point, which meant a real
// visitor clicking "next" on the real Homeowner Decision Series page (the
// last item before Contact Us) got dropped into a draft page instead of
// Contact Us. Drafts aren't part of the permanent nav, so they aren't
// part of this chain either -- reach them via the Draft (temp) folder
// directly, not prev/next.
//
// Single source of truth for MobilePageFlowNav's prev/next lookup --
// keep this in sync if Header.astro's nav structure ever changes.
export const pageFlow: { path: string; name: string }[] = [
  // topLevel (Header.astro), left to right
  { path: '/', name: 'Home' },
  { path: '/our-approach', name: "Why NM's Different" },
  { path: '/why-foundations-move', name: 'Why Foundations Move' },
  { path: '/common-concerns', name: 'Common Concerns' },
  { path: '/foundation-repair-methods', name: 'Services' },
  // folders (Header.astro), left to right, each top to bottom
  { path: '/albuquerque-nm', name: 'Albuquerque' }, // City Pages
  { path: '/rio-rancho-nm', name: 'Rio Rancho' },
  { path: '/santa-fe-nm', name: 'Santa Fe' },
  { path: '/new-mexico-soil-conditions', name: 'Soil Roadmap' }, // NM Soils
  { path: '/northern-new-mexico', name: 'Northern New Mexico' },
  { path: '/central-new-mexico', name: 'Central New Mexico' },
  { path: '/four-corners', name: 'Four Corners' },
  { path: '/eastern-new-mexico', name: 'Eastern New Mexico' },
  { path: '/southern-new-mexico', name: 'Southern New Mexico' },
  { path: '/glossary', name: 'Glossary' }, // Reference
  { path: '/expansive-soil', name: 'Expansive Soil' },
  { path: '/collapsible-soil', name: 'Collapsible Soil' },
  { path: '/symptom-guide', name: 'Symptom Guide' }, // Interactive Guides
  { path: '/cause-library', name: 'Cause Library' },
  { path: '/soil-movement', name: 'Soil & Movement' }, // In Depth
  { path: '/homeowner-decision-series', name: 'Homeowner Decision Series' },
  // contactUs (Header.astro), rendered last
  { path: '/contact-us', name: 'Contact Us' },
];
