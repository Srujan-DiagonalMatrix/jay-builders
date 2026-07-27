# JAY Builders implementation specification

## Authority and current scope

This foundation maps the supplied `requirements/technical-specifications.json`. The extracted source packages are available under `requirements/image-assets/` and `requirements/content/`, alongside `requirements/Prototype.png`. Production UI implementation must preserve their approved copy and must not infer missing business facts from raster references. The source priority is: technical specification, master reference, section references, then content files.

## Source-to-component map

| Order | Route anchor | Content source | Reference | Planned component | Layout / interaction |
|---:|---|---|---|---|---|
| 1 | `#home` | `01_header_hero.txt` | `Header.png` | `Header`, `Hero` | Sticky 72px header (z-index 1000), desktop navigation, accessible mobile drawer; full-bleed hero, dark left gradient, 46% copy width, CTA links and testimonial card. |
| 2 | `#customer-stories` | `02_customer_says.txt` | `CustomerSays.png` | `CustomerStories` | Three desktop columns; two tablet columns with final card centred/spanning; one mobile column. Video activation opens a keyboard-operable, labelled modal/player. |
| 3 | `#our-work` | `03_our_work.txt` | `OurWork.png` | `ProjectGallery` | Six desktop columns, two/three tablet columns, one mobile column; optional keyboard-operable lightbox. |
| 4 | `#services` | `04_services.txt` | `CompleteBuildingServ.png` | `ServicesGrid` | Five columns then four with guidance at right; two tablet and one mobile column. |
| 5 | `#why-jay` | `05_why_jay.txt` | `WhyJAY.png` | `WhyJay` | Full-width navy band, four desktop columns; content remains in shared container. |
| 6 | `#project-spotlight` | `06_project_spotlight.txt` | `OutDatedProp.png` | `ProjectSpotlight` | Gallery left, copy centre, testimonial right; stacks without overflow below desktop. Any comparison divider stays decorative unless fully keyboard accessible. |
| 7 | `#recommendations` | `07_recommendations.txt` | `Recommendations.png` | `Recommendations` | Four desktop columns, responsive single-column flow. |
| 8 | `#process` | `08_process.txt` | `Process.png` | `Process` | Four desktop columns; ordered semantic steps. |
| 9 | `#contact` | `09_project_form.txt` | `TellUsProj.png` | `ProjectForm` | Labelled fields, client and server validation, honeypot/rate limiting, inline success; up to 8 files, 20MB each: JPG/JPEG/PNG/WebP/MP4/MOV. |
| 10 | `#urgent-assistance` | `10_urgent_assistance.txt` | `UrgentAssis.png` | `UrgentAssistance` | Desktop 24% lower-area column, sticky only when viewport permits; normal flow below 992px; never overlays form/footer. Main column is 76%. |
| 11 | `#footer` | `11_footer.txt` | Master reference | `Footer` | Full-width navy band and shared inner container. |

Every navigation/CTA target must resolve to one of these IDs. No blog, pricing, biographies, counters, newsletter, FAQ, invented statistics, unapproved services, or extra homepage sections may be introduced.

## Assets and content model

`src/types/content.ts` defines navigation, responsive images, stories, projects, services, reviews, process steps, and form fields. During component implementation, the supplied content files should be converted without copy changes into typed constants under `src/content/`. Meaningful images require descriptive `alt`; decorative images use `alt=""`. Production photography must use AVIF/WebP with intrinsic `width`/`height`, responsive `srcset`/`sizes`, eager hero loading, and lazy loading below the fold. Supplied PNGs remain visual references rather than production assets.

## Responsive and interaction contract

- Shared maximum content width is 1280px with 32px desktop, 24px tablet, and 16px mobile gutters. Section spacing is 64px, 48px, and 36px respectively.
- Breakpoints: mobile through 575px; small tablet from 576px; tablet from 768px; desktop from 992px; large desktop from 1200px. At mobile all grids become one column, hero copy remains left aligned, CTA buttons wrap/stack, and controls have a 44px minimum touch height.
- Anchor navigation scrolls smoothly unless reduced motion is requested. The drawer, modal, lightbox, and form must be keyboard operable with focus management. A mobile snap gallery is allowed only when all content remains keyboard accessible.
- Desktop uses the prototype's compact rhythm and shared container except full-width dark bands. All target widths (375, 768, and 1440px) must avoid overlap and horizontal scrolling.

## Accessibility, quality, and performance

Target WCAG 2.2 AA: one `h1`, semantic heading order/landmarks, labelled inputs (never placeholder-only), visible focus, keyboard operation, appropriate alt text, video controls/captions, normal-text contrast of at least 4.5:1, and `prefers-reduced-motion`. Tests must cover content shape, tokens, IDs, order, navigation, form restrictions/validation, and subsequent component behavior.

Targets are Lighthouse performance >=90, accessibility >=95, LCP <=2.5s, and CLS <=0.1. Avoid a heavy component library, reserve media dimensions, defer below-fold code/media where useful, and produce visual regression captures at 375px, 768px, and 1440px before acceptance.

## Launch blockers: verification required

The following production values are intentionally absent and must remain visibly tracked as **launch blockers** until supplied and approved by JAY Builders:

- Phone number, email, postal address, service-area details, and all other business contact data.
- Registered company number and legal/footer identity details.
- All testimonial/reviewer names, quotations, ratings, and permissions.
- Review-platform names, scores, counts, badges, and any other platform claims.
- Any project, service, trust, emergency-response, certification, or performance claim not present in verified source content.

Do not invent temporary replacements. Structured data (`LocalBusiness`, `Service`, `Review`) and Open Graph values may only ship after the corresponding facts and assets are verified.

## Acceptance checklist

1. Section order and proportions visually match `JAY_Builders.png`; every section uses its matching text and reference during component implementation.
2. No unapproved content remains; all CTAs have valid targets.
3. Desktop/tablet/mobile layouts have no overlap or horizontal scroll, and urgent assistance never obscures the form/footer.
4. Upload restrictions, client/server validation, inline success, honeypot, and rate limiting work.
5. WCAG and performance checks meet the targets above; production images follow the loading/format rules.
6. Unit, lint, strict type-check, build, and visual regression screenshots at 375/768/1440 pass before release.
