import fs from 'fs';

// Shared page shell (hero, layout, script, style) -- identical pattern to
// central-new-mexico-v2.astro, just parameterized. Sub-area content below
// is copied verbatim from the live accordion pages, restructured into
// always-visible zone sections instead of collapsed accordion panels.

function renderZoneSection(zone, sectionNum, zoneNum) {
  const hazardsHtml = zone.hazards
    .map(
      (h) => `                    <li class="warning-item">
                      <button class="warning-trigger"><span class="warning-trigger-text">${h.title}</span><span class="warning-trigger-icon">+</span></button>
                      <div class="warning-drawer"><div class="warning-drawer-inner">${h.desc}</div></div>
                    </li>`
    )
    .join('\n');

  return `        <!-- ${String(sectionNum).padStart(2, '0')} ${zone.title.toUpperCase()} -->
        <section class="section" id="${zone.id}">
          <span class="section-num">${String(sectionNum).padStart(2, '0')}</span>
          <div class="section-inner">
            <div class="zone-strip reveal">
              <div class="zone-strip-num"><span>${String(zoneNum).padStart(2, '0')}</span></div>
              <div class="zone-strip-content">
                <div class="zone-strip-title">${zone.title}</div>
                <div class="zone-strip-tag">${zone.citiesShort}</div>
              </div>
            </div>

            <div class="two-col reveal">
              <div>
                <p class="basin-tagline">${zone.tagline}</p>
                <p><span class="field-label">What we see when we drive up</span> ${zone.whatWeSee}</p>
                <p><span class="field-label">What this geology does to foundations</span> ${zone.whatItDoes}</p>
              </div>
              <div>
                <div class="zone-warnings">
                  <span class="zone-warning-label">What TLS sees and repairs most here</span>
                  <ul class="warning-list">
${hazardsHtml}
                  </ul>
                </div>
              </div>
            </div>

            <div class="communities-band reveal">
              <span class="communities-band-label">Communities we serve in this basin</span>
              <p>${zone.communities}</p>
            </div>
          </div>
        </section>
`;
}

function renderNavLinks(zones) {
  return zones
    .map((z) => `          <li><a href="#${z.id}"><span class="nav-dot"></span>${z.title}</a></li>`)
    .join('\n');
}

