# Style Guide

A single reference for typography across the site. All presets are defined in `src/index.css` under `@layer components` and consumed as utility classes. Apply them on any element — they don't set color, so pair with `text-black`, `text-white/80`, etc.

## Fonts
+
| Family | Source | Weights |
|---|---|---|
| **TT Hoves Pro** (only typeface) | `src/assets/TT_Hoves_Pro_*.ttf` | Regular 400, Medium 500 |

- `html` defaults to TT Hoves Pro Regular.
- Tailwind aliases: `font-hoves` → TT Hoves Pro · `font-sans` → TT Hoves Pro (so default Tailwind `text-*` keeps the face).
- **Only `font-normal` (400) and `font-medium` (500) are real weights.** Avoid `font-light`, `font-bold`, `font-black` — the browser will synthesize them and they look off.

## Typography presets

Use these for any new heading or paragraph. They bundle font-family, weight, size, leading, and tracking — pick by **role**, not by visual size, so a future redesign updates everything in one place.

### Headings (TT Hoves Pro Medium)

| Class | Use for | Size | Leading | Tracking |
|---|---|---|---|---|
| `text-display` | Hero headline (once per page) | `clamp(56px, 11vw, 200px)` | `0.9` | `-0.02em` |
| `text-h1` | Section headline | `clamp(40px, 6vw, 80px)` | `1` | `-0.015em` |
| `text-h2` | Sub-section heading | `clamp(28px, 4vw, 48px)` | `1.1` | `-0.01em` |
| `text-h3` | Card / small headings | `clamp(20px, 2.2vw, 28px)` | `1.2` | normal |

### Body (TT Hoves Pro Regular)

| Class | Use for | Size | Leading |
|---|---|---|---|
| `text-body-lg` | Lead paragraph (under display / H1) | `clamp(16px, 1.1vw, 18px)` | `1.6` |
| `text-body` | Default paragraph | `15px` | `1.55` |
| `text-body-sm` | Caption / fine print | `13px` | `1.5` |

### Label (TT Hoves Pro Medium)

| Class | Use for | Size | Tracking | Other |
|---|---|---|---|---|
| `text-eyebrow` | Uppercase kicker / label | `clamp(12px, 0.85vw, 14px)` | `0.2em` | uppercase |

## Usage rules

1. **Pick by role.** Use `text-display` for the page-level headline regardless of how big it ends up — never reach for `text-h1` because the design feels too small.
2. **Don't override font-family or weight on these classes.** If a heading needs to look different, it probably belongs to a new preset — add one in `src/index.css` rather than ad-hoc Tailwind classes on the element.
3. **Color is decoupled.** Always pair the preset with a color utility: `text-black`, `text-white`, `text-black/70`, etc.
4. **Buttons, nav, and other branded UI** are not paragraphs/headings — keep their existing `font-medium uppercase tracking-[0.2em]` styling unless asked otherwise.

## Examples

```tsx
// Hero
<h1 className="text-display text-black">Bold Ideas</h1>
<p className="text-body-lg text-black/80">…lead paragraph…</p>

// Section
<span className="text-eyebrow text-black/60">Our work</span>
<h2 className="text-h1 text-black">Selected projects</h2>
<p className="text-body text-black/70">…description…</p>

// Card
<h3 className="text-h3 text-black">Forestial Outpost</h3>
<p className="text-body-sm text-black/60">2024 · Site of the day</p>
```

## Adding a new preset

Open [src/index.css](src/index.css) and add inside the existing `@layer components` block:

```css
.text-quote {
  @apply font-hoves font-normal italic leading-[1.4];
  font-size: clamp(20px, 2vw, 28px);
}
```

Then document it in the table above.
