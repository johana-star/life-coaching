"""
palette-utils.py — Tide Garden palette color utilities
Johana Star Life Coaching

Utility functions for working with the Tide Garden palette. Used to:
  - Convert between hex and HSL
  - Calculate WCAG contrast ratios
  - Derive tints and shades from existing tokens
  - Verify palette decisions

All HSL values use the CSS convention:
  H = hue in degrees (0–360)
  S = saturation as percentage (0–100)
  L = lightness as percentage (0–100)
"""

import colorsys


# ─── Conversion ──────────────────────────────────────────────────────────────

def hex_to_rgb(hex: str) -> tuple[float, float, float]:
    """Convert a hex color string to an (r, g, b) tuple with values 0–1."""
    hex = hex.lstrip('#')
    return tuple(int(hex[i:i+2], 16) / 255 for i in (0, 2, 4))


def hex_to_hsl(hex: str) -> tuple[float, float, float]:
    """
    Convert a hex color string to (H, S, L).

    Returns H in degrees (0–360), S and L as percentages (0–100).
    Uses CSS convention where colorsys returns (h, l, s) — note the swap.
    """
    r, g, b = hex_to_rgb(hex)
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return round(h * 360, 1), round(s * 100, 1), round(l * 100, 1)


def hsl_to_hex(h: float, s: float, l: float) -> str:
    """
    Convert HSL values to a hex color string.

    H in degrees (0–360), S and L as percentages (0–100).
    """
    h, s, l = h / 360, s / 100, l / 100
    r, g, b = colorsys.hls_to_rgb(h, l, s)  # note: hls not hsl
    return '#{:02x}{:02x}{:02x}'.format(int(r * 255), int(g * 255), int(b * 255))


# ─── WCAG Contrast ───────────────────────────────────────────────────────────

def linearize(c: float) -> float:
    """
    Convert an sRGB channel value (0–1) to linear light.

    This is the inverse of the sRGB gamma encoding. Required before
    calculating relative luminance per WCAG 2.1 spec.
    """
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex: str) -> float:
    """
    Calculate the relative luminance of a color per WCAG 2.1.

    Luminance is a perceptual measure of brightness, ranging from 0 (black)
    to 1 (white). Uses the standard coefficients for human color perception:
    red 21.26%, green 71.52%, blue 7.22%.
    """
    r, g, b = hex_to_rgb(hex)
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)


def contrast_ratio(hex1: str, hex2: str) -> float:
    """
    Calculate the WCAG 2.1 contrast ratio between two colors.

    Ratio = (L_lighter + 0.05) / (L_darker + 0.05)
    Range: 1:1 (no contrast) to 21:1 (black on white).
    """
    l1, l2 = luminance(hex1), luminance(hex2)
    lighter, darker = max(l1, l2), min(l1, l2)
    return round((lighter + 0.05) / (darker + 0.05), 2)


def wcag_level(ratio: float) -> str:
    """
    Return the WCAG compliance level for a given contrast ratio.

    AAA  ≥ 7.0  — enhanced (normal text)
    AA   ≥ 4.5  — minimum (normal text)
    AA Large ≥ 3.0  — minimum (large text / UI components)
    Fail < 3.0
    """
    if ratio >= 7.0:
        return 'AAA'
    if ratio >= 4.5:
        return 'AA'
    if ratio >= 3.0:
        return 'AA Large'
    return 'Fail'


def check_pair(fg: str, bg: str, label: str = '') -> None:
    """Print a formatted contrast check for a foreground/background pair."""
    ratio = contrast_ratio(fg, bg)
    level = wcag_level(ratio)
    prefix = f'{label}: ' if label else ''
    print(f'{prefix}{fg} on {bg}  →  {ratio:.2f}  {level}')


# ─── Palette Derivation ──────────────────────────────────────────────────────