function renderPage(cfg) {
  const zonesHtml = cfg.zones.map((z, i) => renderZoneSection(z, i + 2, i + 1)).join('\n');
  const navLinks = renderNavLinks(cfg.zones);

  const majorCitiesHtml = cfg.majorCities
    .map((c) => (c.href ? `<a href="${c.href}">${c.name}</a>` : c.name))
    .join(' · ');

  return `---
// Regional soil page -- restyled in the magazine visual language shared
// with the 3 city pages (sticky left nav, numbered sections, zone
// treatment) instead of the previous single-accordion layout. Generated
// by gen_regional_v2.mjs, which is the source of truth for this file's
// shell (hero/nav/script/CSS shared across all 5 regional pages) --
// edit the generator's per-region data and re-run it, don't hand-edit
// the generated section content directly.
import Layout from '../layouts/Layout.astro';
import RegionalNav from '../components/RegionalNav.astro';

const title = '${cfg.title} Soil Conditions | TLS Foundations';
const summary = ${JSON.stringify(cfg.summary)};
const description = ${JSON.stringify(cfg.description)};

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '${cfg.title} Soil Conditions',
    description,
    about: description,
    author: { '@type': 'Organization', name: 'TLS Foundations' },
    publisher: { '@type': 'Organization', name: 'TLS Foundations' },
    url: 'https://www.tlsfoundations.com/${cfg.slug}',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tlsfoundations.com' },
      { '@type': 'ListItem', position: 2, name: 'New Mexico Soil Conditions', item: 'https://www.tlsfoundations.com/new-mexico-soil-conditions' },
      { '@type': 'ListItem', position: 3, name: '${cfg.title}', item: 'https://www.tlsfoundations.com/${cfg.slug}' },
    ],
  },
];
---

<Layout
  title={title}
  description={description}
  footer="minimal"
  schema={schema}
  ogImage="/images/${cfg.heroImage}"
  summary={summary}
  pageName="${cfg.title}"
  nextPage={{ path: '${cfg.nextPage.path}', name: '${cfg.nextPage.name}' }}
>
  <div class="cnm-page">
    <!-- HERO -->
    <div class="hero">
      <div class="hero-photo"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-eyebrow">New Mexico Soil Conditions</span>
        <h1 class="hero-h1">
          <span class="w1">${cfg.heroLine1}</span><span class="w2">${cfg.heroLine2}</span>
        </h1>
        <p class="hero-sub">
          ${cfg.heroSub}
        </p>
        <div class="hero-cta">
          <span class="hero-cities-label">Major cities in this region</span>
          <p class="hero-aside" set:html={${JSON.stringify(majorCitiesHtml)}} />
        </div>
      </div>
    </div>

    <div class="gold-rule"></div>

    <div class="page-layout">
      <!-- LEFT NAV -->
      <nav class="left-nav">
        <div class="nav-progress"><div class="nav-progress-fill" id="progressFill"></div></div>
        <span class="nav-brand">TLS Foundations · ${cfg.title}</span>
        <ul class="nav-links">
          <li><a href="#overview"><span class="nav-dot"></span>Overview</a></li>
${navLinks}
        </ul>
        <div class="nav-contact">
          <span class="nav-contact-label">Ready to talk</span>
          <a href="tel:5059914180">(505) 991-4180</a>
          <span class="nav-contact-sub">You reach the owner(s)</span>
        </div>
      </nav>

      <div class="content-area">
        <!-- 01 OVERVIEW -->
        <section class="section" id="overview">
          <span class="section-num">01</span>
          <div class="section-inner">
            <div class="section-label"><span class="section-label-bar"></span><span class="section-label-text">${cfg.title} · ${cfg.overviewEyebrow}</span></div>
            <h2 class="section-heading reveal">${cfg.overviewHeading}</h2>

            <div class="two-col-wide reveal">
              <div>
${cfg.overviewParas.map((p) => `                <p>${p}</p>`).join('\n')}
              </div>
              <div>
                <div class="basin-stat reveal">
                  <div class="basin-stat-item">
                    <span class="basin-stat-num">${cfg.zones.length}</span>
                    <span class="basin-stat-label">${cfg.zones.length === 1 ? 'Basin' : 'Basins'}</span>
                    <p class="basin-stat-desc">${cfg.statDesc}</p>
                  </div>
                </div>

                <div class="fact-box reveal">
                  <span class="fact-box-label">Related reading</span>
${cfg.relatedReading.map((r) => `                  <p>${r}</p>`).join('\n')}
                </div>
              </div>
            </div>
          </div>
        </section>

${zonesHtml}
      </div>
    </div>

    <RegionalNav />
  </div>
</Layout>

<script>
  const progressFill = document.getElementById('progressFill');
  const contentArea = document.querySelector('.content-area');
  window.addEventListener(
    'scroll',
    () => {
      if (!progressFill || !contentArea) return;
      const rect = contentArea.getBoundingClientRect();
      const total = (contentArea as HTMLElement).offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      (progressFill as HTMLElement).style.height = Math.min(100, (scrolled / total) * 100) + '%';
    },
    { passive: true }
  );

  const sections = document.querySelectorAll('.content-area section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('active'));
          const active = document.querySelector(\`.nav-links a[href="#\${entry.target.id}"]\`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-25% 0px -65% 0px' }
  );
  sections.forEach((s) => sectionObs.observe(s));

  navLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href')!);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  document.querySelectorAll('.warning-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.warning-item')!;
      const drawer = item.querySelector('.warning-drawer') as HTMLElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.warning-item.open').forEach((i) => {
        i.classList.remove('open');
        (i.querySelector('.warning-drawer') as HTMLElement).style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        drawer.style.maxHeight = drawer.scrollHeight + 'px';
      }
    });
  });
</script>

<style>
  .cnm-page {
    --navy: #0d2238;
    --blue: #1b3a5c;
    --gold: #b8860b;
    /*
      --gold-text: the same gold family but darkened for text sitting on
      light backgrounds (cream/sand/white) -- the original --gold only
      clears WCAG AA (4.5:1) against dark backgrounds like navy (4.95:1);
      against cream it's 3.13:1 and against sand 2.85:1, both real
      failures for small label text. --gold stays as-is for text/accents
      already on a dark background (hero overlay, the basin-stat number)
      where it already passes and darkening would look muddy there.
    */
    --gold-text: #7d5c08;
    --sand: #f5efe6;
    --stone: #ddd5c8;
    --slate: #2c3a4a;
    --muted: #54626f;
    --cream: #fdfaf6;
    --white: #ffffff;
    font-family: 'Source Serif 4', Georgia, serif;
    background: var(--cream);
    color: var(--slate);
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 480px;
    padding-top: 60px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }
  .hero-photo {
    position: absolute;
    inset: -4%;
    background-image: url('/images/${cfg.heroImage}');
    background-size: cover;
    background-position: center 50%;
    animation: kenburns 20s ease-in-out infinite alternate;
  }
  @keyframes kenburns {
    0% { transform: scale(1) translate(1%, 0); }
    100% { transform: scale(1.03) translate(-1%, 0.5%); }
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13, 34, 56, 0.88) 0%, rgba(13, 34, 56, 0.45) 45%, rgba(13, 34, 56, 0.1) 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 0 80px 64px;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.5);
    display: block;
    margin-bottom: 20px;
  }
  .hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 6.5vw, 84px);
    font-weight: 700;
    color: var(--white);
    line-height: 1.05;
    letter-spacing: -1.5px;
    margin-bottom: 22px;
  }
  .hero-h1 .w2 {
    display: block;
    font-style: italic;
    color: var(--gold);
  }
  .hero-content .hero-sub {
    display: inline-block;
    font-size: clamp(16px, 1.7vw, 19px);
    font-weight: 400;
    font-style: italic;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9), 0 2px 14px rgba(0, 0, 0, 0.6);
    background: rgba(13, 34, 56, 0.55);
    max-width: 560px;
    line-height: 1.6;
    margin-bottom: 32px;
    border-left: 2px solid rgba(184, 134, 11, 0.5);
    padding: 18px 24px 18px 22px;
  }
  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hero-cities-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
  }
  .hero-aside {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.3px;
    color: rgba(255, 255, 255, 0.85);
  }
  /*
    :global() -- the city links are injected via set:html (built from a
    JS array at generation time), so they never get Astro's scoped
    data-astro-cid attribute and a plain scoped ".hero-aside a" rule
    silently doesn't match them, leaving default blue link color.
  */
  .hero-aside :global(a) {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: underline;
    text-decoration-color: var(--gold);
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .hero-aside :global(a):hover {
    color: var(--gold);
  }
  @media (max-width: 767px) {
    .hero-content { padding: 0 24px 40px; }
  }

  .gold-rule {
    height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--stone));
  }

  /* ── LAYOUT ── */
  .page-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    max-width: 1400px;
    margin: 0 auto;
  }
  .left-nav {
    position: sticky;
    top: 0;
    align-self: start;
    height: 100vh;
    padding: 48px 32px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--stone);
  }
  .nav-progress {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--stone);
  }
  .nav-progress-fill {
    width: 100%;
    height: 0%;
    background: var(--gold);
    transition: height 0.1s linear;
  }
  .nav-brand {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 28px;
  }
  .nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 18px;
    flex: 1;
  }
  .nav-links a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--stone);
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .nav-links a:hover { color: var(--blue); }
  .nav-links a.active {
    color: var(--blue);
    font-weight: 600;
  }
  .nav-links a.active .nav-dot { background: var(--gold); }
  .nav-contact {
    padding-top: 24px;
    border-top: 1px solid var(--stone);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .nav-contact-label {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold-text);
  }
  .nav-contact a {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    color: var(--blue);
    text-decoration: none;
  }
  .nav-contact-sub {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    color: var(--muted);
  }
  @media (max-width: 1023px) {
    .page-layout { grid-template-columns: 1fr; }
    .left-nav { display: none; }
  }

  /* ── SECTIONS ── */
  .content-area { padding: 0 64px; }
  .section {
    position: relative;
    padding: 72px 0;
    border-bottom: 1px solid var(--stone);
  }
  .section:last-of-type { border-bottom: none; }
  .section-num {
    position: absolute;
    top: 60px;
    right: 0;
    font-family: 'Playfair Display', serif;
    font-size: 96px;
    font-weight: 700;
    color: var(--sand);
    line-height: 1;
    z-index: 0;
  }
  .section-inner { position: relative; z-index: 1; max-width: 980px; }
  .section-label { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .section-label-bar { width: 24px; height: 2px; background: var(--gold); }
  .section-label-text {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold-text);
  }
  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3vw, 38px);
    font-weight: 400;
    color: var(--blue);
    line-height: 1.25;
    margin-bottom: 32px;
    max-width: 760px;
  }
  .section-heading em { color: var(--gold-text); font-style: italic; }

  .two-col { display: grid; grid-template-columns: 1.3fr 1fr; gap: 56px; }
  .two-col-wide { display: grid; grid-template-columns: 1.5fr 1fr; gap: 56px; }
  @media (max-width: 900px) {
    .two-col, .two-col-wide { grid-template-columns: 1fr; }
  }

  .lede { font-size: 19px; line-height: 1.75; color: var(--slate); margin-bottom: 20px; }
  .section-inner p { font-size: 17px; line-height: 1.9; margin-bottom: 20px; }
  .field-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--gold-text);
    margin-bottom: 8px;
  }
  mark.key {
    background: none;
    color: var(--blue);
    font-weight: 600;
  }
  .basin-tagline {
    font-style: italic;
    font-size: 17px;
    color: var(--muted);
    border-left: 2px solid var(--gold);
    padding-left: 18px;
    margin-bottom: 28px;
  }

  /* zone strip (basin header) */
  .zone-strip {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 36px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--stone);
  }
  .zone-strip-num {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--gold-text);
    border: 1px solid var(--gold);
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .zone-strip-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: var(--blue);
  }
  .zone-strip-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.5px;
    color: var(--muted);
    margin-top: 4px;
  }

  /* warning-style accordion, reused for hazard callouts */
  .zone-warnings { position: sticky; top: 100px; }
  .zone-warning-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .warning-list { list-style: none; }
  .warning-item {
    border-bottom: 1px solid var(--stone);
  }
  .warning-trigger {
    width: 100%;
    background: none;
    border: none;
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
    text-align: left;
    font-family: 'Source Serif 4', serif;
  }
  .warning-trigger-text { font-size: 15px; color: var(--blue); font-weight: 600; }
  .warning-trigger-icon { color: var(--gold-text); font-size: 16px; flex-shrink: 0; }
  .warning-drawer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
  .warning-drawer-inner { font-size: 14px; line-height: 1.75; color: var(--muted); padding-bottom: 18px; }

  .communities-band {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--stone);
  }
  .communities-band-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--gold-text);
    margin-bottom: 10px;
  }
  .communities-band p {
    font-size: 13px !important;
    line-height: 1.9 !important;
    color: var(--muted);
    margin: 0 !important;
  }

  .basin-stat {
    display: flex;
    background: var(--navy);
    border-radius: 6px;
    padding: 28px;
    margin-bottom: 24px;
  }
  .basin-stat-item { flex: 1; text-align: center; }
  .basin-stat-num {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    color: var(--gold);
    line-height: 1;
  }
  .basin-stat-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    margin: 10px 0 8px;
  }
  /*
    15px/0.9 opacity, up from 12px/0.6 -- the contrast ratio here already
    cleared WCAG AA (6.6:1) even at the old values, so this box's problem
    wasn't contrast math, it was that 12px is small for anyone reading
    without their glasses on. Bumped for readability, not compliance.
  */
  /*
    ".basin-stat-item .basin-stat-desc" (not just ".basin-stat-desc") --
    the single-class selector was silently losing to ".section-inner p"
    (class+element beats class alone), so this rule's font-size was
    never actually taking effect; the box was rendering at the generic
    17px body size the whole time. Confirmed via computed style, not
    assumed. Fixing the selector so this is an intentional declaration
    instead of an accident. Contrast was already fine at 6.6:1 (WCAG AA)
    even before this change -- the real improvement here is opacity
    0.6 -> 0.9, closer to true white for a wider margin above minimum.
  */
  .basin-stat-item .basin-stat-desc { font-size: 16px; color: rgba(255, 255, 255, 0.9); line-height: 1.6; }
  .basin-stat-divider { width: 1px; background: rgba(255, 255, 255, 0.15); margin: 0 20px; }

  .fact-box {
    background: var(--sand);
    border-left: 3px solid var(--gold);
    padding: 22px 26px;
  }
  .fact-box-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--gold-text);
    margin-bottom: 12px;
  }
  .fact-box p { font-size: 14px !important; margin-bottom: 8px !important; }
  .fact-box p:last-child { margin-bottom: 0 !important; }

  /* scroll reveals */
  .reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 767px) {
    .content-area { padding: 0 24px; }
    .section-num { display: none; }
    .zone-warnings { position: static; }
  }
</style>
`;
}

