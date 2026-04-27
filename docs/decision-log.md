# Johana Star Coaching Site — Decision Log

A curated record of key decisions made during the design and build of the site.
Entries are grouped by topic and ordered roughly chronologically within each group.

---

## Palette — Tide Garden

- Named the palette **Tide Garden** — captures the aquatic and botanical threads simultaneously
- Two-layer token system: colour tokens (named) → semantic tokens (functional aliases). Rules only reference semantic tokens.
- Colour names are evocative natural/culinary references — never descriptive (e.g. `--mustard` not `--dark-yellow`)
- **Periwinkle → Lavender**: renamed and colour-shifted to `#7570a9` (H=245°) to match Johana's top in their headshot. Improves WCAG contrast to AA.
- **Navy/Abyss swapped**: abyss is now the deepest blue (`#1a2244`), navy is the mid blue (`#4a5472`) — semantically accurate.
- **Horizon** (`#d1e5f0`) added — coastal tint at L=88%, used as tag-highlight background on sakura sections.
- **Wisteria retired** — replaced by iris as `--accent-hover`. Iris (darker) gives clearer hover feedback on lavender CTA.
- **Haze retired** — failed WCAG on cream (2.84:1 — was never actually passing). Replaced by navy for `--text-light` and horizon for diagnosis note text.
- **Peony retired** — sakura preferred in all cases.
- **Paprika retired** — replaced by turmeric and cayenne as the orange family.
- **Periwinkle, kikyo** — reserved for future designs, not active.

---

## Section Backgrounds

Final sequence:
- Nav: cream-88 (frosted)
- Banner: sakura→cherry→cayenne→mustard→sage→coastal→abyss→lavender stripes
- Hero: cream
- Trust bar: lavender
- About: sakura (with abyss text — AAA)
- Not-therapy: abyss
- Offerings: turmeric (with cayenne accents)
- Systems: pine (with parchment/white text — all AAA)
- Process: abyss (with mustard accents)
- Diagnosis: navy (with white/cream/horizon text)
- Book/CTA: mustard (with abyss text — AAA, sage em accent)
- Footer: coastal (with abyss text — AAA)

Key colour decisions:
- Process section uses abyss background with mustard and sage accents. Book/CTA uses butter background with abyss text and pine em — related palette, distinct feel.
- tag-highlight (sakura) is invisible on sakura about background — overridden to horizon bg / coastal border / abyss text
- Systems moved from mint → sage → pine to get sufficient contrast for light text

---

## HTML Architecture

- **Semantic HTML throughout** — ul/li, table, article, figure, ol/li for process steps
- **Unique elements use id, not class** — all sections, banner, trust-bar use ids; converted from classes to avoid specificity issues
- **Specificity collision from class→id conversion** — when sections became ids, broad rules like `#diagnosis p` overrode component rules like `.regional-center.card p`. Fixed by scoping component rules to their section id (e.g. `#diagnosis .regional-center.card p`)
- **h4 → h3** — offering cards and process steps are at the same document depth. No intermediate h3 content between process h2 and step headings. All collapsed to h3.
- **Process step numerals** — CSS counter with `upper-roman` used instead of `list-style-type` because marker colour/font cannot be styled independently via list-style. Documented with comment in stylesheet.
- **Banner stripes** — two-class pattern: `.stripe` sets width (12.5%), `.sakura-bg` etc. sets background. Avoids collision with colour name classes elsewhere.
- **SVGs extracted** to `images/` folder. Colours hardcoded with mapping comments — CSS custom properties don't reliably work in external SVGs loaded via `<img>`.
- **Flag badges** — inline SVG replaced with external `flag-trans.svg` and `flag-nonbinary.svg`. Colours hardcoded to specific palette tokens (not generic pride flag colours).
- **Calendly widget** — has hardcoded `min-width: 320px` (vendor requirement). On mobile, `#book .layout` padding zeroed out and `.calendly-inline-widget` given `min-width: 0 !important` in media query to allow widget to fill viewport.

---

## CSS Architecture

- **No inline styles** — all to stylesheet. Exception: swatch background colours in palette table (intentional — directly referencing hex for display purposes).
- **Scoped generic classes** — `.inner`, `.label`, `.card` scoped to their section id
- **One declaration per line**
- **American spelling** in comments
- **Opacity variants** defined as named tokens in `:root` (e.g. `--cream-88`, `--lavender-15`)
- **Derivation comments** on all tints/shades — document HSL parent, direction, lightness delta, and resulting L value
- **Color wheel relationships** documented in `:root` comment block
- **Retired colors** section in `:root` — tokens kept for reference with note explaining retirement