def derive_tint(hex: str, target_l: float) -> str:
    """
    Derive a tint or shade of a color by adjusting its lightness.

    Keeps hue and saturation constant, sets lightness to target_l (0–100).
    Used to generate the Tide Garden family steps from anchor colors.

    Example:
        mustard = '#d8c030'  # H=51° S=68% L=52%
        butter  = derive_tint(mustard, 87)  # → '#faf5c0'  L=87%
    """
    h, s, _ = hex_to_hsl(hex)
    return hsl_to_hex(h, s, target_l)


def family_report(name: str, tokens: list[tuple[str, str]]) -> None:
    """
    Print a formatted report of a color family with HSL values.

    tokens: list of (name, hex) pairs
    """
    print(f'\n── {name} ──')
    for token_name, hex in tokens:
        h, s, l = hex_to_hsl(hex)
        print(f'  {token_name:<12} {hex}  H={h:>5.1f}° S={s:>5.1f}% L={l:>5.1f}%')


# ─── Active Palette ──────────────────────────────────────────────────────────

PALETTE = {
    # Dairy — lights & whites
    'white':    '#ffffff',
    'cream':    '#f5f5ef',
    'feta':     '#eeeee4',
    'chevre':   '#d8d8c8',

    # Reds & pinks — floral & fruity
    'blush':    '#fceef5',
    'sakura':   '#e8a0c0',
    'peony':    '#c7508c',
    'cherry':   '#883060',

    # Oranges — culinary, spices
    'turmeric': '#f6edde',
    'ginger':   '#dcb288',
    'saffron':  '#c62810',
    'cayenne':  '#b24c19',

    # Yellows — condiments (butter → mustard → dijon → molasses)
    'butter':   '#faf5c0',
    'mustard':  '#d8c030',
    'dijon':    '#b8a020',
    'molasses': '#6a5800',

    # Greens — culinary, herbal
    'mint':     '#e8f4ea',
    'thyme':    '#a8d0b0',
    'sage':     '#7aaa82',
    'pine':     '#2a5a32',

    # Blues & darks — nautical
    'horizon':  '#d1e5f0',
    'coastal':  '#88bcd8',
    'navy':     '#4a5472',
    'abyss':    '#1a2244',

    # Purples — floral & astronomical
    'lilac':    '#e7e6f0',
    'thistle':  '#c8c6dd',
    'lavender': '#7570a9',
    'iris':     '#494573',
}

FAMILIES = {
    'Dairy':       ['white', 'cream', 'feta', 'chevre'],
    'Reds & pinks':['blush', 'sakura', 'peony', 'cherry'],
    'Oranges':     ['turmeric', 'ginger', 'saffron', 'cayenne'],
    'Yellows':     ['butter', 'mustard', 'dijon', 'molasses'],
    'Greens':      ['mint', 'thyme', 'sage', 'pine'],
    'Blues & darks':['horizon', 'coastal', 'navy', 'abyss'],
    'Purples':     ['lilac', 'thistle', 'lavender', 'iris'],
}


# ─── CLI ─────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    import sys

    args = sys.argv[1:]

    if not args:
        print(__doc__)
        print('Usage:')
        print('  python palette-utils.py <hex>              — HSL values for a color')
        print('  python palette-utils.py <hex1> <hex2>      — contrast ratio')
        print('  python palette-utils.py palette            — full palette report')
        sys.exit(0)

    if args[0] == 'palette':
        for family, names in FAMILIES.items():
            family_report(family, [(n, PALETTE[n]) for n in names])

    elif len(args) == 1:
        hex = args[0]
        h, s, l = hex_to_hsl(hex)
        # Check against palette
        match = next((n for n, v in PALETTE.items() if v.lower() == hex.lower()), None)
        name_str = f' ({match})' if match else ''
        print(f'{hex}{name_str}  →  H={h}° S={s}% L={l}%')

    elif len(args) == 2:
        fg, bg = args
        check_pair(fg, bg)

    else:
        print('Too many arguments. See usage above.')
        sys.exit(1)
