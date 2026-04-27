# Johana Star Life Coaching — Project Brief

## About Johana

Johana Star is a life coach based in California. They are late-diagnosed autistic, nonbinary, trans, queer, and in recovery from complex trauma. They have a background as a Ruby developer (visible in a Ruby gem tattoo in pride colours on their shoulder). They peer-facilitate NAMI Connections meetings and are shadowing as an Independent Facilitator with Educators and Advocates. They have personally navigated the California Self-Determination Program (SDP).

Their coaching practice focuses on:
- Neurodivergent people (especially late-diagnosed)
- People managing mental health conditions
- Queer and trans people
- California Regional Center and DDS navigation

They are **not** a licensed mental health practitioner — they are a life coach bringing peer support from lived experience.

---

## The Site

A one-page coaching website at `index.html`. Also includes `styleguide.html` as a living design reference.

### File Structure
```
index.html
styles.css
script.js
styleguide.html
styleguide.js
images/
  seen.svg
  flag-trans.svg
  flag-nonbinary.svg
  headshot.jpg
  person.svg
  check.svg
  shield.svg
  mug.svg
  calendar.svg
  pencil.svg
```

---

## Palette — Tide Garden

Two-layer CSS token system: color tokens → semantic tokens.

### Color Families

**Dairy:** white `#ffffff`, cream `#f8f8f4`, feta `#eeeee4`, chevre `#d8d8c8`

**Reds & pinks:** blush `#fceef5`, sakura `#e8a0c0`, peony `#c7508c`, cherry `#883060`

**Oranges:** turmeric `#f6edde`, ginger `#dcb288`, saffron `#c62810`, cayenne `#b24c19` — light to dark

**Yellows:** butter `#faf5c0`, mustard `#d8c030`, dijon `#b8a020`, molasses `#6a5800` — a complete condiment progression, light to dark

**Greens:** mint `#e8f4ea`, thyme `#a8d0b0`, sage `#7aaa82`, pine `#2a5a32`

**Blues & darks:** horizon `#d1e5f0`, coastal `#88bcd8`, navy `#4a5472`, abyss `#1a2244`

**Purples:** lilac `#e7e6f0`, thistle `#c8c6dd`, lavender `#7570a9`, iris `#494573`

**Retired:** peony (old), paprika, periwinkle, kikyo, wisteria, and haze

### Semantic Tokens (key ones)
```css
--background:            cream
--surface:               white
--surface-alt:           feta
--surface-alt-dark:      chevre
--surface-warm:          turmeric
--text:                  abyss
--text-mid:              navy
--text-light:            navy
--accent:                lavender
--accent-hover:          iris
--accent-tertiary:       mustard
--accent-warm:           cayenne
--highlight:             sakura
--highlight-dark:        cherry
--muted:                 coastal
--deep:                  abyss
--horizon:               horizon
```

### Section Background Sequence
| Section | Background |
|---|---|
| Nav | cream-88 (frosted) |
| Banner | sakura→cherry→cayenne→mustard→sage→coastal→abyss→lavender stripes |
| Hero | cream |
| Trust bar | lavender |
| About | sakura |
| Not-therapy | abyss |
| Offerings | turmeric |
| Systems | pine |
| Process | abyss |
| Diagnosis | navy |
| Testimonials | lavender (commented out) |
| Book/CTA | mustard |
| Footer | coastal |

### Color Wheel Relationships
- coastal (H=201°), navy (H=225°), abyss (H=229°) — analogous nautical cluster
- mustard (H=51°) and lavender (H=245°) — near-complementary (194° apart)
- sakura (H=333°) and sage (H=130°) — near-complementary (157° apart)
- mustard/sage/sakura — split-complementary triad

---

## Coding Conventions

- **Semantic HTML throughout** — `<ul>/<li>` for lists, `<table>` for tabular data, `<article>` for self-contained content, `<figure>` for testimonials, `<ol>/<li>` for process steps
- **Unique elements use `id`, not `class`** — sections, banner, trust-bar all use ids
- **No inline styles** — all to stylesheet as named classes
- **Scoped generic classes** — `.inner`, `.label`, `.card` scoped to their section id
- **One declaration per line** in CSS
- **American spelling** — "color" not "colour" in comments and copy
- **Two-layer CSS tokens** — color names in `:root`, semantic aliases reference them; rules only use semantic tokens
- **SVGs extracted** to `images/` folder; colors hardcoded with mapping comments since CSS custom properties don't work in external SVGs
- **No inline scripts** — JS in `script.js` and `styleguide.js`
- **Evocative naming** — tokens named after what they evoke (dairy, flora, culinary, nautical), not what they describe

### CSS Architecture
```
:root {
  /* color tokens — named palette */
  /* tints and shades — with HSL derivation comments */
  /* retired colors */
  /* semantic tokens — what rules reference */
  /* opacity variants */
}
```

### Tag Classes
- `tag-accent` — lavender family (lilac bg, thistle border, iris text)
- `tag-secondary` — sage family (mint bg, thyme border, pine text)
- `tag-tertiary` — mustard family (butter bg, mustard border, molasses text)
- `tag-highlight` — sakura family (blush bg, sakura border, cherry text)
  - On sakura background: overridden to horizon bg, coastal border, abyss text

---

## Typography

