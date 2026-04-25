(function() {
  // Visual weight scores — estimated rendered area × role on the page.
  // Scoring rationale (arbitrary units, relative only):
  //   - Full-width section backgrounds score 70–120 based on content height
  //   - Large fills (hero image box, portrait, cards) score 10–50
  //   - Section-wide text color scores 8–15 (many elements but small area each)
  //   - SVG illustration fills score 15–20 (large image, partial fill)
  //   - Accent/label text scores 3–8 (small but intentional)
  //   - Tag backgrounds score 2 per tag (pill-sized)
  //   - Tag borders/text score 1 per tag
  //   - Borders and dividers score 1–3
  //   - Hover states, shadows, banner stripes: not persistent, score 1
  //   - Testimonials section is commented out in HTML: not scored
  //
  // Per-color breakdown:
  //   cream:     body bg (~800) + nav bg (~20) + hero bg (~100) = 920
  //   abyss:     not-therapy bg (~120) + process bg (~100) + body text (~8) + nav logo (~2) = 230
  //   sage:      systems bg (~80) + diagnosis bg (~90) + h2 em (~3) + label (~2) = 175
  //   white:     hero image box (~50) + badge bg (~10) + regional-center card (~25) + portrait (~30) = 115
  //   sakura:    about bg (~90) + tag-highlight border ×2 (~2) + banner stripe (~1) = 93
  //   mustard:   book bg (~70) + process label/numerals (~8) + step borders (~3) + tag-tertiary border ×4 (~4) = 85
  //   turmeric:  offerings bg (~80) = 80
  //   lavender:  trust-bar bg (~40) + eyebrow (~3) + h1 em (~3) + badge strong (~2) + nav cta (~5) + labels (~4) + seen.svg (~15) = 72
  //   thyme:     seen.svg fill (~20) + step text (~10) + tag-secondary border ×4 (~4) = 34
  //   navy:      lede + body text across sections (~33) = 33
  //   coastal:   footer bg (~10) + not-therapy em + panel label (~4) = 14
  //   cayenne:   offerings label (~3) + h2 em (~3) + card h3 ×6 (~6) = 12
  //   lilac:     tag-accent bg ×5 (~10) = 10
  //   chevre:    borders/grid gaps throughout (~9) = 9
  //   mint:      tag-secondary bg ×4 (~8) = 8
  //   parchment: tag-tertiary bg ×4 (~8) = 8
  //   thistle:   tag-accent border ×5 = 5
  //   iris:      tag-accent text ×5 = 5
  //   haze:      note text in systems + diagnosis = 5
  //   blush:     tag-highlight bg ×2 (systems section) = 4
  //   pine:      tag-secondary text ×4 = 4
  //   molasses:  tag-tertiary text ×4 = 4
  //   feta:      6 icon bgs = 3
  //   cherry:    tag-highlight text ×2 + banner stripe = 3
  //   wisteria:  nav cta hover only (not persistent) = 1
  //   dijon:     accent-tertiary hover only (not persistent) = 1

  const palette = [
    { name: 'cream',     hex: '#f8f8f4', score: 920,  note: 'body + hero + nav backgrounds' },
    { name: 'abyss',     hex: '#1a2244', score: 230,  note: 'not-therapy + process bg + body text' },
    { name: 'sage',      hex: '#7aaa82', score: 175,  note: 'systems + diagnosis section backgrounds' },
    { name: 'white',     hex: '#ffffff', score: 115,  note: 'portrait, hero image box, badge, rc card' },
    { name: 'sakura',    hex: '#e8a0c0', score: 93,   note: 'about section background + tag-highlight' },
    { name: 'mustard',   hex: '#d8c030', score: 85,   note: 'book/CTA bg + process accents + tag borders' },
    { name: 'turmeric',  hex: '#f6edde', score: 80,   note: 'offerings section background' },
    { name: 'lavender',  hex: '#7570a9', score: 72,   note: 'trust-bar bg, nav cta, eyebrow, seen.svg' },
    { name: 'thyme',     hex: '#a8d0b0', score: 34,   note: 'seen.svg fill + step text + tag borders' },
    { name: 'navy',      hex: '#4a5472', score: 33,   note: 'lede + body text across sections' },
    { name: 'coastal',   hex: '#88bcd8', score: 14,   note: 'footer bg + not-therapy text' },
    { name: 'cayenne',   hex: '#b24c19', score: 12,   note: 'offerings label, h2 em + card h3 ×6' },
    { name: 'lilac',     hex: '#e7e6f0', score: 10,   note: 'tag-accent background ×5' },
    { name: 'chevre',    hex: '#d8d8c8', score: 9,    note: 'dividers and grid borders throughout' },
    { name: 'mint',      hex: '#e8f4ea', score: 8,    note: 'tag-secondary background ×4' },
    { name: 'parchment', hex: '#faf5c0', score: 8,    note: 'tag-tertiary background ×4' },
    { name: 'thistle',   hex: '#c8c6dd', score: 5,    note: 'tag-accent border ×5' },
    { name: 'iris',      hex: '#494573', score: 5,    note: 'tag-accent text ×5' },
    { name: 'haze',      hex: '#8a94b0', score: 5,    note: 'note text in systems + diagnosis' },
    { name: 'blush',     hex: '#fceef5', score: 4,    note: 'tag-highlight background ×2 (systems)' },
    { name: 'pine',      hex: '#2a5a32', score: 4,    note: 'tag-secondary text ×4' },
    { name: 'molasses',  hex: '#6a5800', score: 4,    note: 'tag-tertiary text ×4' },
    { name: 'feta',      hex: '#eeeee4', score: 3,    note: 'icon backgrounds ×6' },
    { name: 'cherry',    hex: '#883060', score: 3,    note: 'tag-highlight text ×2 + banner stripe' },
    { name: 'wisteria',  hex: '#5f5a96', score: 1,    note: 'nav cta hover only (not persistent)' },
    { name: 'dijon',     hex: '#b8a020', score: 1,    note: 'accent-tertiary hover only (not persistent)' },
  ];

  const sorted = [...palette].sort((a, b) => b.score - a.score);
  const max = sorted[0].score;
  const chart = document.getElementById('usageChart');

  sorted.forEach(item => {
    const row = document.createElement('div');
    row.className = 'usage-row' + (item.score === 0 ? ' usage-zero' : '');
    row.title = item.note;

    const label = document.createElement('div');
    label.className = 'usage-label';
    label.textContent = item.name;

    const dot = document.createElement('div');
    dot.className = 'usage-dot';
    dot.style.background = item.hex;

    const barWrap = document.createElement('div');
    barWrap.className = 'usage-bar-wrap';

    const bar = document.createElement('div');
    bar.className = 'usage-bar';
    bar.style.width = max > 0 ? (item.score / max * 100) + '%' : '0%';
    bar.style.background = item.hex;
    bar.style.outline = '1px solid rgba(0,0,0,0.06)';
    barWrap.appendChild(bar);

    const note = document.createElement('div');
    note.className = 'usage-note';
    note.textContent = item.note;

    row.appendChild(label);
    row.appendChild(dot);
    row.appendChild(barWrap);
    row.appendChild(note);
    chart.appendChild(row);
  });
})();