// ── Region data ──────────────────────────────────────────────────────

const northern = {
  slug: 'northern-new-mexico',
  title: 'Northern New Mexico',
  heroImage: 'northern-new-mexico-hero.webp',
  heroLine1: 'Northern',
  heroLine2: 'New Mexico.',
  heroSub:
    "Elevation is the dominant variable here -- frost, basalt-derived clays, and coal mine subsidence unique to the Raton Basin. Not just a colder version of the same problems found elsewhere.",
  description:
    'Taos Plateau, Mora Valley, and Raton Basin -- frost heave at elevation, montmorillonite clays, and coal mine subsidence unique to Raton.',
  summary:
    "Northern New Mexico spans the Taos Plateau, Mora Valley, and Raton Basin: frost heave at elevation, basalt-derived montmorillonite clays that expand aggressively, and coal mine subsidence unique to the Raton Basin. Elevation and mining history make this region's causes meaningfully different from the rest of the state -- not just a colder version of the same problems found elsewhere.",
  nextPage: { path: '/four-corners', name: 'Four Corners' },
  majorCities: [
    { name: 'Taos' },
    { name: 'Angel Fire' },
    { name: 'Red River' },
    { name: 'Raton' },
    { name: 'Springer' },
  ],
  overviewEyebrow: 'Elevation & Frost',
  overviewHeading: 'Northern New Mexico soils — <em>elevation changes everything</em>',
  overviewParas: [
    "Northern New Mexico is the part of the state where elevation becomes the dominant variable. At 7,000 feet on the Taos Plateau, basalt has weathered into montmorillonite clays that behave very differently from the alluvial soils of the Rio Grande basin below. Frost penetrates 24 inches or more every winter and the soil swells and contracts in ways that foundations have to accommodate or suffer.",
    "The Mora Valley is quieter and less visited, but it has the deepest frost penetration in the state -- 36 to 48 inches -- and valley floor organic soils that compress under load in ways that look like settlement but require a different response. The Raton Basin adds something no other part of New Mexico has: underground coal mine subsidence, a legacy of early 20th century extraction that has not finished expressing itself at the surface.",
  ],
  statDesc: 'Taos Plateau, Mora Valley, and Raton Basin -- each with a distinct hazard',
  relatedReading: [
    '<a href="/glossary#montmorillonite">Montmorillonite</a> -- the expansive clay mineral behind Taos Plateau heave.',
    '<a href="/symptom-guide">Symptom Guide</a> -- not sure what you\'re seeing?',
  ],
  zones: [
    {
      id: 'taos-plateau',
      title: 'Taos Plateau',
      citiesShort: 'Taos · Ranchos de Taos · Arroyo Seco · Questa · Red River · Ojo Caliente',
      tagline:
        'Basalt flows over a rift basin -- the volcanic cap weathers into clay minerals that move with moisture, and the elevation means frost works the soil from November through April.',
      whatWeSee:
        'Driving onto the Taos Plateau from the south, the terrain opens up dramatically. The soil is dark -- darker than most of New Mexico -- because the basalt weathers into iron-rich clay. In the Taos valley proper, old adobe construction tells you how the soil has behaved for centuries: cracked walls plastered over many times, acequia corridors with heavy clay that has been wet for generations.',
      whatItDoes:
        'The basalt-derived soils contain montmorillonite -- one of the most expansive clay minerals. It swells significantly when wet and shrinks when dry. At Taos elevation, frost penetration reaches 24 inches or more, adding a seasonal heave cycle on top of the moisture-driven expansion. The pattern is often mistaken for settlement when it is actually heave.',
      hazards: [
        {
          title: 'Basalt-derived montmorillonite clays',
          desc: 'The Taos Plateau weathers basalt into montmorillonite, one of the most expansive clay minerals. Foundations heave in wet seasons and drop in dry ones. Expansive soil is the primary driver.',
        },
        {
          title: 'Frost heave at elevation',
          desc: 'At 7,000 feet, frost penetrates 24 inches or more. Footings that do not reach below that depth lift every winter. Combined with clay expansion, the two forces compound each other.',
        },
        {
          title: 'Acequia moisture migration',
          desc: 'The old acequia corridors in the Taos valley have kept soils wet for generations. Clay that has been repeatedly wetted and dried is not the same as clay in its natural state.',
        },
      ],
      communities:
        'Taos · Ranchos de Taos · El Prado · Arroyo Seco · Arroyo Hondo · Taos Ski Valley · Questa · Red River · Costilla · Amalia · Tres Piedras · Ojo Caliente · Peñasco · Chamisal · Picuris Pueblo · Taos Pueblo · San Cristobal · Cerro · Carson · Lama · El Rito · Valdez',
    },
    {
      id: 'mora-valley',
      title: 'Mora Valley',
      citiesShort: 'Mora · Wagon Mound · Chacon · Cleveland · Guadalupita · Roy',
      tagline:
        'High mountain valley terrain where frost penetrates deep, snowmelt concentrates in valley floors, and organic soils compress under load in ways that surprise people expecting solid mountain ground.',
      whatWeSee:
        'Mora Valley is off the usual routes -- you have to intend to go there. The valley floor soils are dark and organic from millennia of wet meadow conditions. The surrounding slopes are rocky and competent, which creates a false sense that the whole area is solid ground. Old structures on the valley floor have often been settling slowly for decades.',
      whatItDoes:
        "Frost depth in the Mora Valley reaches 36 to 48 inches at elevation, the deepest in New Mexico. Footings that do not reach below that depth will heave. Valley floor organic soils compress under load slowly and unevenly. The combination of frost heave and organic compression can be hard to distinguish without proper evaluation: one pushes up, the other pulls down, and the foundation can show both patterns at different corners.",
      hazards: [
        {
          title: 'Frost heave — deepest in New Mexico',
          desc: 'Frost penetrates 36 to 48 inches in the Mora Valley. Footings that don\'t reach below that depth move every winter. This is not settlement -- it is uplift, and requires a different response.',
        },
        {
          title: 'Organic valley floor compression',
          desc: 'Valley floor soils with high organic content compress under load slowly and unevenly. What looks like differential settlement is often organic compression varying across the site.',
        },
        {
          title: 'Combined frost and compression',
          desc: 'The two hazards work in opposite directions -- one pushes up, one pulls down -- and can appear simultaneously at different corners of the same foundation. Distinguishing them requires evaluation, not visual inspection.',
        },
      ],
      communities:
        'Mora · Wagon Mound · Chacon · Cleveland · Guadalupita · La Cueva · Ledoux · Lucero · Mills · Ocate · Optimo · Roy · Solano · Watrous · Gascon · Rociada · Sapello · Tramperos',
    },
    {
      id: 'raton-basin',
      title: 'Raton Basin',
      citiesShort: 'Raton · Springer · Angel Fire · Cimarron · Eagle Nest · Maxwell',
      tagline:
        "Coal country -- the Raton Basin has a foundation hazard that does not exist anywhere else in New Mexico. What's underground here has been mined, and some of it has not finished moving.",
      whatWeSee:
        'Raton is a working town at the base of Raton Pass. The older neighborhoods near the historic coal mining areas have a characteristic pattern: walls that have cracked and been repaired multiple times, structures that lean slightly, ground with a subtle undulation. The surrounding country is Cretaceous shale and sandstone country, and the Pierre and Niobrara shales are expansive.',
      whatItDoes:
        'Underground coal mines from the early 20th century -- some mapped, some not -- create subsidence risk in portions of the Raton area. As unmaintained mines deteriorate, surface subsidence can be gradual or abrupt. Separately, the Pierre and Niobrara shale formations contain smectite clay minerals that expand significantly under moisture. Angel Fire and the mountain communities do not have the mine hazard but do have frost depth and some shale expansion.',
      hazards: [
        {
          title: 'Underground mine subsidence',
          desc: 'Early 20th century coal mines, some unmapped, create ongoing subsidence risk in portions of Raton. As unmaintained workings deteriorate, surface expression can be gradual or abrupt. This hazard does not exist anywhere else in New Mexico.',
        },
        {
          title: 'Expansive shale soils',
          desc: 'The Pierre and Niobrara shales contain smectite clay minerals that expand significantly under moisture. Expansive soil behavior throughout the broader basin, independent of mine influence.',
        },
        {
          title: 'Frost heave in mountain communities',
          desc: 'Angel Fire and the surrounding mountain communities do not carry the mine hazard but do carry significant frost depth. Footings must account for elevation-specific frost penetration.',
        },
      ],
      communities:
        'Raton · Springer · Angel Fire · Cimarron · Eagle Nest · Maxwell · Ute Park · Brilliant · Koehler · Sugarite · Colmor · Rayado · Miami · Elizabethtown · Colfax · Black Lake · Capitan Hill',
    },
  ],
};