---

## JavaScript

- **Nav hide/show on scroll** — hides after 100px scroll down, reappears on scroll up. CSS `transform: translateY(-100%)` with 0.3s transition. `{ passive: true }` on scroll listener for mobile performance.
- **`--nav-height` computed dynamically** — `setNavHeight()` runs on load and resize, sets CSS custom property. Fallback of 78px in CSS (determined empirically — nav padding is 1.25rem × 2 plus content height).
- **`script.js`** serves `index.html` (scroll animations, smooth scroll, nav hide, nav height)
- **`styleguide.js`** serves `styleguide.html` (colour usage chart)
- Two scripts — no `scripts/` folder needed yet (threshold is three)

---

## Copy and Voice

- **"Peer Life Coach" → "Life Coach"** — simpler, less jargon
- **"Peer coaching" → "Peer support"** — more accurate to what Johana offers
- **"Recovery" language softened** — not all clients identify as in recovery; some are in denial. Preferred phrasing: "recovering from trauma" (specific) over "in recovery" (connotes substance use)
- **Design language principle** — name things after what they evoke, not what they describe. Applies to token names, class names, section names, and copy.
- **Trust bar** — removed "-affirming" suffixes ("Neurodivergent" not "Neurodivergent-affirming"). Signals belonging rather than allyship.
- **"seen."** — word displayed as watermark in hero SVG. Considered alternatives: held, met, known, found, whole, heard, received, welcomed. Kept as "seen" for now.

---

## Styleguide

- **palette.html → styleguide.html** — promoted when typography and components sections were added
- **palette.js → styleguide.js** — renamed to match
- **TOC** — collapsible `<details>`/`<summary>` element, starts closed, caret rotates on open. No JS required.
- **`#process` used directly** in styleguide process step demo — avoids duplicating CSS counter rules
- **`#about` wrapper** in sakura tag demo — inherits section styles, overridden with `display: block; min-height: unset; padding: 0`
- **Nav demoed as mockup** — real `<nav>` cannot be nested in styleguide without collision with site nav

---

## Personas

Four anonymised/amalgamated client personas, named after Tide Garden colours:
- **Sage** — late-diagnosed adult, recently received diagnosis, relief and grief simultaneous
- **Tommy** — parent navigating Regional Center for a nonverbal autistic child
- **Rosa** — queer/trans person working through identity and neurodivergence simultaneously
- **Perry** — high-functioning burnout, struggles with daily living, undiagnosed, ashamed

Key insight: most clients arrive having already done significant research. They want someone who can sit with complexity, not explain it.
- **`body.palette-page` → `body.styleguide-page`** — renamed throughout styles.css and styleguide.html to match the file's promotion from palette to styleguide.
- **`--peony` removed** — slipped through the earlier retired token cleanup. Now gone from the active palette.
- **colour → color** — British spellings corrected to American throughout styles.css and styleguide.html comments and copy.
- **Styleguide footer updated** — "a palette" → "style guide"; 29 colours → 26 colors (reflecting retired token removals).

---

## New color tokens (April 2026)

- **`--peony`** (`#c7508c`) — restored to active palette. H=330° S=52% L=55%. Sibling of sakura, midpoint between sakura (L=77%) and cherry (L=36%). Fills row 3 of the reds & pinks family in the palette table.
- **`--ginger`** (`#dcb288`) — new orange family token. H=30° S=55% L=70%. Warm brown-orange, sits between turmeric and saffron. Culinary theme: the spice.
- **`--saffron`** (`#c62810`) — new orange family token. H=8° S=85% L=42%. Deep red-orange, derived from the color of saffron threads. Redder than cayenne (H=20°), similar depth. Orange family now reads light to dark: turmeric → ginger → saffron → cayenne.
- **Book/CTA background: mustard → butter** — mustard was too high-contrast and punchy for the closing section. Butter is softer and warmer. Pine on butter (AAA 7.24) replaces the failing sage-on-mustard (1.46 — Fail). Mustard retained as `--accent-tertiary` for process section and tag-tertiary; book background overrides directly with `var(--butter)`.
- **`tag-warm`** added — turmeric bg (`#f6edde`), ginger border (`#dcb288`), saffron text (`#c62810`). Saffron on turmeric passes AA at 4.87. Completes the orange family tag variant alongside accent (lavender), secondary (sage), tertiary (mustard), and highlight (sakura).
- **Hero `min-height: 100vh` removed** — the full-viewport height was leaving substantial dead space on desktop. Hero now sizes to content plus `4rem` padding. Confirmed visually on both landscape and portrait desktop views — feels warmer and more grounded.
