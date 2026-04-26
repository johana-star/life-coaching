(function() {
  // Visual weight scores — estimated rendered area × role on the page.
  // Scoring rationale (arbitrary units, relative only):
  //   - Full-width section backgrounds score 70–120 based on content height
  //   - Large fills (hero image box, portrait, cards) score 10–50
  //   - Section-wide text color scores 8–20 (many elements but small area each)
  //   - SVG illustration fills score 15–20 (large image, partial fill)
  //   - Accent/label text scores 3–8 (small but intentional)
  //   - Tag backgrounds score 2 per tag (pill-sized)
  //   - Tag borders/text score 1 per tag
  //   - Borders and dividers score 1–3
  //   - Hover states, banner stripes: not persistent, score 1
  //   - Testimonials section is commented out in HTML: not scored
  //
  // Section backgrounds:
  //   body/hero:     cream
  //   nav:           cream-88
  //   trust-bar:     lavender
  //   about:         sakura
  //   not-therapy:   abyss
  //   offerings:     turmeric
  //   systems:       pine
  //   process:       abyss
  //   diagnosis:     navy
  //   book/CTA:      mustard
  //   footer:        coastal

  const palette = [
    { name: 'cream',     hex: '#f8f8f4', score: 820,  note: 'body + nav backgrounds' },
    { name: 'abyss',     hex: '#1a2244', score: 230,  note: 'not-therapy + process bg + body text' },
    { name: 'navy',      hex: '#4a5472', score: 120,  note: 'diagnosis bg + body text-mid' },
    { name: 'white',     hex: '#ffffff', score: 115,  note: 'portrait, hero image, badge, rc card' },
    { name: 'sakura',    hex: '#e8a0c0', score: 93,   note: 'about section background + tag-highlight' },
    { name: 'mustard',   hex: '#d8c030', score: 85,   note: 'book/CTA bg + process accents + tag borders' },
    { name: 'pine',      hex: '#2a5a32', score: 84,   note: 'systems section background + tag-secondary text' },
    { name: 'turmeric',  hex: '#f6edde', score: 80,   note: 'offerings section background' },
    { name: 'lavender',  hex: '#7570a9', score: 72,   note: 'trust-bar bg, nav cta, eyebrow, seen.svg' },
    { name: 'thyme',     hex: '#a8d0b0', score: 34,   note: 'seen.svg fill + step text + tag borders' },
    { name: 'coastal',   hex: '#88bcd8', score: 14,   note: 'footer bg + not-therapy text' },
    { name: 'cayenne',   hex: '#b24c19', score: 12,   note: 'offerings label, h2 em + card h3 ×6' },
    { name: 'lilac',     hex: '#e7e6f0', score: 10,   note: 'tag-accent background ×5' },
    { name: 'chevre',    hex: '#d8d8c8', score: 9,    note: 'dividers and grid borders throughout' },
    { name: 'mint',      hex: '#e8f4ea', score: 8,    note: 'tag-secondary background ×4' },
    { name: 'parchment', hex: '#faf5c0', score: 8,    note: 'tag-tertiary background ×4' },
    { name: 'sage',      hex: '#7aaa82', score: 5,    note: 'systems h2 em + label' },
    { name: 'haze',      hex: '#8a94b0', score: 5,    note: 'note text in diagnosis' },
    { name: 'thistle',   hex: '#c8c6dd', score: 5,    note: 'tag-accent border ×5' },
    { name: 'iris',      hex: '#494573', score: 5,    note: 'tag-accent text ×5' },
    { name: 'blush',     hex: '#fceef5', score: 4,    note: 'tag-highlight background ×2 (systems)' },
    { name: 'molasses',  hex: '#6a5800', score: 4,    note: 'tag-tertiary text ×4' },
    { name: 'cherry',    hex: '#883060', score: 3,    note: 'tag-highlight text ×2 + banner stripe' },
    { name: 'feta',      hex: '#eeeee4', score: 3,    note: 'icon backgrounds ×6' },
    { name: 'wisteria',  hex: '#5f5a96', score: 1,    note: 'nav cta hover only (not persistent)' },
    { name: 'dijon',     hex: '#b8a020', score: 1,    note: 'banner stripe (not persistent)' },
  ];

  const sorted = [...palette].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  const rest = sorted.slice(1);
  const max = winner.score;
  const chart = document.getElementById('usageChart');

  // Show winner as text above chart
  const winnerEl = document.createElement('p');
  winnerEl.className = 'usage-winner';
  winnerEl.innerHTML = 'First place: <strong>' + winner.name + '</strong> — ' + winner.note;
  chart.before(winnerEl);

  rest.forEach(item => {
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