const fourCorners = {
  slug: 'four-corners',
  title: 'Four Corners',
  heroImage: 'four-corners-hero.webp',
  heroLine1: 'Four',
  heroLine2: 'Corners.',
  heroSub:
    "New Mexico's most misdiagnosed foundation environment. Heave that looks like settlement, and collapsible river deposits along the San Juan corridor.",
  description:
    "San Juan Basin & Mancos Shale -- New Mexico's most misdiagnosed foundation environment. Heave that looks like settlement, plus collapsible river deposits.",
  summary:
    "The Four Corners region is built on the San Juan Basin and Mancos Shale -- widely the most misdiagnosed foundation environment in New Mexico, because the heave this shale produces looks identical to settlement on the surface while requiring the opposite repair. Collapsible river deposits along the San Juan corridor add a second, unrelated cause to the same region.",
  nextPage: { path: '/eastern-new-mexico', name: 'Eastern New Mexico' },
  majorCities: [
    { name: 'Farmington' },
    { name: 'Aztec' },
    { name: 'Bloomfield' },
    { name: 'Gallup' },
    { name: 'Grants' },
  ],
  overviewEyebrow: 'San Juan Basin',
  overviewHeading: 'Four Corners soils — <em>one basin, one hazard that requires precision</em>',
  overviewParas: [
    'The Four Corners region of New Mexico is dominated geologically by the San Juan Basin and its most significant soil hazard: the Mancos Shale. This Cretaceous marine shale contains sodium montmorillonite -- one of the most expansive clay minerals known -- and it underlies or outcrops across a wide area from Farmington south through Gallup and east toward the basin margins.',
    'The soil movement here is both heave and settlement, and both are very common. When the Mancos Shale absorbs moisture, it expands -- 10 to 15 percent volume change is documented. When it dries, it contracts. Most contractors diagnose the damage as settlement and recommend piers. Piers installed into heaving soil do not fix the problem. In some configurations they make it worse.',
  ],
  statDesc: 'The San Juan Basin -- geologically unified, one dominant hazard',
  relatedReading: [
    '<a href="/glossary#mancos-shale">Mancos Shale</a> -- the formation behind the region\'s signature heave.',
    '<a href="/expansive-soil">Expansive Soil</a> -- how sodium montmorillonite behaves.',
  ],
  zones: [
    {
      id: 'san-juan-basin',
      title: 'San Juan Basin',
      citiesShort: 'Farmington · Aztec · Bloomfield · Kirtland · Gallup · Grants · Shiprock',
      tagline:
        'Mancos Shale -- the most misdiagnosed foundation environment in New Mexico. The damage looks like settlement. It is heave. Getting that backwards is an expensive mistake.',
      whatWeSee:
        'Driving into Farmington from the south, the terrain changes character around Bloomfield -- the hills take on a gray-green color as the Mancos Shale outcrops and weathers at the surface. In residential areas, you see the evidence before you see the foundation: driveways that have humped up, sidewalks that have cracked and heaved, garage floors that are not flat. The pattern repeats throughout the Farmington, Aztec, and Bloomfield area.',
      whatItDoes:
        'The Mancos Shale contains sodium montmorillonite that expands dramatically when it absorbs water -- volume changes of 10 to 15 percent are documented. In a dry year, the soil shrinks and foundations settle. In a wet year, the soil swells and foundations heave. Most visible foundation damage in the San Juan Basin is from heave, not settlement -- but because heaving soil eventually drops back when it dries, the visible pattern often looks like settlement to the untrained eye. In Bloomfield and along the San Juan River corridor, river terrace and alluvial fan deposits sit above or adjacent to the shale, and these materials are collapsible -- two hazards, same basin, opposite mechanisms.',
      hazards: [
        {
          title: 'Mancos Shale heave',
          desc: 'The defining hazard of the San Juan Basin. Mancos Shale contains sodium montmorillonite that expands 10 to 15 percent under moisture. The visible damage looks like settlement. It is not. Getting that distinction wrong leads directly to the wrong repair.',
        },
        {
          title: 'Collapsible river deposits — Bloomfield and the San Juan corridor',
          desc: 'San Juan River terrace and alluvial fan deposits in and around Bloomfield are collapsible. Stable under dry conditions, vulnerable to rapid hydrocompaction when moisture finds them.',
        },
        {
          title: 'Misdiagnosis risk',
          desc: 'The most consistently misdiagnosed foundation environment in New Mexico. Piers installed into actively heaving soil do not fix the problem -- in some configurations they make it worse. Swell potential testing is the starting point.',
        },
        {
          title: 'Drainage and moisture management',
          desc: 'Because the Mancos Shale responds so dramatically to moisture, controlling the moisture envelope around a foundation is often the most important intervention, before any structural repair is considered.',
        },
      ],
      communities:
        'Farmington · Aztec · Bloomfield · Kirtland · Flora Vista · Cedar Hill · Fruitland · La Plata · Blanco · Navajo Dam · Nageezi · Shiprock · Gallup · Church Rock · Thoreau · Crownpoint · Grants · Milan · Laguna Pueblo · Acoma Pueblo · San Rafael · Rehoboth · Tohatchi · Zuni',
    },
  ],
};

