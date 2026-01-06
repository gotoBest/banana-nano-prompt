# Typography System - Design Documentation

## Font Family Selection

### Design Direction: Retro-Futuristic Editorial
A bold, geometric approach that combines technical precision with creative expression - perfect for an AI prompt gallery with playful banana branding.

### Font Families

#### 1. Display Font: **Syne**
- **Weights**: 700 (Bold), 800 (ExtraBold)
- **Usage**: Headlines, titles, hero text, ID badges
- **Personality**: Ultra-bold, geometric, unforgettable
- **Why**: Unique geometric shapes create strong visual impact. The artistic yet technical feel perfectly matches an AI creative gallery.

#### 2. Body Font: **Outfit**
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage**: Body text, UI elements, descriptions, metadata
- **Personality**: Refined, modern, highly readable
- **Why**: Geometric sans-serif with tech-forward feel. Clean and contemporary without being generic like Inter.

#### 3. Mono Font: **Space Mono**
- **Weights**: 400 (Regular), 700 (Bold)
- **Usage**: Code blocks, prompts, technical labels, model names
- **Personality**: Technical with character
- **Why**: More personality than utilitarian JetBrains Mono, more distinctive than standard monospaces.

## Typography Scale

### Display Headlines
```css
.display-xl  - 5rem   / 0.95 line-height / -0.04em letter-spacing / weight 800
.display-lg  - 4rem   / 1.0 line-height  / -0.035em letter-spacing / weight 800
.display-md  - 3rem   / 1.05 line-height / -0.03em letter-spacing / weight 700
.display-sm  - 2.25rem / 1.1 line-height  / -0.025em letter-spacing / weight 700
```

### Content Headings
```css
.h1 - 2rem   / 1.2 line-height / -0.02em letter-spacing / weight 700
.h2 - 1.5rem / 1.3 line-height / -0.015em letter-spacing / weight 600
.h3 - 1.25rem / 1.4 line-height / -0.01em letter-spacing / weight 600
```

### Body Text
```css
.body-lg  - 1.125rem / 1.6 line-height / -0.005em letter-spacing / weight 400
.body     - 1rem     / 1.6 line-height / 0em letter-spacing     / weight 400
.body-sm  - 0.875rem / 1.5 line-height / 0.005em letter-spacing / weight 400
.caption  - 0.75rem  / 1.4 line-height / 0.02em letter-spacing  / weight 500
```

## Letter Spacing Utilities

```css
.ultra-tight    - -0.05em  (Display XL)
.extra-tight    - -0.04em  (Display LG)
.tight          - -0.025em (Display MD)
.normal-tight   - -0.015em (Display SM, H1)
.slight-tight   - -0.01em  (H2)
.normal         - 0em      (Body)
.wide           - 0.025em  (Small text, captions)
.extra-wide     - 0.05em   (Tags, pills)
.ultra-wide     - 0.1em    (Special emphasis)
```

## Typography Utilities

### Font Families
```css
.font-display          /* Syne - headlines */
.font-body             /* Outfit - body text */
.font-mono             /* Space Mono - code/tech */
```

### Font Variants
```css
.font-display-bold         /* Syne 700 */
.font-display-extrabold    /* Syne 800 */
.font-body-light           /* Outfit 300 */
.font-body-regular         /* Outfit 400 */
.font-body-medium          /* Outfit 500 */
.font-mono-regular         /* Space Mono 400 */
```

### Text Effects
```css
.text-gradient          /* Static gradient (banana → pink → purple) */
.text-gradient-animated /* Animated shimmer gradient */
.text-gradient-glow     /* Gradient with glow effect */
.text-hover-glow        /* Glow on hover */
```

### Display Utilities
```css
.text-display           /* Bold display font */
.tracking-tight-display /* Tight letter spacing for headlines */
.leading-tight-display  /* Tight line height for headlines */
.leading-snug-display   /* Slightly relaxed line height */
```

## Usage Patterns

