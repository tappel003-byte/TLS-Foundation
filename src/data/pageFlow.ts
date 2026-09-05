// The sitewide reading order, derived from the unbroken chain already
// formed by every page's own `nextPage` prop (Layout -> PageSummary).
// Single source of truth for MobilePageFlowNav's prev/next lookup --
// keep this in sync if a page's nextPage target ever changes.
export const pageFlow: { path: string; name: string }[] = [
  { path: '/', name: 'Home' },
  { path: '/our-approach', name: "Why NM's Different" },
  { path: '/why-foundations-move', name: 'Why Foundations Move' },
  { path: '/cause-library', name: 'Cause Library' },
  { path: '/expansive-soil', name: 'Expansive Soil' },
  { path: '/collapsible-soil', name: 'Collapsible Soil' },
  { path: '/symptom-guide', name: 'Symptom Guide' },
  { path: '/common-concerns', name: 'Common Concerns' },
  { path: '/foundation-repair-methods', name: 'Services' },
  { path: '/new-mexico-soil-conditions', name: 'Soil Roadmap' },
  { path: '/central-new-mexico', name: 'Central New Mexico' },
  { path: '/northern-new-mexico', name: 'Northern New Mexico' },
  { path: '/four-corners', name: 'Four Corners' },
  { path: '/eastern-new-mexico', name: 'Eastern New Mexico' },
  { path: '/southern-new-mexico', name: 'Southern New Mexico' },
  { path: '/albuquerque-nm', name: 'Albuquerque' },
  { path: '/rio-rancho-nm', name: 'Rio Rancho' },
  { path: '/santa-fe-nm', name: 'Santa Fe' },
  { path: '/homeowner-decision-series', name: 'Homeowner Decision Series' },
  { path: '/soil-movement', name: 'Soil & Movement' },
  { path: '/glossary', name: 'Glossary' },
  { path: '/contact-us', name: 'Contact Us' },
];