const eastern = {
  slug: 'eastern-new-mexico',
  title: 'Eastern New Mexico',
  heroImage: 'eastern-new-mexico-hero.webp',
  heroLine1: 'Eastern',
  heroLine2: 'New Mexico.',
  heroSub:
    'Four basins, four different soil hazards -- expansive wind-deposited clays, Permian evaporite dissolution, aquifer subsidence, and collapsible alluvium. Treating them the same is a mistake.',
  description:
    'High Plains, Pecos Valley, Mimbres and Lordsburg basins -- expansive clays, Permian evaporite dissolution, aquifer subsidence, and collapsible alluvium.',
  summary:
    "Eastern New Mexico covers the High Plains, Pecos Valley, Mimbres Basin, and Lordsburg Basin: expansive wind-deposited clays, Permian-age evaporite dissolution, aquifer compaction subsidence from decades of agricultural pumping, and collapsible fan alluvium. Several of these mechanisms -- subsidence especially -- aren't things foundation repair can reverse; they change what an honest evaluation even recommends.",
  nextPage: { path: '/southern-new-mexico', name: 'Southern New Mexico' },
  majorCities: [
    { name: 'Clovis' },
    { name: 'Portales' },
    { name: 'Roswell' },
    { name: 'Carlsbad' },
    { name: 'Deming' },
  ],
  overviewEyebrow: 'High Plains to the Bootheel',
  overviewHeading: 'Eastern New Mexico soils — <em>four basins, four different hazards</em>',
  overviewParas: [
    'East of the mountain ranges, New Mexico opens onto a different landscape entirely -- the High Plains to the north, the Pecos Valley running south through Roswell and Carlsbad, and the remote basins of the southwest corner that most of the state never thinks about. Each of these environments has its own subsurface character and its own foundation hazard.',
    'The High Plains carries the legacy of the Dust Bowl in its soil -- wind-deposited smectite clays that shrink and swell with moisture. The Pecos Valley sits on Permian evaporite geology, the same formation that produced Carlsbad Caverns. The Mimbres Basin near Deming is experiencing aquifer compaction subsidence as decades of irrigation pumping lower the water table. The Lordsburg Basin has collapsible fan alluvium in a setting remote enough that problems go unaddressed for years.',
  ],
  statDesc: 'High Plains, Pecos Valley, Mimbres, and Lordsburg basins',
  relatedReading: [
    '<a href="/glossary#evaporite-dissolution">Evaporite dissolution</a> -- the mechanism behind Pecos Valley subsidence.',
    '<a href="/collapsible-soil">Collapsible Soil</a> -- the Lordsburg Basin\'s primary hazard.',
  ],
  zones: [
    {
      id: 'high-plains',
      title: 'High Plains',
      citiesShort: 'Clovis · Portales · Tucumcari · Fort Sumner · Santa Rosa · Clayton',
      tagline:
        'Dust Bowl country -- the aeolian clays that blew in from the west during the 1930s are still here, still in the soil, and still moving when moisture finds them.',
      whatWeSee:
        'East of the Estancia Basin escarpment, New Mexico flattens out dramatically onto the High Plains. The soil here is the Blackwater Draw Formation: wind-deposited silts and clays that accumulated over tens of thousands of years. The playas -- shallow closed depressions -- are scattered across the landscape, filling briefly after rain and draining by evaporation. They are also where the heaviest clay concentrations settle out over time.',
      whatItDoes:
        'The Blackwater Draw Formation contains smectite clays that shrink and swell with moisture changes. The High Plains receives erratic rainfall, and the playas concentrate moisture in local wet-dry cycles more extreme than the surrounding ground. Foundations on or near playa margins see the most movement. In the Clovis area, the combination of expansive soils and a shallow water table in some areas keeps the soil in a near-saturated expanded state.',
      hazards: [
        {
          title: 'Expansive aeolian clays',
          desc: 'Wind-deposited smectite clay that shrinks and swells with moisture. Swell potential varies by location -- evaluation establishes what you are actually dealing with.',
        },
        {
          title: 'Playa margin movement',
          desc: 'Foundations on or near playa depressions see the most movement. Closed drainage means moisture stays in the soil or evaporates -- it does not run off.',
        },
        {
          title: 'Irrigation moisture patterns',
          desc: 'In the Clovis area, irrigation agriculture has altered subsurface moisture conditions. Soil that has been near-saturated for decades behaves differently from soil in its natural arid state.',
        },
      ],
      communities:
        'Clovis · Portales · Tucumcari · Fort Sumner · Santa Rosa · Vaughn · Logan · Grady · Melrose · Texico · Elida · Dora · Floyd · Mosquero · San Jon · Clayton · Folsom · Grenville · Des Moines · Roy · Wagon Mound',
    },
    {
      id: 'pecos-valley',
      title: 'Pecos Valley',
      citiesShort: 'Roswell · Artesia · Carlsbad · Dexter · Hagerman · Loving',
      tagline:
        'Permian evaporite country -- the same geology that formed Carlsbad Caverns is present in the subsurface throughout this valley, and dissolution does not announce itself before it affects a foundation.',
      whatWeSee:
        'The Pecos Valley is productive agricultural country -- dairy operations, alfalfa fields, orchards in the Roswell area, irrigated for over a century. Below the surface, Permian evaporite formations -- gypsum, anhydrite, halite -- are close to the surface in places and deeper in others. Carlsbad Caverns is the most visible expression of what this geology can do when water and time dissolve the evaporite rock, but the same process operates on a smaller scale throughout the valley.',
      whatItDoes:
        'Subsurface dissolution of evaporite minerals creates voids that can cause foundation settlement -- gradually as the void grows, or suddenly if the roof of the void collapses. The risk is highest where evaporite formations are close to the surface and where groundwater or irrigation has introduced sustained moisture. Century-long irrigation in the Roswell and Carlsbad areas has altered subsurface moisture conditions significantly from natural baseline -- foundations that were stable for 50 years can begin moving as dissolution progresses.',
      hazards: [
        {
          title: 'Permian evaporite dissolution',
          desc: 'Evaporite minerals dissolve slowly under sustained moisture, creating voids beneath foundations with no surface warning. The same process that formed Carlsbad Caverns operates on a smaller scale throughout this valley.',
        },
        {
          title: 'Void-driven settlement',
          desc: 'As evaporite voids grow, settlement can be gradual or sudden depending on void size and roof thickness. Investigation is the only way to characterize subsurface void presence.',
        },
        {
          title: 'Century-long irrigation effects',
          desc: 'Over 100 years of agricultural irrigation in the Roswell and Carlsbad areas has altered subsurface moisture conditions far from natural baseline, accelerating evaporite dissolution.',
        },
      ],
      communities:
        'Roswell · Artesia · Carlsbad · Dexter · Hagerman · Lake Arthur · Loving · Malaga · Whites City · Atoka · Hope · Lakewood · Otis · Queen · Berrendo · Eddy',
    },
    {
      id: 'mimbres-basin',
      title: 'Mimbres Basin',
      citiesShort: 'Deming · Silver City · Bayard · Columbus · Hurley',
      tagline:
        'A closed basin in the southwestern corner of the state where irrigation agriculture has drawn down an aquifer for decades -- and where aquifer depletion is beginning to show up as ground subsidence.',
      whatWeSee:
        'Deming sits in the middle of a dry agricultural plain that, until recently, was intensively irrigated from the Mimbres Valley aquifer. The soil is pale and alkaline -- caliche is visible in any excavation. Silver City to the north is on different terrain entirely -- older, harder formations in the upper Mimbres drainage with a mountain-town character. The two communities are in the same basin geologically but present different foundation environments.',
      whatItDoes:
        'In the Deming area, decades of aquifer pumping have removed water from the subsurface, allowing compressible sediments to consolidate under their own weight -- aquifer compaction subsidence. This produces gradual, relatively uniform ground settlement across large areas, slow and often unnoticed until the cumulative effect becomes visible. Buried Lake Palomas lacustrine clays in the deeper subsurface are expansive and complicate the picture. In Silver City, the upper Mimbres drainage terrain introduces shallow rock and mine-related subsidence in older areas.',
      hazards: [
        {
          title: 'Aquifer depletion subsidence — Deming area',
          desc: 'Decades of irrigation pumping have removed water from the subsurface, allowing compressible sediments to consolidate under their own weight. Slow and cumulative -- often unnoticed until the effect becomes visible.',
        },
        {
          title: 'Expansive lacustrine clays at depth',
          desc: 'Buried Lake Palomas lacustrine clays in the deeper subsurface are expansive and complicate the subsidence picture -- two mechanisms operating at different depths in the same foundation.',
        },
        {
          title: 'Caliche variability',
          desc: 'Caliche is visible in any excavation in the Deming area. Looks like competent bearing. A thin layer over loose or compressible material below is a hard ceiling over a soft floor.',
        },
      ],
      communities:
        'Deming · Silver City · Bayard · Hurley · Santa Clara · Columbus · Mimbres · Arenas Valley · Central · Faywood · Pinos Altos · Tyrone · Hanover · Cliff · Gila',
    },
    {
      id: 'lordsburg-basin',
      title: 'Lordsburg Basin',
      citiesShort: 'Lordsburg · Animas · Hachita · Rodeo · Playas',
      tagline:
        'The far southwestern corner -- sparse, hot, and geologically active in ways that have not been as thoroughly documented as the basins with larger populations.',
      whatWeSee:
        'Lordsburg is a small community at the junction of I-10 and the old Route 66 country, surrounded by bajada terrain -- the broad alluvial aprons that grade from the surrounding mountain ranges down to the basin floor. The soil on the upper fans is loose, granular, and collapsible. The Animas Valley to the south is even more remote -- ranching country where foundation problems tend to go unaddressed for years before anyone calls.',
      whatItDoes:
        'The upper fan alluvium is collapsible under first wetting -- the same mechanism as the Jornada del Muerto and other dry alluvial basins in southern New Mexico. Lower fan and basin floor material has higher clay content and some expansive potential, but the primary hazard in Lordsburg is collapsibility on the fan surfaces where most development sits. The Gila River floodplain at Virden is a different environment -- floodplain clays with overbank deposits that respond to the river\'s wet and dry cycles.',
      hazards: [
        {
          title: 'Collapsible upper fan alluvium',
          desc: 'Dry-deposited alluvial fan material that consolidates under first wetting. The same hazard mechanism as the Jornada del Muerto and other southern New Mexico dry basins.',
        },
        {
          title: 'Remote setting — problems accumulate',
          desc: 'In a community this size and this remote, foundation problems often go unaddressed for years before anyone calls. Early evaluation is more important here, not less.',
        },
        {
          title: 'Gila floodplain — Virden',
          desc: "The Gila River floodplain at Virden is a different environment from the basin fans. Floodplain clays with overbank deposits respond to the river's wet and dry cycles.",
        },
      ],
      communities: 'Lordsburg · Animas · Hachita · Playas · Rodeo · Cotton City · Granite Gap · Cloverdale · Antelope Wells',
    },
  ],
};

