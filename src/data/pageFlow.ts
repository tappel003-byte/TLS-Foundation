// The sitewide reading order for the prev/next buttons (every viewport
// width -- see MobilePageFlowNav.astro). Matches the header's own
// left-to-right, top-to-bottom order (Header.astro's topLevel, then each
// folder top-to-bottom in the order the folders appear, then Contact Us
// last) -- NOT the old narrative "read the story" order, which buried the
// Reference/Interactive Tools folders' pages right after Why Foundations
// Move instead of where they sit in the nav.
//
// The 8 method pages and the promoted Services rewrite used to live in a
// temp "Draft (temp)" nav folder, deliberately excluded from this chain so
// a live page's "next" could never drop a visitor into an unfinished
// draft (they had their own separate draftPageFlow chain in the meantime).
// They later got a permanent "Methods" nav folder of their own, then lost
// it again -- per Tim, those 8 pages were only ever meant to be reached
// contextually (the "Read the full technical breakdown" links on
// /foundation-repair-methods and the matching glossary terms), not as a
// standalone nav destination, so they're left out of this array entirely.
// They used to be included right after Services on the theory that
// someone landing on one from a contextual link should still be able to
// step through the rest -- but the 8 pages only ever show the "Back to
// Services" pill (see backToServices in Layout.astro), never this
// component, so that theory never actually worked in practice: clicking
// "Next" from Services dropped a visitor into Helical Piers with no way
// to keep going forward, only back. Leaving them out fixes that --
// Services' "next" now goes straight to the first real nav destination.
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
  // The 8 method pages (Helical Piers, Push Piers, Micropiles, Compaction
  // Grouting & Mud Jacking, Foam Injection, Drainage and Grading
  // Correction, Monitoring, Custom Solutions) are deliberately absent --
  // see the comment above.
  // folders (Header.astro), left to right, each top to bottom
  { path: '/albuquerque-nm', name: 'Albuquerque' }, // City Pages
  { path: '/rio-rancho-nm', name: 'Rio Rancho' },
  { path: '/santa-fe-nm', name: 'Santa Fe' },
  { path: '/new-mexico-soil-conditions', name: 'Soil Roadmap' }, // NM Soils
  // "NM" here, not "New Mexico" -- per Tim, shortens the pill on
  // MobilePageFlowNav.astro; every other page reference to these
  // regions (H1, breadcrumbs, nav folder) keeps the full name, this is
  // scoped to the pill label only.
  { path: '/northern-new-mexico', name: 'Northern NM' },
  { path: '/central-new-mexico', name: 'Central NM' },
  { path: '/four-corners', name: 'Four Corners' },
  { path: '/eastern-new-mexico', name: 'Eastern NM' },
  { path: '/southern-new-mexico', name: 'Southern NM' },
  { path: '/glossary', name: 'Glossary' }, // Reference
  { path: '/expansive-soil', name: 'Expansive Soil' },
  { path: '/collapsible-soil', name: 'Collapsible Soil' },
  { path: '/job-notes', name: 'Job Notes' },
  { path: '/symptom-guide', name: 'Symptom Guide' }, // Interactive Tools
  { path: '/cause-library', name: 'Cause Library' },
  // "Crack Gauge" here, not "Printable Crack Gauge" -- per Tim, same
  // pill-only shortening as the NM regions above. The page itself (nav
  // dropdown, title, H1, breadcrumb) still says "Printable Crack Gauge".
  { path: '/crack-gauge', name: 'Crack Gauge' },
  { path: '/send-photos', name: 'Send Us Photos' },
  // contactUs (Header.astro), rendered last
  { path: '/contact-us', name: 'Contact Us' },
];