- **Display/headings:** Cormorant Garamond, weight 300
- **Body/UI:** DM Sans, weight 300 (body), 400 (nav CTA), 500 (labels, trust bar)
- **h1:** `clamp(2.6rem, 5vw, 4rem)`, tracking -0.01em, leading 1.1
- **h2:** `clamp(2rem, 3.5vw, 2.8rem)`, leading 1.2
- **h3:** `clamp(1.8rem, 3vw, 2.4rem)`, leading 1.2
- **Body:** 0.95–1.05rem, leading 1.75–1.85
- **Labels:** 0.72rem, weight 500, tracking 0.14em, uppercase
- **Disclaimer/note:** 0.8rem, sakura left border

---

## Copy Voice

- Direct, warm, honest — not performative
- Front-loads the most important information
- Names systems plainly and takes positions ("The system is confusing on purpose")
- Discloses personal experience naturally, without over-explaining
- Uses American English spelling
- Avoids "affirming" language (says "Neurodivergent" not "Neurodivergent-affirming")
- Design language principle: name things after what they evoke, not what they describe

### Approved Headings
- h1: "Someone who actually gets it."
- About h2: "Late-diagnosed, recovering from trauma, and still figuring it out — same as you."
- Offerings h2: "The stuff most coaches don't touch — from feeding yourself to meeting your activities of daily living to finding your footing."
- Systems h2: "The system is confusing on purpose. I can help."
- Diagnosis h2: "You're more than your condition or identity. You're also allowed to struggle with it."
- Process h2: "Here's what working together actually looks like."

---

## Punchlist

### Blocked on content
- **Body copy review** — go section by section through about, not-therapy, offerings, systems, process, diagnosis, and book. Headings are approved (see above). Body paragraphs still need editing toward Johana's natural voice. In progress with writer friend.
- **Testimonials** — section is commented out in the HTML pending real testimonials. Once received: write heading and copy, uncomment section, update styleguide.

### Styleguide
- **Color combinations section** — approved pairings with contrast ratios. Currently colors are shown individually but not as pairs.
- **Update palette.js scores** — scores in styleguide.js reflect a snapshot and will drift as the design evolves. Revisit after major section changes.

### Done
- **Global type scale** — base font-size set to 18px globally, 20px on mobile via media query.
- **`info.svg` icon** — replaced with `pencil.svg` on the Artistic practice card.
- **Retired tokens** — paprika, periwinkle, kikyo removed from stylesheet. Peony and saffron reinstated as active tokens.
- **New tokens** — ginger (`#dcb288`) and updated saffron (`#c62810`) added to the orange family. Palette table now has no empty cells.
- **Spacing and layout section** — added to styleguide.html with section padding, inner max-width, grid gap, and breakpoint documentation.
- **Voice and tone section** — added to styleguide.html including naming convention, language preferences, and singular they guidance.
- **Nav height** — `#banner` margin-top now uses `var(--nav-height)` computed dynamically by script.js. Documented in stylesheet.
- **Calendly widget** — documented in HTML. No further action needed.

---

## Client Personas (anonymised & amalgamated)

Personas are named after Tide Garden colors to signal their emotional register.

---

### Sage
*"I just got the diagnosis. I don't know what to do with it."*

Late 30s. Received an autism or ADHD diagnosis recently after years of struggling without explanation. Relieved and grieving simultaneously. Has a stable life on the surface — job, apartment, relationships — but privately finds basic things exhausting in ways she can't explain to people around her. Doesn't know whether to tell her employer. Isn't sure if she "counts" as disabled. Needs help figuring out what the diagnosis actually means for her daily life, not a clinical explanation of what autism is.

**What they're looking for:** Someone who has been through it and can talk plainly. Not therapy. Not another explainer. A person who gets it without needing it explained.

---

### Tommy
*"My son qualifies for Regional Center support. We don't know where to start."*

Parent of a nonverbal autistic child entering adolescence. Already receiving traditional service delivery through a Regional Center but doesn't fully understand what else might be available. Has heard of the Self-Determination Program but found the information overwhelming and acronym-heavy. Worried about what happens when her son ages out of school services. Time-poor, emotionally depleted, and skeptical of systems that seem designed to discourage access.

**What they're looking for:** An Independent Facilitator referral, or coaching to help her navigate the system herself. Practical knowledge, not platitudes. Honest assessment of what's realistically achievable.

---

### Rosa
*"I'm figuring out my gender and my brain at the same time."*

Mid-20s, recently out as nonbinary or trans. Also late-diagnosed neurodivergent, or strongly suspects it. The two processes are tangled — it's hard to know where identity ends and neurodivergence begins. Has found most therapists either focus on one or the other, or don't have enough lived experience with either. Burned through a lot of energy masking in previous jobs and relationships. Currently rebuilding.

**What they're looking for:** A coach who holds both threads without requiring her to choose which one is "the real issue." Someone who won't pathologize either their gender or their brain.

---

### Perry
*"I used to be able to function. I don't know what happened."*

Early 40s. Has been high-functioning for most of his adult life — until he wasn't. Burnout hit hard and didn't lift. Now struggles with feeding himself, maintaining routines, and getting out of the house. Has tried therapy but found it too process-focused and not practical enough. Suspects undiagnosed ADHD or autism but hasn't pursued assessment. Ashamed that things most people find easy feel impossible to him.

**What he's looking for:** Practical, non-judgmental support with daily living — the unglamorous stuff. Someone who won't tell him to meditate or make a vision board.

---

**Key insight across all personas:** Most clients arrive having already done significant research. They're not looking for information — they're looking for someone who can sit with them in the complexity without flinching.