### 1. Hero/Display Text
```jsx
<h1 className="font-display font-extrabold text-display-xl tracking-tight-display text-gradient">
  🍌 NANO BANANA
</h1>
```

### 2. Section Headings
```jsx
<h2 className="font-display font-bold text-2xl text-white mb-3 leading-tight tracking-tight-display">
  Case Title
</h2>
```

### 3. Card Titles
```jsx
<h3 className="font-display font-semibold text-base lg:text-lg text-white leading-snug tracking-tight-display">
  Title
</h3>
```

### 4. Body Text
```jsx
<p className="font-body-regular text-body leading-relaxed">
  Description text goes here...
</p>
```

### 5. Technical Labels
```jsx
<span className="font-mono text-xs tracking-wide">
  gpt-4o
</span>
```

### 6. ID Badges
```jsx
<span className="font-display font-bold text-xs text-banana-400 tracking-tight">
  #123
</span>
```

### 7. Code Blocks
```jsx
<pre className="font-mono text-sm bg-purple-950/70 leading-relaxed">
  code here
</pre>
```

## Color + Typography Integration

### Gradient Text
The gradient flows from banana yellow → neon pink → neon purple, creating visual continuity with the brand colors.

```css
background: linear-gradient(to right, #FFE866, #FF6B9D, #B983FF);
```

### Typography Hierarchy by Color
- **Banana Yellow (#FFE866)**: Primary CTAs, ID badges, key stats
- **Neon Pink (#FF6B9D)**: Accent text, hover states, alerts
- **Neon Purple (#B983FF)**: Secondary information, metadata
- **White**: Primary headlines, body text
- **Purple-300**: Supporting text, labels

## Animation Effects

### Text Shimmer
```css
animation: text-shimmer 3s ease-in-out infinite;
```
Creates a flowing gradient effect on headlines.

### Character Reveal
```css
animation: char-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```
Staggered character reveal for load animations.

### Hover Glow
```css
text-shadow:
  0 0 20px rgba(255, 225, 53, 0.5),
  0 0 40px rgba(185, 131, 255, 0.3);
```
Glow effect on hover for interactive elements.

## Performance Optimization

### Font Loading
- **Strategy**: Next.js font optimization with `display: 'swap'`
- **Preloading**: Font weights are pre-specified to avoid layout shifts
- **Subsets**: Latin subset optimized for performance
- **Variable Fonts**: Using CSS variables for dynamic font switching

### Rendering Quality
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

## Accessibility

### Contrast Ratios
- White on dark backgrounds: WCAG AAA compliant
- Banana yellow accents: WCAG AA compliant
- All text meets minimum contrast requirements

### Responsive Scaling
- Fluid typography using Tailwind's responsive prefixes
- Text scales proportionally across breakpoints
- Line heights adjust for readability at different sizes

## Design Principles

1. **Bold Hierarchy**: Clear distinction between display, body, and mono fonts
2. **Geometric Consistency**: All three fonts share geometric DNA
3. **Technical + Creative**: Fonts balance precision with artistic expression
4. **Memorable**: Unusual font choices (Syne) create lasting impression
5. **Readable**: Despite bold choices, body text remains highly legible
6. **Performance**: Optimized loading without sacrificing aesthetics

## Components Updated

- ✅ `src/app/layout.tsx` - Font loading configuration
- ✅ `tailwind.config.ts` - Typography scale and utilities
- ✅ `src/app/globals.css` - Typography utilities and optimizations
- ✅ `src/components/Header.tsx` - Logo and navigation typography
- ✅ `src/components/PromptCard.tsx` - Card titles and labels
- ✅ `src/components/Modal.tsx` - Modal headings and content

## Future Enhancements

Possible additions for continued typography refinement:
1. Custom font weights for even more granular control
2. Variable font versions for animated typography
3. Number/tabular figures for data displays
4. Small caps for stylistic variants
5. OpenType features (ligatures, alternates) where appropriate