const southern = {
  slug: 'southern-new-mexico',
  title: 'Southern New Mexico',
  heroImage: 'southern-new-mexico-hero.jpg',
  heroLine1: 'Southern',
  heroLine2: 'New Mexico.',
  heroSub:
    "Basin-and-range country, five distinct soil stories -- and a common thread of collapsibility that activates the first time moisture finds soil that's been dry for decades.",
  description:
    'Mesilla, Hatch-Rincon, Tularosa, Sacramento Mountains, and Jornada del Muerto -- collapsible La Mesa soils, gypsum dissolution, and first-wetting collapse.',
  summary:
    "Southern New Mexico covers Mesilla, Hatch-Rincon, Tularosa, the Sacramento Mountains, and Jornada del Muerto: collapsible La Mesa soils, gypsum dissolution, differential rock-and-soil bearing, and first-wetting collapse, where soil that's been stable for decades can settle suddenly the first time it gets wet.",
  nextPage: { path: '/albuquerque-nm', name: 'Albuquerque' },
  majorCities: [
    { name: 'Las Cruces' },
    { name: 'Alamogordo' },
    { name: 'Ruidoso' },
    { name: 'Socorro' },
    { name: 'Truth or Consequences' },
  ],
  overviewEyebrow: 'Basin & Range',
  overviewHeading: 'Southern New Mexico soils — <em>five basins, one common thread</em>',
  overviewParas: [
    'Southern New Mexico is basin-and-range country -- elongated mountain blocks separated by sediment-filled valleys, each basin largely hydrologically isolated from the next. That isolation matters for foundations because it means the soil chemistry and moisture history of each basin is distinct. What the Mesilla Basin does to foundations is not what the Tularosa Basin does, even though they are geographically close.',
    'The common thread across this region is collapsibility. Many of the alluvial soils in southern New Mexico are dry-deposited and have never been saturated -- they support load under dry conditions and consolidate under first wetting. A century of irrigation agriculture in the Mesilla Valley has triggered that process in many mid-century foundations. In the Jornada del Muerto and Lordsburg Basin, the first-wetting event has not happened yet for many structures -- it is still ahead of them.',
  ],
  statDesc: 'Mesilla, Hatch-Rincon, Tularosa, Sacramento Mountains, and Jornada del Muerto',
  relatedReading: [
    '<a href="/collapsible-soil">Collapsible Soil</a> -- the mechanism common to all five basins here.',
    '<a href="/glossary#first-wetting-collapse">First-wetting collapse</a> -- why decades-old stability isn\'t proof of a safe soil.',
  ],
  zones: [
    {
      id: 'mesilla-basin',
      title: 'Mesilla Basin',
      citiesShort: 'Las Cruces · Mesilla · Doña Ana · Anthony · Sunland Park · Organ',
      tagline:
        'The lower Rio Grande valley -- irrigated for over a century, with lake sediments buried beneath the surface and a collapsible upper soil layer that most people do not know is there.',
      whatWeSee:
        'The Mesilla Valley is greener than you expect for the Chihuahuan Desert -- the Rio Grande and a century of irrigation agriculture have changed the landscape. Driving into Las Cruces from the north on I-25, the La Mesa surface -- an old alluvial terrace -- stretches to the east. That surface soil is collapsible. Closer to the river, the soils are heavier and wetter from irrigation history. The Organ Mountains to the east are bedrock -- a dramatic transition within a few miles.',
      whatItDoes:
        'The La Mesa surface soils are collapsible -- dry, they support load; wet, they consolidate. Irrigation, landscape watering, and urban development moisture have triggered first-wetting collapse in many Las Cruces foundations built in the mid-20th century expansion. Below the upper collapsible layer, Fort Hancock Formation lacustrine clays are present and expansive. The hazard depends on how deep moisture penetration goes: shallow wetting triggers settlement, deep wetting triggers heave.',
      hazards: [
        {
          title: 'Collapsible La Mesa surface soils',
          desc: 'Dry-deposited collapsible alluvium on the La Mesa terrace surface. Irrigation and urban development moisture have triggered first-wetting collapse in many mid-20th century Las Cruces foundations.',
        },
        {
          title: 'Fort Hancock lacustrine clays at depth',
          desc: 'Below the upper collapsible layer, lacustrine clays are expansive. Shallow wetting triggers collapse, deep wetting triggers expansion -- two mechanisms, same foundation, different depths.',
        },
        {
          title: 'Century of irrigation moisture',
          desc: 'The Mesilla Valley has been irrigated for over 100 years. Soils that were dry at construction have been repeatedly wetted and dried -- the soil is not in its natural state.',
        },
      ],
      communities:
        'Las Cruces · Mesilla · Doña Ana · Anthony · Sunland Park · Fairacres · Mesilla Park · La Mesa · Radium Springs · San Miguel · Berino · Chamberino · La Union · Vado · Mesquite · Organ',
    },
    {
      id: 'hatch-rincon',
      title: 'Hatch–Rincon Corridor',
      citiesShort: 'Hatch · Rincon · Garfield · Arrey · Derry',
      tagline:
        'A narrow strip of Rio Grande floodplain between the Mesilla Basin and the Jornada del Muerto -- chile country with variable soils that shift within a single lot.',
      whatWeSee:
        'Hatch is known for its chiles and sits in a narrow stretch of the Rio Grande valley where the canyon pinches in from both sides. The soils in the active floodplain and old terrace surfaces vary within short distances -- river-deposited sandy material next to heavier overbank clays, sometimes with abandoned channel fills softer than the surrounding ground. The terrain is flat, which makes it harder to read soil character from the surface.',
      whatItDoes:
        'Lateral variability is the primary challenge in this corridor. Overbank clay deposits are expansive; sandy channel deposits are loose and compress under load. A single structure can span both soil types, producing differential movement that is difficult to predict from surface observation alone. Irrigation agriculture in the valley has historically raised the local water table in some areas, adding seasonal moisture to soils that would otherwise be dry.',
      hazards: [
        {
          title: 'Lateral soil variability',
          desc: 'Expansive overbank clays adjacent to loose sandy channel deposits, sometimes within the same foundation footprint. Two soil types with opposite behavior under moisture, separated by feet rather than miles.',
        },
        {
          title: 'Expansive overbank clays',
          desc: 'Expansive clay in the overbank deposits responds to irrigation and seasonal moisture with heave. The valley floor has been wet long enough that the clay is in an active expansion-contraction cycle.',
        },
        {
          title: 'Loose channel fill compression',
          desc: 'Sandy abandoned channel deposits compress under load. Where a foundation spans both overbank clay and channel fill, differential movement is the predictable outcome.',
        },
      ],
      communities: 'Hatch · Rincon · Radium Springs · Garfield · Arrey · Derry · Monticello',
    },
    {
      id: 'tularosa-basin',
      title: 'Tularosa Basin',
      citiesShort: 'Alamogordo · Tularosa · La Luz · Holloman AFB · Three Rivers',
      tagline:
        'A closed basin filled with gypsum -- White Sands is the most visible expression of it, but the same chemistry is present in the subsurface under every foundation in this valley.',
      whatWeSee:
        'Driving into Alamogordo, the white gypsum of White Sands National Park is visible on the horizon. The soil near the basin floor is pale -- sometimes almost white -- from gypsum and calcium carbonate. Playas at the lowest elevations are perfectly flat, with cracked clay surfaces that tell you about the wet and dry cycles. The Sacramento Mountains rise abruptly to the east, and alluvial fans off those mountains deliver coarser material that grades down to fine-grained basin floor deposits.',
      whatItDoes:
        'Gypsum in the subsurface dissolves under sustained moisture -- slowly, but measurably over the life of a structure. Dissolution creates voids that can cause sudden or gradual foundation settlement without obvious surface warning. Sulfate in the soil and groundwater attacks concrete chemically over time, independent of movement. The playa lake clays are highly expansive, and the closed basin hydrology means any moisture introduced by development has nowhere to go -- it stays in the soil and amplifies both mechanisms.',
      hazards: [
        {
          title: 'Gypsum dissolution',
          desc: 'Gypsum in the subsurface dissolves under sustained moisture, creating voids beneath foundations with no surface warning. The closed basin hydrology means moisture has nowhere to go.',
        },
        {
          title: 'Expansive playa clays',
          desc: 'Playa lake clays at the basin floor are highly expansive. Closed basin hydrology amplifies the wet-dry cycles -- moisture introduced at the surface concentrates rather than dispersing.',
        },
        {
          title: 'Sulfate attack on concrete',
          desc: 'Sulfate in the soil and groundwater attacks concrete chemically over time. Sulfate heave is a secondary hazard throughout the basin, independent of soil movement.',
        },
      ],
      communities: 'Alamogordo · Tularosa · La Luz · Holloman AFB · Desert Lakes · Orogrande · Chaparral · Three Rivers · Bent · Mescalero',
    },
    {
      id: 'sacramento-mountains',
      title: 'Sacramento Mountains',
      citiesShort: 'Ruidoso · Cloudcroft · Alto · Capitan · Carrizozo',
      tagline:
        'Permian limestone country at elevation -- the rock is close to the surface, the frost is deep, and the differential bearing between soil and rock under the same foundation is the hazard most people miss.',
      whatWeSee:
        'Cloudcroft sits at 8,650 feet -- the highest community in southern New Mexico. The drive up from Alamogordo gains 4,500 feet in 16 miles, and the soil character changes completely. At elevation, limestone bedrock is close to or at the surface in many areas, with soil cover just a few inches to a few feet deep. In Ruidoso, the canyon terrain means lots of cut-and-fill construction, which creates its own foundation challenges independent of the natural geology.',
      whatItDoes:
        "Shallow rock with variable depth is a differential bearing problem -- one part of a foundation bears on rock, another part bears on soil, and they respond differently to load. At Cloudcroft elevations, frost penetrates 36 inches or more, and footings that don't reach below the frost line heave seasonally. Ruidoso's cut-and-fill construction means some structures bear on engineered fill that hasn't been compacted to the standard needed for a foundation.",
      hazards: [
        {
          title: 'Differential bearing — rock and soil under the same foundation',
          desc: 'Shallow Permian limestone at variable depth means different parts of the same foundation can bear on rock and soil simultaneously. Bearing capacity varies dramatically within a single footprint.',
        },
        {
          title: 'Frost heave at elevation',
          desc: 'At Cloudcroft and higher elevations, frost penetrates 36 inches or more. Footings that do not reach below the frost line heave every winter.',
        },
        {
          title: 'Cut-and-fill construction — Ruidoso canyon developments',
          desc: 'Canyon terrain means cut-and-fill construction is the rule in Ruidoso. Fill placed without adequate compaction testing settles under load -- the fill side settles while the cut side stays put.',
        },
      ],
      communities: 'Ruidoso · Ruidoso Downs · Cloudcroft · Alto · Capitan · Carrizozo · High Rolls · Mountain Park · Pinon · Lincoln · Nogal · Glencoe · Hondo · Corona',
    },
    {
      id: 'jornada-del-muerto',
      title: 'Jornada del Muerto',
      citiesShort: 'Socorro · Truth or Consequences · Magdalena · Elephant Butte',
      tagline:
        "The dead man's route -- a basin named for the difficulty of crossing it, where collapsible soils wait for the first sustained wetting event that most structures have never experienced.",
      whatWeSee:
        'The Jornada del Muerto is an elongated basin between the San Andres and Oscura ranges to the east and the Rio Grande valley to the west. It is sparse country -- ranches, small communities, Socorro to the north, Truth or Consequences to the south. The soil is pale alluvium, dry, with a surface that looks like it has never held water. That appearance is accurate for most of its history. The problem is when development introduces moisture into soil that has never been consistently wet.',
      whatItDoes:
        'Classic collapsible soil territory. The alluvial soils of the Jornada are dry-deposited and have never been saturated -- they have an open, loose structure that supports load under dry conditions. The first sustained wetting event -- a broken irrigation line, landscape watering for a new yard, an unusually wet year -- can cause sudden consolidation. Settlement that took decades elsewhere can happen in a season here. Truth or Consequences sits on Jornada-character soils with the added complexity of geothermal influences from the hot springs.',
      hazards: [
        {
          title: 'Collapsible alluvial soils — first wetting trigger',
          desc: 'The Jornada del Muerto alluvial soils have never been saturated. They carry load under dry conditions and consolidate under first wetting -- movement that accumulated over decades elsewhere can happen in a season here.',
        },
        {
          title: 'Development moisture as trigger',
          desc: 'Structures on native soil that have never been irrigated are at greatest risk when site conditions change. Landscape watering, an irrigation system, a broken line -- any sustained moisture introduction can trigger the collapse mechanism.',
        },
        {
          title: 'Truth or Consequences geothermal complexity',
          desc: 'T or C sits on Jornada-character soils with the added complexity of geothermal influences from the hot springs. Evaluation requires accounting for both collapsible soil hazard and geothermal influence.',
        },
      ],
      communities:
        'Socorro · Truth or Consequences · Williamsburg · Elephant Butte · Magdalena · Bernardo · Escondida · La Joya · Lemitar · Polvadera · San Antonio · Veguita · Caballo · Hillsboro · Placitas · Reserve · Quemado · Pie Town · Datil',
    },
  ],
};

