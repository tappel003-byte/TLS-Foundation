// The sitewide reading order for the mobile prev/next buttons. Matches the
// header's own left-to-right, top-to-bottom order (Header.astro's
// topLevel, then each folder top-to-bottom in the order the folders
// appear, then Contact Us last) -- NOT the old narrative "read the story"
// order, which buried the Reference/Interactive Tools folders' pages
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
  { path: '/symptom-guide', name: 'Symptom Guide' }, // Interactive Tools
  { path: '/cause-library', name: 'Cause Library' },
  { path: '/crack-gauge', name: 'Printable Crack Gauge' },
  { path: '/send-photos', name: 'Send Us Photos' },
  // contactUs (Header.astro), rendered last
  { path: '/contact-us', name: 'Contact Us' },
];

// A second, fully separate chain for the "Draft (temp)" folder's own pages
// (Header.astro), in the order they're listed there. Kept isolated from
// `pageFlow` on purpose -- the whole reason drafts are excluded above is so
// a live page's "next" never drops a visitor into an unfinished draft.
// Chaining drafts to each other doesn't reintroduce that risk as long as
// this list never touches the live one: MobilePageFlowNav only consults
// this array when the current page isn't found in `pageFlow` at all, and
// nothing in `pageFlow` ever points into this list. Gives Tim prev/next
// while reviewing the deep-dive pages without waiting for promotion.
export const draftPageFlow: { path: string; name: string }[] = [
  { path: '/foundation-repair-methods-v2', name: 'Foundation Repair Methods v2' },
  { path: '/helical-piers-deep-dive', name: 'Helical Piers Deep Dive' },
  { path: '/push-piers-deep-dive', name: 'Push Piers Deep Dive' },
  { path: '/micropiles-deep-dive', name: 'Micropiles Deep Dive' },
  { path: '/compaction-grouting-deep-dive', name: 'Compaction Grouting & Mud Jacking Deep Dive' },
  { path: '/foam-injection-deep-dive', name: 'Foam Injection Deep Dive' },
  { path: '/drainage-correction-deep-dive', name: 'Drainage & Grading Deep Dive' },
  { path: '/monitoring-deep-dive', name: 'Monitoring Deep Dive' },
  { path: '/custom-solutions-deep-dive', name: 'Custom Solutions Deep Dive' },
];
