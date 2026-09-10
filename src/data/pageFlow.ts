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
// standalone nav destination. They stay in this prev/next chain right
// after Services either way, since someone who does land on one from
// either of those links should still be able to step through the rest.
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
  // method pages, not in a nav folder -- reached contextually from
  // Services and Glossary, see the comment above
  { path: '/helical-piers-deep-dive', name: 'Helical Piers' },
  { path: '/push-piers-deep-dive', name: 'Push Piers' },
  { path: '/micropiles-deep-dive', name: 'Micropiles' },
  { path: '/compaction-grouting-deep-dive', name: 'Compaction Grouting & Mud Jacking' },
  { path: '/foam-injection-deep-dive', name: 'Foam Injection' },
  { path: '/drainage-correction-deep-dive', name: 'Drainage and Grading Correction' },
  { path: '/monitoring-deep-dive', name: 'Monitoring' },
  { path: '/custom-solutions-deep-dive', name: 'Custom Solutions' },
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