const central = {
  slug: 'central-new-mexico',
  title: 'Central New Mexico',
  heroImage: 'central-new-mexico-hero.webp',
  heroLine1: 'Central',
  heroLine2: 'New Mexico.',
  heroSub:
    'Three basins along the Rio Grande Rift. Three different soil stories -- and a repair approach calibrated for one can be the wrong call two miles away, in another part of the same region.',
  description:
    'Albuquerque, Española, and Estancia basins -- collapsible West Mesa soils, river clays, Tesuque Formation shifts, and evaporite dissolution.',
  summary:
    "Central New Mexico spans the Albuquerque, Española, and Estancia basins, and the soil character changes meaningfully between them: collapsible soils on the West Mesa, expansive river clays along the Rio Grande corridor, unpredictable Tesuque Formation variability in the Española Basin, and evaporite dissolution in the closed Estancia Basin. A repair approach calibrated for one of these conditions can be the wrong call two miles away, in another part of the same region.",
  nextPage: { path: '/northern-new-mexico', name: 'Northern New Mexico' },
  majorCities: [
    { name: 'Albuquerque', href: '/albuquerque-nm' },
    { name: 'Rio Rancho', href: '/rio-rancho-nm' },
    { name: 'Santa Fe', href: '/santa-fe-nm' },
    { name: 'Los Alamos' },
    { name: 'Moriarty' },
  ],
  overviewEyebrow: 'Rio Grande Rift',
  overviewHeading: 'Central New Mexico soils — <em>three basins, three different stories</em>',
  overviewParas: [
    'Central New Mexico sits on top of the Rio Grande Rift -- one of the most geologically active continental rifts in North America. The rift is still spreading. The basins it created fill with sediment from surrounding mountains, and that sediment is what most foundations in this region are built on.',
    'We have worked in all three basins in this region. The soil in each one has a different character, a different way it moves, and a different appropriate response when something goes wrong. Collapsible soils and expansive clays are the primary hazards -- but they appear in different parts of the basin and require different responses.',
  ],
  statDesc: 'Albuquerque, Española, and Estancia -- each with its own soil behavior',
  relatedReading: [
    '<a href="/collapsible-soil">Collapsible soils</a> -- the West Mesa\'s dominant hazard.',
    '<a href="/expansive-soil">Expansive clays</a> -- the Valley floor and Tesuque Formation\'s dominant hazard.',
    '<a href="/symptom-guide">Symptom Guide</a> -- not sure what you\'re seeing?',
  ],
  zones: [
    {
      id: 'albuquerque-basin',
      title: 'Albuquerque Basin',
      citiesShort: 'Albuquerque · Rio Rancho · Corrales · Bernalillo · Los Lunas · Belen',
      tagline:
        "The Rio Grande Rift's most populated expression -- alluvial fans, river terraces, and mesa edges, each with different soil behavior within a few miles of each other.",
      whatWeSee:
        'It depends entirely on where in the basin you are. On the West Mesa, the soil is brown-tan alluvium -- looks stable, often is not. In the North Valley and South Valley, the soil gets darker and heavier as you approach the river -- old floodplain material with clay that moves when it gets wet. In the East Mountains foothills, alluvial fans off the Sandias have loose upper material over harder cemented zones.',
      whatItDoes:
        'The West Mesa is classic collapsible soil country -- dry, it bears load fine; wet, from irrigation or a broken line, it consolidates and the foundation follows it down. The Valley floor is the opposite problem: expansive clays that push up when wet and shrink when dry. The foothills introduce differential bearing -- dense cemented zones next to loose material, so one corner of a house can settle while another stays put.',
      hazards: [
        {
          title: 'Collapsible alluvial soils',
          desc: 'West Mesa, Pajarito Mesa, and the developing edges of Rio Rancho. Stable for decades until moisture finds them. When they go, they go fast.',
        },
        {
          title: 'Expansive river clays',
          desc: 'South Valley, North Valley, Corrales, and the old floodplain neighborhoods. Foundations that heave in wet years and crack in dry ones. Seasonal pattern is the tell.',
        },
        {
          title: 'Alluvial fan differential bearing',
          desc: 'Foothills and East Mountains. One corner of a house on dense cemented material, another on loose fan sediment. The differential movement is structural even when neither soil is "bad."',
        },
      ],
      communities:
        'Albuquerque · Los Ranchos de Albuquerque · Rio Rancho · Tijeras · Edgewood · Corrales · Bernalillo · Placitas · Belen · Los Lunas · Bosque Farms · Peralta · South Valley · North Valley · Sandia Heights · Cedar Crest · Isleta · Pajarito Mesa · Algodones',
    },
    {
      id: 'espanola-basin',
      title: 'Española Basin',
      citiesShort: 'Santa Fe · Española · Los Alamos · White Rock · Pojoaque · Chimayó',
      tagline:
        'The upper Rio Grande corridor -- where ancient lake sediments and volcanic ash meet centuries of acequia irrigation, and the soil remembers all of it.',
      whatWeSee:
        'The Tesuque Formation has a visual signature you learn quickly: exposures in the cut banks and arroyos vary from sandy and loose to heavy clay-bearing within short distances. In the pueblos and along the old acequia corridors, centuries of irrigation have altered soil moisture content in ways no geological map captures. The land looks flat and stable. The subsurface often is not.',
      whatItDoes:
        'The Tesuque Formation is laterally inconsistent -- fine-grained expansive members and coarser non-expansive members, often stacked and interbedded, creating differential settlement within a single foundation footprint. Los Alamos sits on Bandelier Tuff at the canyon rim, introducing a different hazard: shallow rock with variable depth to competent bearing.',
      hazards: [
        {
          title: 'Tesuque Formation lateral variability',
          desc: 'Expansive clay members and non-expansive sand members stacked and interbedded, sometimes within the same foundation footprint. Lateral variability is the signature hazard here.',
        },
        {
          title: 'Expansive clay in the fine-grained members',
          desc: 'Where the Tesuque runs heavy with clay, foundations move with moisture. Santa Fe and the upper basin neighborhoods built into hillsides see this most.',
        },
        {
          title: 'Acequia moisture migration',
          desc: 'Centuries of irrigation have altered soil moisture in ways no geological map captures. Homes near old acequia corridors sit on soils repeatedly wetted and dried.',
        },
      ],
      communities:
        'Santa Fe · Española · Los Alamos · White Rock · Pojoaque · Nambé · Tesuque · Chimayó · Alcalde · Dixon · Velarde · Abiquiu · El Rito · Truchas · La Cienega · Galisteo · Pecos · Glorieta · Lamy',
    },
    {
      id: 'estancia-basin',
      title: 'Estancia Basin',
      citiesShort: 'Estancia · Moriarty · Mountainair · Willard · McIntosh · Edgewood',
      tagline:
        "A closed basin with no outlet to the sea -- what goes in stays in, and so does the chemistry. Lake Estancia dried up thousands of years ago but its legacy is still in the soil.",
      whatWeSee:
        'The Estancia Basin sits around 6,000 feet elevation, east of the Manzano and Sandia ranges. The soil is pale -- light tan to whitish where evaporite minerals concentrate. Caliche shows up everywhere, sometimes as a thick hardpan just below grade that looks like competent bearing but fractures unpredictably. The playas -- dry lake bed remnants -- are visually flat and featureless. They\'re also where the worst soil behavior concentrates.',
      whatItDoes:
        'The lacustrine clays deposited by Lake Estancia are highly expansive in places. Gypsum and halite from thousands of years of evaporation can dissolve under sustained moisture, creating voids in the subsurface. The basin is closed, meaning seasonal moisture has nowhere to go except down or into the soil -- shrink-swell cycles are pronounced in wet years.',
      hazards: [
        {
          title: 'Expansive lacustrine clays',
          desc: 'The legacy of Lake Estancia. Closed basin hydrology means moisture builds up with nowhere to go -- the wet-dry cycles are pronounced, especially in the lower basin.',
        },
        {
          title: 'Evaporite dissolution',
          desc: 'Gypsum and halite deposits from thousands of years of evaporation. Sustained moisture dissolves them at depth, creating voids beneath foundations with no surface warning.',
        },
        {
          title: 'Caliche variability',
          desc: 'Looks like competent bearing. Sometimes is. A thin caliche layer over soft compressible material below is a hard ceiling over a soft floor, not a stable foundation.',
        },
      ],
      communities:
        'Estancia · Moriarty · Mountainair · Willard · McIntosh · Edgewood · Encino · Duran · Manzano · Tajique · Torreon · Clines Corners · Gran Quivira',
    },
  ],
};

// ── Write files ──────────────────────────────────────────────────────
// Writing directly to the live regional-page filenames (no "-v2" suffix)
// -- these are promoted to production, replacing the previous
// single-accordion layout at the same URLs. No slug/URL changes, so no
// redirect or re-indexing concerns.

const regions = [central, northern, fourCorners, eastern, southern];
for (const r of regions) {
  const outPath = `src/pages/${r.slug}.astro`;
  fs.writeFileSync(outPath, renderPage(r));
  console.log('wrote', outPath, `(${r.zones.length} zones)`);
}
