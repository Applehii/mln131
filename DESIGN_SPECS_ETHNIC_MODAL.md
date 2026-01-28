# 🎨 DESIGN SPECIFICATIONS: ETHNIC DETAIL MODAL
## Vietnamese Cultural Museum Digital Experience

---

## 📋 EXECUTIVE SUMMARY

### Vấn Đề Hiện Tại
- ❌ Hero section bị che bởi content panel → Tên dân tộc không rõ
- ❌ Overflow gây cắt chữ (crop content)
- ❌ Hierarchy không rõ ràng: Hero/Title bị "đè" bởi content
- ❌ Gallery ở cuối → Khó tìm hình ảnh của dân tộc
- ❌ Animation chưa đủ "museum feel"

### Giải Pháp Đề Xuất
✅ **Tách biệt rõ ràng**: Hero (100vh) → Content Panel (nổi dưới)
✅ **Hierarchy chuẩn**: Background → Hero → Title (clear) → Content Card
✅ **Gallery integration**: Panel chứa images riêng, dễ tiếp cận
✅ **Museum aesthetic**: Gradient overlay, soft shadow, elegant typography
✅ **Smooth animations**: Slide-up, fade-in (tinh tế, không flashy)

---

## 🏗️ LAYOUT STRUCTURE (VIEWPORT-BASED)

### Layer Stack (Z-Index Order)
```
Z-Index 2020:  Lightbox fullscreen image viewer
               └─ Backdrop (dark blur)
               └─ Image modal
               └─ Close button

Z-Index 2010:  Close button (top-right fixed)
               └─ Hover: scale effect

Z-Index 2005:  Backdrop (semi-transparent blur)

Z-Index 2000:  Main scrollable container
               ├─ HERO SECTION (fixed/sticky during scroll)
               ├─ CONTENT PANEL (floats below hero)
               ├─ DETAIL SECTIONS (scrolling content)
               ├─ DISTRIBUTION MAP SECTION
               ├─ GALLERY SECTION (integrated in panel)
               └─ FOOTER

Z-Index 1:     Background color/pattern
```

---

## 🎬 SECTION BREAKDOWN

### **SECTION 1: HERO (Full-Height Visual)**

#### Visual Design
```
┌─────────────────────────────────────────────┐
│                                             │
│   [BACKGROUND IMAGE - Full Width/Height]   │
│   • Ethnic group representative photo      │
│   • Aspect ratio: 16:9 (landscape)         │
│   • Object-fit: cover (no distortion)      │
│                                             │
│   [GRADIENT OVERLAY]                       │
│   • Top: Transparent (show image)          │
│   • Middle: Transparent → Semi-dark fade   │
│   • Bottom: Dark overlay (stone-950)       │
│   • Linear gradient for readability        │
│   • Opacity: 40-60% at bottom              │
│                                             │
│   [TITLE POSITIONING]                      │
│   • Absolute position: bottom-left         │
│   • Padding: 64px (desktop) / 32px (mobile)│
│   • z-index: 10 (above image)              │
│                                             │
│   Badge: "Dân tộc Việt Nam" (top-left)     │
│   Title: Vietnamese name (large serif)     │
│   Subtitle: Other names (italic, light)    │
│                                             │
└─────────────────────────────────────────────┘
```

#### Dimensions
- **Height**: 100vh (full viewport height)
- **Max-width**: None (full bleed)
- **Mobile height**: 80vh (leave some bottom visible)

#### Content Placement
```
HERO SECTION (Fixed Height Block)
├─ Background image (full cover)
├─ Gradient overlay (bottom-heavy)
├─ Badge (top-left)
│  └─ "Dân tộc Việt Nam" 
│     • Inline-flex: px-4 py-1.5
│     • bg-white/10 + backdrop-blur
│     • Border: white/20
│     • Font: xs, bold, uppercase, tracking-wide
│
├─ Ethnic Name (h1 / Title)
│  └─ {vietnameseName}
│     • Font-size: 5xl/7xl/8xl (responsive)
│     • Font: serif, black, leading-none
│     • Color: white (full opacity, no transparency)
│     • Max-width: 90% (avoid right edge cutoff)
│     • Margin-bottom: 16px
│
└─ Other Names (subtitle)
   └─ "Tên gọi khác: {otherNames}"
      • Font-size: xl/2xl (responsive)
      • Font: serif, light, italic
      • Color: white/70
      • Max-width: 90%
```

#### Animation for Hero
- **Entrance**: Title slides up from bottom + fade-in
  - Duration: 0.8s
  - Delay: 0.3s
  - Easing: "easeOut"
  - Initial state: opacity 0, translateY(+50px), scale(0.95)

- **Parallax on scroll**:
  - As user scrolls down, hero image moves slower than scroll
  - Transform: translateY(0 to 150px) over scroll range
  - Opacity: 1 to 0.3 over first 30% of scroll
  - Creates "depth" feeling

- **NO blur/dimming of hero as it scrolls**
  - Keep title readable throughout

#### Key Points
✅ Hero NEVER gets covered by content
✅ Title visible at all times
✅ Image scales proportionally (no stretch)
✅ Text always legible (contrast ✓)
✅ Mobile: Shorter height but FULL title still visible

---

### **SECTION 2: CONTENT PANEL (Floating Card)**

#### Visual Design
```
Hero (100vh)
   ↓
   [CONTENT PANEL starts at 85vh]
   
   ┌───────────────────────────────────────────────┐
   │                                               │
   │  [FLOATING CARD CONTAINER]                    │
   │                                               │
   │  Margin-top: -80px (negative margin = overlap) │
   │  → Creates "floating" effect above next section│
   │                                               │
   │  ┌─────────────────────────────────────────┐  │
   │  │                                         │  │
   │  │  QUOTE SECTION (Introduction)           │  │
   │  │  • Background: white/80 + backdrop      │  │
   │  │  • Border-radius: 2xl (rounded corners) │  │
   │  │  • Box-shadow: 2xl (soft shadow)        │  │
   │  │  • Border: white/50 (subtle frame)      │  │
   │  │  • Padding: 32-48px                     │  │
   │  │                                         │  │
   │  │  ┌──────────────────────────────────┐   │  │
   │  │  │ " [LARGE QUOTE MARK]            │   │  │
   │  │  │                                  │   │  │
   │  │  │ [INTRODUCTION TEXT]              │   │  │
   │  │  │ Font: serif, italic, lg/2xl      │   │  │
   │  │  │ Color: stone-700 (dark readable) │   │  │
   │  │  │ Line-height: relaxed (1.75)      │   │  │
   │  │  │                                  │   │  │
   │  │  └──────────────────────────────────┘   │  │
   │  │                                         │  │
   │  └─────────────────────────────────────────┘  │
   │                                               │
   └───────────────────────────────────────────────┘
   
   Background: [#faf9f7] (warm light beige)
```

#### Positioning & Spacing
- **Position**: Static (within document flow)
- **Top offset**: -80px (negative margin to overlap hero)
- **Horizontal**: mx-4 (mobile) → md:mx-auto
- **Max-width**: md:max-w-4xl (896px on tablets+)
- **Width**: 100% - 2rem (mobile), full (desktop)
- **Padding**: 8px top gap to show overlap

#### Card Styling
- **Background color**: rgba(255,255,255,0.8)
- **Backdrop filter**: blur(12px) - creates glassmorphism
- **Border-radius**: rounded-2xl (16px radius)
- **Box-shadow**: shadow-2xl (strong but soft)
- **Shadow color**: shadow-stone-900/10 (dark hint)
- **Border**: border border-white/50 (subtle frame)
- **Padding**: p-8 (mobile) → md:p-12 (desktop)

#### Content Inside Quote Section
```
┌─────────────────────────────────┐
│                                 │
│ " [Quote Mark - Large]          │
│                                 │
│ [Introduction Text]             │
│ • Font: serif (font-serif)       │
│ • Size: xl/2xl responsive        │
│ • Weight: regular (not bold)     │
│ • Style: italic                  │
│ • Line-height: relaxed           │
│ • Color: text-stone-700          │
│ • Text-align: left (in flex)     │
│                                 │
└─────────────────────────────────┘
```

#### Animation for Quote Section
- **Entrance**: Fade-in + slide-up
  - Trigger: When section enters viewport
  - Duration: 0.6s
  - Initial: opacity 0, y: 30px
  - Final: opacity 1, y: 0

---

### **SECTION 3: INFO CARDS (KPI Display)**

#### Visual Design
```
[SPACING: pt-16]

┌─────────────────────────────────────────────────┐
│                                                 │
│  [INFO CARDS GRID]                              │
│                                                 │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │ 👥 Dân số (2019) │  │ 🗺️ Vùng cư trú   │    │
│  │ 1,234,567        │  │ Tây Nguyên       │    │
│  └──────────────────┘  └──────────────────┘    │
│                                                 │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │ 🗣️ Nhóm ngôn ngữ │  │ 🏘️ Loại nhà ở    │    │
│  │ Môn-Khơ-me       │  │ Sàn nhà          │    │
│  └──────────────────┘  └──────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘

Max-width: max-w-5xl
Grid: grid-cols-1 (mobile) → md:grid-cols-3 (desktop)
Gap: 6 units (Tailwind spacing)
```

#### Individual Card Design
```
┌────────────────────────────────┐
│                                │
│  [ICON]  [LABEL]               │
│     ↑      ↑                    │
│  12x12   xs font, uppercase     │
│  circular  bold, stone-400      │
│  bg-primary/10
│
│  [VALUE]                        │
│     ↑                           │
│  font-bold, text-base           │
│  text-stone-800 (dark)          │
│                                │
│ Background: white              │
│ Border-radius: xl (rounded)     │
│ Padding: p-6 (all sides)        │
│ Border: border border-stone-100 │
│ Box-shadow: shadow-sm           │
│                                │
│ Hover state:                    │
│ • Box-shadow: shadow-xl (lift)  │
│ • Transform: translateY(-4px)   │
│ • Icon: scale-110 (grow)        │
│ • Duration: 300ms               │
│                                │
└────────────────────────────────┘
```

#### Animation for Cards
- **Entrance**: Stagger effect
  - Container: stagger children by 0.1s
  - Each card: opacity 0 → 1, y: 30 → 0
  - Duration: 0.6s per card
  - Delay start: 0.2s
  - Trigger: When section enters viewport

- **Hover micro-interaction**:
  - Lift effect: y: -4px
  - Shadow enhances
  - Icon scales: 1 → 1.1
  - Duration: 300ms (smooth)

#### Content Structure
```
Layout: flex, items-start, gap-4

Left side (flex-shrink-0):
├─ Circle icon container (w-12 h-12)
│  └─ Icon: primary color
│     Hover: scale-110

Right side (flex-1):
├─ Label (xs, bold, uppercase, tracking-wider)
│  Color: text-stone-400
│  Margin-bottom: mb-1
│
└─ Value (text-base, font-bold)
   Color: text-stone-800
   Line-height: snug (1.375)
   min-w-0 (prevent overflow)
```

#### Key Points
✅ Cards don't overflow on any screen size
✅ Icon size consistent (12x12)
✅ Text hierarchy: Label < Value (uppercase < normal)
✅ Hover effect NOT aggressive (subtle lift)
✅ Mobile: single column, no wrapping issues

---

### **SECTION 4: DETAIL CONTENT SECTIONS**

#### Visual Design
```
[SPACING: py-16, mb-16 between sections]

┌─────────────────────────────────────────────────┐
│                                                 │
│  [SECTION TITLE]                                │
│  "Nguồn gốc" / "Lịch sử" / etc                  │
│  ────────────────────────────────────────────   │
│                                                 │
│  [SECTION CONTENT - PARAGRAPHS]                 │
│  Lorem ipsum dolor sit amet...                  │
│  Duis aute irure dolor in reprehenderit...      │
│                                                 │
│  [NEXT SECTION TITLE]                           │
│  "Đặc điểm xã hội"                              │
│  ────────────────────────────────────────────   │
│                                                 │
│  [CONTENT...]                                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Container Structure
- **Max-width**: max-w-3xl
- **Padding**: px-4 (mobile) → md:px-8 (desktop)
- **Spacing**: space-y-16 (16 units between sections)
- **Background**: Inherit from parent (#faf9f7)

#### Section Title Styling
```
Title: {formatSectionTitle(key)}

Font: serif (font-serif)
Size: xl / md:text-2xl (responsive)
Weight: bold (font-bold)
Color: text-stone-800

Margin-bottom: mb-6
Padding-bottom: pb-3
Border-bottom: border-b-2 border-primary/20

Hover state:
├─ Border color changes: primary/20 → primary
├─ Transition: duration-300
└─ Creates emphasis effect (visual feedback)

Group effect:
└─ :hover applies to entire section group
   (Title highlights when hovering anywhere in section)
```

#### Content Text Styling
```
Text blocks: {content.split('\n').map(...)}

Font: regular serif
Size: lg (text-lg)
Color: text-stone-600 (slightly lighter than title)
Line-height: relaxed (8 - 2rem)
Text-align: justify (even distribution)
Line-length: ~65-75 chars (good for reading)

Paragraph spacing:
├─ mb-4 (between paragraphs)
└─ last:mb-0 (no margin after last)

Word break:
├─ break-words (on narrow screens)
└─ hyphens: auto (for justified text)
```

#### Animation for Content Sections
- **Entrance**: Stagger on scroll
  - Title: fadeInLeft
    - Duration: 0.5s
    - Delay: 0
    - Transform: x: -30 → 0, opacity: 0 → 1
  
  - Content: fadeInUp
    - Duration: 0.5s
    - Delay: 0.1s (after title)
    - Transform: y: 30 → 0, opacity: 0 → 1
  
  - Trigger: When section enters viewport (margin: -50px)
  - Once: true (only animate once)

- **Hover on title**: Border color shift (primary/20 → primary)
  - Duration: 300ms
  - Easing: linear

#### Key Points
✅ Text never overflows (break-words, hyphens)
✅ Line-height adequate for reading (≥ 1.75)
✅ Color contrast good (stone-600 on light background)
✅ Sections have clear boundaries (spacing, border)
✅ Animation tied to scroll (appear as you read)

---

### **SECTION 5: DISTRIBUTION MAP**

#### Visual Design
```
[SPACING: py-20]

┌─────────────────────────────────────────────────┐
│                                                 │
│  [MAP SECTION TITLE]                            │
│  "Phân bố địa lý"                               │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │                                         │   │
│  │  [LEAFLET MAP - INTERACTIVE]            │   │
│  │  • Show Vietnam map                     │   │
│  │  • Highlight ethnic group's regions     │   │
│  │  • Region color matches cluster color   │   │
│  │  • Hover: Show region name              │   │
│  │  • Mobile-responsive                    │   │
│  │                                         │   │
│  │  Aspect ratio: 16:9 or 4:3              │   │
│  │  Height: 400px (mobile) → 600px (desk)  │   │
│  │  Border-radius: rounded-xl               │   │
│  │  Box-shadow: shadow-lg                  │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [CAPTION/DESCRIPTION]                          │
│  "Dân tộc {name} cư trú chủ yếu tại:"           │
│  {region}                                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### Map Container
- **Max-width**: max-w-5xl
- **Margin**: mx-auto
- **Padding**: px-4 → md:px-8
- **Height**: 
  - Mobile: 400px
  - Tablet: 500px
  - Desktop: 600px
- **Aspect ratio**: Maintain responsive ratio
- **Border-radius**: rounded-xl (12px)
- **Box-shadow**: shadow-lg

#### Map Styling
- **Background**: Light gray (during load)
- **Border**: border border-stone-200
- **Overflow**: rounded corners applied
- **Responsive**: Map reflows on resize

#### Map Features
- **Boundary highlight**:
  - Region(s) where ethnic group is primary
  - Color: Match cluster color (from ethnicClusters.ts)
  - Opacity: 0.4-0.6 (semi-transparent)
  - Hover: Opacity increases to 0.8

- **Markers/Icons**:
  - Pin marker at cluster center point
  - Label: Ethnic group name
  - Color: Cluster color
  - Clickable: Shows ethnic group info

- **Legend**:
  - Small legend showing region color
  - Position: Bottom-right of map
  - Background: white/90 + backdrop-blur
  - Border: subtle

#### Animation for Map Section
- **Entrance**: Fade-in + scale
  - Initial: opacity 0, scale(0.95)
  - Final: opacity 1, scale(1)
  - Duration: 0.6s
  - Trigger: When enters viewport

#### Key Points
✅ Map doesn't break layout (contained)
✅ Responsive height (adapts to viewport)
✅ Clear visual distinction (highlight ≠ background)
✅ Interactive (hover/click feedback)
✅ Mobile-friendly (accessible zoom level)

---

### **SECTION 6: GALLERY (Image Grid)**

#### Visual Design
```
[SPACING: py-20]

┌─────────────────────────────────────────────────┐
│  [SECTION TITLE]                                │
│  "Hình ảnh minh họa"                            │
│  [Centered, small caps, stone-400]              │
│                                                 │
│  [GALLERY GRID]                                 │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │              │  │              │             │
│  │   Image 1    │  │   Image 2    │             │
│  │              │  │              │             │
│  └──────────────┘  └──────────────┘             │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │              │  │              │             │
│  │   Image 3    │  │   Image 4    │             │
│  │              │  │              │             │
│  └──────────────┘  └──────────────┘             │
│                                                 │
│  [More images...]                               │
│                                                 │
└─────────────────────────────────────────────────┘

Background: stone-100 (light gray section)
Margin: full width -m-8
Padding: py-20
```

#### Gallery Container
- **Max-width**: max-w-6xl
- **Margin**: mx-auto
- **Padding**: px-4 → md:px-8
- **Background**: stone-100 (distinct section)
- **Full-bleed**: Gallery section spans full width

#### Section Header
```
Title: "Hình ảnh minh họa"

Font-size: text-sm (14px)
Font-weight: bold
Text-align: center
Color: stone-400
Text-transform: uppercase
Letter-spacing: tracking-[0.3em]
Margin-bottom: mb-12

Animation: fadeInUp
```

#### Grid Layout
```
Mobile (< 640px):
├─ grid-cols-2 (2 columns)
├─ Gap: gap-4 (spacing)
└─ Aspect: aspect-[4/3]

Tablet (640px - 1024px):
├─ md:grid-cols-3 (3 columns)
├─ Gap: gap-4
└─ Aspect: aspect-[4/3]

Desktop (> 1024px):
├─ lg:grid-cols-4 (4 columns)
├─ Gap: gap-4
└─ Aspect: aspect-[4/3]
```

#### Individual Image Card
```
┌────────────────────────┐
│                        │
│  [IMAGE - 4:3 ratio]   │
│                        │
│  Object-fit: cover     │
│  Cursor: pointer       │
│  Group-hover:          │
│  └─ scale(1.1)         │
│     (zoom on hover)    │
│                        │
└────────────────────────┘

Border-radius: rounded-xl
Box-shadow: shadow-lg (subtle)
Overflow: hidden (clips to radius)

Hover state:
├─ Image: scale(1.1) [zoom effect]
├─ Container: scale(1.03) [lift]
├─ Transition: duration-500 (smooth)
└─ Cursor: pointer (clickable indicator)

Aspect-ratio: 4/3 (standard photo ratio)
Height: auto (maintains ratio)
```

#### Animation for Gallery
- **Container entrance**: Stagger children
  - Initial: visible (opacity 1)
  - Transition: staggerChildren 0.1s

- **Each image**: fadeInUp + whileHover
  - Entrance: opacity 0 → 1, y: 30 → 0
  - Hover: scale(1.03)
  - Transition: type: spring, damping: 20

- **On click**: Open lightbox
  - Image animates to lightbox
  - Scale: 0.8 → 1
  - Opacity: 0 → 1
  - Duration: spring animation

#### Placeholder State (When No Images)
```
If group.images.length === 0 or array is empty:

┌────────────────────────────────────────────┐
│                                            │
│  [EMPTY STATE]                             │
│                                            │
│  Icon: 📷 (image icon)                     │
│                                            │
│  Heading: "Hình ảnh sẽ được bổ sung"      │
│  Font: serif, lg, stone-600               │
│                                            │
│  Description:                              │
│  "Dân tộc này sẽ có thêm hình ảnh minh    │
│   họa trong phiên bản tiếp theo."         │
│                                            │
│  Background: stone-100                    │
│  Padding: py-12                           │
│                                            │
└────────────────────────────────────────────┘
```

#### Lightbox Design
```
Overlay:
├─ Position: fixed, inset-0, z-[2020]
├─ Background: stone-950/95 (95% opaque)
├─ Backdrop: blur-xl (heavy blur)
└─ Click-to-close: anywhere outside image

Image display:
├─ Size: max-w-full, max-h-full
├─ Aspect: object-contain (full image visible)
├─ Border-radius: rounded-lg
├─ Box-shadow: shadow-2xl
└─ Animation: scale(0.8→1), opacity(0→1)

Close button:
├─ Position: absolute, top-6 right-6
├─ Background: white/10 (transparent)
├─ Hover: white (solid background)
├─ Text color: white → stone-900
├─ Size: w-12 h-12
├─ Border-radius: rounded-full
├─ Transition: 300ms
└─ Icon: X symbol

Keyboard support:
└─ ESC key closes lightbox
```

#### Key Points
✅ Images don't overflow (responsive columns)
✅ Aspect ratio maintained (no distortion)
✅ Lazy load on scroll (fade-in animation)
✅ Lightbox centered (responsive)
✅ Click anywhere on overlay to close
✅ Placeholder guides users if empty
✅ Mobile-friendly (2 columns minimum)

---

### **SECTION 7: FOOTER**

#### Visual Design
```
[SPACING: py-16]

┌─────────────────────────────────────────────────┐
│                                                 │
│  [EMBLEM ICON]                                  │
│  • Height: h-12 (48px)                          │
│  • Grayscale filter                             │
│  • Opacity: opacity-30 (subtle)                 │
│  • Margin-bottom: mb-4                          │
│                                                 │
│  [SOURCE LABEL]                                 │
│  "Nguồn tham khảo"                              │
│  • Font: xs, uppercase, tracking-wider          │
│  • Color: stone-400 (muted)                     │
│  • Margin-bottom: mb-1                          │
│                                                 │
│  [SOURCE NAME]                                  │
│  "Báo Nhân Dân • Ủy ban Dân tộc"                │
│  • Font: sm, bold (font-medium)                 │
│  • Color: stone-600 (darker than label)         │
│  • Margin-bottom: mb-0                          │
│                                                 │
└─────────────────────────────────────────────────┘

Background: stone-50 (light)
Border-top: border-t border-stone-200
Padding: py-16
Text-align: center
```

#### Footer Structure
- **Background**: stone-50 (lightest gray)
- **Border**: border-t border-stone-200 (subtle divider)
- **Padding**: py-16 (vertical), px-4 (horizontal)
- **Text alignment**: text-center
- **Max-width**: No constraint (full-width)

#### Content Alignment
```
Layout: flex, flex-col, items-center, gap-0

1. Emblem image (center)
   └─ w-12 h-12, mx-auto, mb-4
      grayscale, opacity-30

2. Source label
   └─ text-xs, uppercase, tracking-[0.2em]
      color: stone-400, mb-1

3. Source credit
   └─ text-sm, font-medium
      color: stone-600
```

#### Animation for Footer
- **Entrance**: Fade-in (no scroll trigger)
  - Opacity: 0 → 1
  - Duration: 0.6s
  - Delay: After main content

#### Key Points
✅ Emblem subtle (not dominant)
✅ Typography hierarchy clear (label < credit)
✅ Neutral colors (doesn't distract)
✅ Credit properly attributed
✅ Responsive text sizing

---

## 🎬 ANIMATION & INTERACTION STRATEGY

### Animation Philosophy
**Museum Digital Experience** = Elegant + Subtle + Purposeful

Not flashy. Not over-animated. Every animation serves a purpose:
- **Guide attention** (show importance)
- **Provide feedback** (interactive response)
- **Create flow** (user journey clarity)

### Animation Patterns

#### 1. **Entrance Animations** (On Load / On Scroll)
```
Pattern: Fade-in + slide direction

fadeInUp:
├─ Initial: opacity: 0, y: 30px
├─ Animate: opacity: 1, y: 0
├─ Duration: 0.6s
├─ Easing: ease-out (natural deceleration)
└─ Trigger: whileInView (enter viewport)

fadeInLeft:
├─ Initial: opacity: 0, x: -30px
├─ Animate: opacity: 1, x: 0
├─ Duration: 0.5s
├─ Easing: ease-out
└─ Trigger: whileInView

Stagger effect (container children):
├─ staggerChildren: 0.1s (delay between items)
├─ delayChildren: 0.2s (initial delay before first)
└─ Creates cascading effect (elegant sequence)
```

#### 2. **Hover Interactions** (Micro-Animations)
```
Card hover:
├─ translateY: -4px (lift effect)
├─ Box-shadow: shadow-sm → shadow-xl (enhance)
├─ Icon: scale(1) → scale(1.1) (grow)
├─ Duration: 300ms (snappy)
└─ Easing: ease-out

Image hover:
├─ Container: scale(1) → scale(1.03) (subtle zoom)
├─ Image: scale(1) → scale(1.1) (zoom for detail)
├─ Duration: 500ms (slower, smoother)
└─ Opacity: 1 (smooth transition)

Title hover (border):
├─ Border-color: primary/20 → primary
├─ Duration: 300ms
└─ Easing: linear
```

#### 3. **Scroll Parallax** (Hero Section)
```
Parallax effect:
├─ Hero Y: useTransform(scrollYProgress, [0, 1], [0, 150])
│  └─ Image moves slower than scroll (depth effect)
│
├─ Hero Opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.3])
│  └─ Gradually fades as user scrolls past
│
└─ Creates "flying off into distance" feeling

Offset setup:
├─ target: containerRef (tracked element)
├─ offset: ["start start", "end start"]
└─ scrollYProgress: 0 (start) to 1 (end of range)
```

#### 4. **Lightbox Animation** (Image Click)
```
Lightbox entrance:
├─ Backdrop: opacity(0) → opacity(1), duration 300ms
├─ Image: scale(0.8) → scale(1), opacity(0) → opacity(1)
├─ Type: spring, damping: 25 (bouncy but refined)
└─ Duration: animated by spring

Lightbox exit:
├─ Reverse of entrance
├─ Click to close
└─ ESC key to close
```

### Motion Best Practices Applied

✅ **Duration guidelines**:
- Entrance animations: 500-800ms (give time to register)
- Hover/micro: 200-400ms (snappy feedback)
- Parallax: continuous (smooth with scroll)

✅ **Easing curves**:
- Entrance: ease-out (fast start, slow end = natural)
- Hover: ease-out or linear (instant feedback)
- Parallax: linear (matches scroll speed)

✅ **Stagger timing**:
- 0.1s between items (not too slow, visible sequence)
- 0.2-0.3s initial delay (anticipation)
- Max 1s total for stagger (doesn't feel sluggish)

✅ **Prevent animation overload**:
- Only animate what's necessary
- Don't animate every element
- Let negative space breathe
- Remove animation during reduced-motion preference (accessibility)

### Accessibility Considerations

```
@media (prefers-reduced-motion: reduce) {
  /* All animations set to: */
  animation: none;
  transition: none;
  transform: none;
  
  /* OR reduced versions: */
  animation-duration: 0.01ms;
  transition-duration: 0.01ms;
}
```

---

## 🎨 COLOR & TYPOGRAPHY SYSTEM

### Color Palette

#### Background Colors
- **Modal backdrop**: stone-950/95 (95% opaque dark)
- **Blur backdrop**: rgba with backdrop-blur-md
- **Content background**: #faf9f7 (warm light beige)
- **Card background**: white/80 with backdrop-blur
- **Section divider**: stone-100 (light gray)
- **Footer background**: stone-50 (lightest)

#### Text Colors
```
Hierarchy:

Heading (Primary emphasis):
└─ stone-800 (dark brown-gray)

Body text (Standard):
└─ stone-600 (medium brown-gray)

Secondary text (Labels, meta):
└─ stone-400 (light gray)

Accent text (Links, emphasis):
└─ primary color (from Tailwind config)
   Typically: blue, amber, or rose

Background text (Muted):
└─ stone-700 (between heading and body)

Inverse (on dark backgrounds):
└─ white, white/90, white/70, white/50
```

#### Semantic Colors
- **Primary**: Logo color or brand blue
- **Success**: Green (for completed actions)
- **Warning**: Amber (for caution)
- **Error**: Red (for issues)
- **Info**: Blue (for notifications)

### Typography System

#### Font Families
```
Serif fonts (for headings, quotes):
└─ font-serif
   └─ Georgia, "Times New Roman", serif
      (or system serif stack)

Sans-serif fonts (for body, UI):
└─ Default Tailwind font stack
   └─ ui-sans-serif, system-ui, sans-serif

Monospace (for code, data):
└─ font-mono
   └─ Menlo, Monaco, "Courier New", monospace
```

#### Font Sizes (Responsive)

```
H1 (Ethnic name):
├─ Mobile: text-5xl (3rem)
├─ Tablet: text-6xl (3.75rem)
└─ Desktop: text-7xl/8xl (3.5rem - 4rem)

H2 (Section title):
├─ Mobile: text-xl (1.25rem)
├─ Tablet: text-2xl (1.5rem)
└─ Desktop: text-2xl

H3 (Subsection):
├─ Mobile: text-lg (1.125rem)
└─ Desktop: text-xl

Body text:
├─ Mobile: text-base (1rem)
├─ Tablet: text-lg (1.125rem)
└─ Desktop: text-lg

Small text (labels, meta):
└─ text-xs / text-sm

Quote/introduction:
├─ Mobile: text-xl (1.25rem)
├─ Desktop: text-2xl (1.5rem)
└─ Font: serif, italic, light
```

#### Font Weights
```
Headings: bold / black (font-bold, font-black)
Quote text: light (font-light)
Body text: regular (default)
Labels: bold (font-bold)
Card values: bold (font-bold)
```

#### Line Heights
```
Headings: leading-none / leading-tight (no extra space)
Body text: leading-relaxed / leading-8 (1.75 - 2rem)
Quotes: leading-relaxed (comfortable reading)
Labels: leading-snug (compact)
```

### Contrast & Accessibility

```
WCAG AA compliance minimum:
├─ Normal text: 4.5:1 contrast ratio
├─ Large text (18px+): 3:1 contrast ratio
└─ UI components: 3:1 minimum

Applied checks:
├─ white on stone-950: ✓ 21:1 (excellent)
├─ stone-700 on white: ✓ 8.5:1 (excellent)
├─ stone-600 on white: ✓ 7.1:1 (excellent)
├─ stone-400 on white: ✓ 4.6:1 (good)
├─ white/70 on stone-950: ✓ 9.5:1 (excellent)
└─ white on stone-950/95: ✓ 18:1 (excellent)
```

---

## 📐 RESPONSIVE DESIGN

### Breakpoints (Tailwind Standard)

```
Mobile-first approach:

Base (< 640px):
├─ Single column layout
├─ Full-width cards
├─ Stacked sections
├─ Larger touch targets (≥ 44px height)
└─ 4 column gallery (2 cols)

Tablet (640px - 1024px, md):
├─ 2-column info cards
├─ Wider containers (max-w-3xl)
├─ 6 column gallery (3 cols)
└─ Hero height: 80vh

Desktop (1024px+, lg):
├─ 3-column info cards
├─ Max-width: max-w-5xl
├─ 8 column gallery (4 cols)
├─ Hero height: 100vh
└─ Full padding (px-16)
```

### Container Queries
```
Mobile padding: px-4 (16px)
Tablet padding: md:px-8 (32px)
Desktop padding: lg:px-16 (64px)

Max-widths:
├─ Narrow: max-w-3xl (48rem = 768px)
├─ Wide: max-w-4xl (56rem = 896px)
├─ Extra-wide: max-w-5xl (64rem = 1024px)
└─ Full: No constraint
```

### Touch-Friendly Design
```
Minimum touch target: 44x44px
├─ Close button: w-12 h-12 (48x48px) ✓
├─ Info cards: full card clickable ✓
├─ Gallery images: 2-col on mobile ✓
└─ Links: adequate spacing ✓

Spacing on mobile:
├─ Margin-bottom between sections: mb-8 / mb-16
├─ Padding inside cards: p-6 / p-8
├─ Gap between grid items: gap-4
```

---

## 🔧 TECHNICAL SPECIFICATIONS

### Component Structure (No Code, Just Layout)

```
<EthnicDetailModal>
├─ <motion.div> Overlay (fixed, full-screen)
│  ├─ <motion.div> Backdrop (dark blur)
│  ├─ <button> Close button (fixed, top-right)
│  │
│  └─ <motion.div> Main scrollable container
│     │
│     ├─ <motion.section> HERO
│     │  ├─ <img> Hero image (absolute, cover)
│     │  ├─ <div> Gradient overlay
│     │  └─ <motion.div> Title block
│     │     ├─ <span> Badge
│     │     ├─ <h1> Ethnic name
│     │     └─ <p> Other names
│     │
│     ├─ <div> Content background (bg-color)
│     │  │
│     │  ├─ <motion.section> Quote card
│     │  │  └─ <blockquote> Introduction text
│     │  │
│     │  ├─ <motion.section> Info cards grid
│     │  │  └─ <InfoCard> (3 items)
│     │  │
│     │  ├─ <motion.section> Introduction (duplicate?)
│     │  │  └─ <p> Introduction paragraph
│     │  │
│     │  ├─ <section> Detail sections
│     │  │  └─ <ContentSection> (multiple)
│     │  │     ├─ <motion.h4> Section title
│     │  │     └─ <motion.div> Section content
│     │  │
│     │  ├─ <motion.section> Map section (if applicable)
│     │  │  └─ <Leaflet.Map> Interactive map
│     │  │
│     │  ├─ <motion.section> Gallery
│     │  │  ├─ <motion.h3> Gallery title
│     │  │  └─ <div> Grid of images
│     │  │     └─ <motion.div> Image cards (clickable)
│     │  │
│     │  └─ <footer> Footer with credits
│     │
│     └─ <AnimatePresence>
│        └─ <motion.div> Lightbox (conditional)
│           ├─ <div> Backdrop
│           ├─ <motion.img> Enlarged image
│           └─ <button> Close button
│
└─ </motion.div>
```

### Data Flow

```
Props received:
├─ group: EthnicGroup | null
│  └─ Structure:
│     ├─ id, name, vietnameseName, otherNames
│     ├─ region, population, languageGroup
│     ├─ introduction
│     ├─ images[] (array of URLs)
│     ├─ details: {
│     │  ├─ origin, history, distribution
│     │  ├─ characteristics, customs, belief
│     │  ├─ housing, clothing, cuisine
│     │  ├─ production, arts
│     │  └─ (all optional string fields)
│     └─ }
│
└─ onClose: () => void
   └─ Called when user clicks close button or backdrop
```

### State Management (Local)

```
Local state:
├─ lightboxImage: string | null
│  └─ Stores currently displayed lightbox image URL
│  └─ Set by: clicking image in gallery
│  └─ Reset by: clicking close or backdrop
│
└─ containerRef: RefObject<HTMLDivElement>
   └─ References scrollable container
   └─ Used for: parallax effect calculations
```

### Hooks Used

```
Framer Motion hooks:
├─ useScroll() - Track scroll position
├─ useTransform() - Parallax Y and opacity
├─ useMotionValue() - Animated values
├─ AnimatePresence - Handle enter/exit animations
└─ motion.div, motion.section, etc. - Animated components

React hooks:
├─ useState() - Lightbox state
├─ useRef() - Container reference
└─ FC<Props> - Functional component with TypeScript
```

---

## ✨ MICRO-INTERACTIONS MATRIX

| Element | Interaction | Animation | Duration | Easing |
|---------|-------------|-----------|----------|--------|
| Hero title | Load | Slide-up + Fade | 0.8s | ease-out |
| Hero image | Scroll | Parallax + Fade | Continuous | linear |
| Quote card | Scroll into view | Fade-in + Slide-up | 0.6s | ease-out |
| Info cards | Scroll into view | Stagger fade-up | 0.6s each | ease-out |
| Info card | Hover | Lift + Shadow | 0.3s | ease-out |
| Info icon | Hover | Scale | 0.3s | ease-out |
| Section title | Scroll into view | Fade-left | 0.5s | ease-out |
| Section content | Scroll into view | Fade-up (delayed) | 0.5s | ease-out |
| Section title | Hover | Border color | 0.3s | linear |
| Gallery image | Scroll into view | Stagger fade-up | 0.6s | ease-out |
| Gallery image | Hover | Scale + Zoom | 0.5s | ease-out |
| Gallery image | Click | Open lightbox | 0.3s | spring |
| Lightbox image | Load | Scale + Fade | 0.3s | spring |
| Close button | Hover | Scale | 0.3s | ease-out |
| Close button | Click | Close modal | 0.3s | ease-out |

---

## 🚫 ANTI-PATTERNS (What NOT to do)

### ❌ Visual Issues to Avoid

1. **Hero being covered**
   - ❌ Don't: Absolute position content over hero
   - ❌ Don't: z-index content higher than hero
   - ✅ Do: Use negative margin to float content below

2. **Text overflow/crop**
   - ❌ Don't: Fixed height containers without overflow handling
   - ❌ Don't: max-width without proper wrapping
   - ✅ Do: min-w-0, break-words, hyphens-auto

3. **Unclear hierarchy**
   - ❌ Don't: All text same size/weight
   - ❌ Don't: Colors too similar (no contrast)
   - ✅ Do: Clear font size/weight progression, high contrast

4. **Gallery at bottom**
   - ❌ Don't: Force scroll to bottom to see images
   - ✅ Do: Integrate gallery within main content flow

### ❌ Animation Anti-Patterns

1. **Over-animation**
   - ❌ Don't: Animate every element
   - ❌ Don't: Use duration > 1s for micro-interactions
   - ✅ Do: Animate only key elements, keep durations short

2. **Conflicting animations**
   - ❌ Don't: Multiple overlapping animation timings
   - ❌ Don't: Parallax + other transforms on same element
   - ✅ Do: Stagger animations, use one transform per element

3. **Ignoring accessibility**
   - ❌ Don't: Force animation on users with prefers-reduced-motion
   - ✅ Do: Respect @media (prefers-reduced-motion: reduce)

4. **Flashy effects**
   - ❌ Don't: Bounce, wobble, or spin effects
   - ❌ Don't: Bright color flashes
   - ✅ Do: Subtle fade, slide, scale, color transitions

### ❌ Layout Anti-Patterns

1. **Responsive breaks**
   - ❌ Don't: Hard-coded widths/heights
   - ❌ Don't: Grid gap that causes overflow
   - ✅ Do: Use relative units, test on multiple breakpoints

2. **Touch-unfriendly**
   - ❌ Don't: Small buttons (< 44px)
   - ❌ Don't: Cramped spacing on mobile
   - ✅ Do: Adequate padding, large touch targets

3. **Content spillage**
   - ❌ Don't: Long text without wrapping
   - ❌ Don't: Horizontally scrolling sections
   - ✅ Do: Responsive typography, flex wrapping

---

## 🎯 SUCCESS CRITERIA (Design Validation)

### Visual Quality Checklist
- [ ] Hero title visible and not covered by content
- [ ] All text readable (no overlap, no crop)
- [ ] Gallery images don't overflow on any screen size
- [ ] Colors have sufficient contrast (WCAG AA)
- [ ] Typography hierarchy is clear (H1 > H2 > Body)
- [ ] Spacing consistent (margin/padding multiples of 4px/8px)
- [ ] Border radius consistent (rounded-xl everywhere)
- [ ] Shadows subtle and directional (not too strong)

### Animation Quality Checklist
- [ ] Animations smooth (60 fps, no jank)
- [ ] Durations feel natural (not too fast, not sluggish)
- [ ] No animation conflicts (overlapping transforms)
- [ ] Stagger creates nice cascade effect
- [ ] Hover feedback instant (< 300ms)
- [ ] Parallax smooth on scroll (no stuttering)
- [ ] Lightbox animation spring and satisfying
- [ ] Respects prefers-reduced-motion setting

### User Experience Checklist
- [ ] Close button easy to find (top-right)
- [ ] Gallery easy to navigate (click image to enlarge)
- [ ] Content scrolls smoothly (no layout shifts)
- [ ] Mobile experience equivalent to desktop
- [ ] All sections fully accessible (semantic HTML)
- [ ] No unexpected behavior or bugs
- [ ] Museum-like quality (elegant, not trendy)
- [ ] Performance acceptable (no lag, instant interactions)

### Content Display Checklist
- [ ] All ethnic group data displayed correctly
- [ ] No truncation of text
- [ ] Images show when available, placeholder when empty
- [ ] Map highlights correct region
- [ ] Footer credits visible and readable
- [ ] All 11 detail sections present (origin, history, etc.)
- [ ] Population, region, language shown in info cards

---

## 📱 RESPONSIVE SCENARIOS

### Scenario 1: Mobile Phone (iPhone SE - 375px)
```
Hero:
├─ Height: 70vh (visual priority)
├─ Title size: text-5xl (3rem)
└─ Padding: p-8

Content:
├─ Gallery: 2 columns (not too many)
├─ Info cards: 1 column (vertical stack)
├─ Max-width: full (minus padding)
└─ Padding: px-4

Spacing:
├─ Margin-bottom: mb-8 (not too much)
├─ Section gap: space-y-12
└─ Card padding: p-6
```

### Scenario 2: Tablet (iPad - 768px)
```
Hero:
├─ Height: 80vh
├─ Title size: text-6xl (3.75rem)
└─ Padding: p-12

Content:
├─ Gallery: 3 columns
├─ Info cards: 3 columns (ideal)
├─ Max-width: max-w-4xl
└─ Padding: px-8

Spacing:
├─ Margin-bottom: mb-16
├─ Section gap: space-y-16
└─ Card padding: p-8
```

### Scenario 3: Desktop (27" Monitor - 1440px)
```
Hero:
├─ Height: 100vh (full screen)
├─ Title size: text-8xl (4rem)
└─ Padding: p-16

Content:
├─ Gallery: 4 columns
├─ Info cards: 3 columns
├─ Max-width: max-w-5xl
└─ Padding: px-8

Spacing:
├─ Margin-bottom: mb-20
├─ Section gap: space-y-16
└─ Card padding: p-12
```

### Scenario 4: Landscape Mobile (iPhone 12 landscape - 812x375)
```
Hero:
├─ Height: 60vh (shorter to allow scrolling)
├─ Title size: text-4xl (2.25rem)
└─ Positioned lower to avoid viewport cutoff

Content:
├─ Gallery: 2 columns (landscape-friendly)
├─ Info cards: 2 columns
├─ Max-width: full
└─ Padding: px-4

Special handling:
└─ Close button remains visible (fixed, top-right)
```

---

## 🔍 ATTENTION TO DETAIL

### Spacing Rhythm
```
4-point grid system (Tailwind):
├─ p-4 = 16px (small padding)
├─ p-6 = 24px (medium padding)
├─ p-8 = 32px (large padding)
├─ p-12 = 48px (extra-large padding)
├─ mb-8 = 32px (section gap)
├─ mb-16 = 64px (major section gap)
└─ space-y-16 = 64px (children gap)

Consistency:
├─ All padding multiples of 4px
├─ All margins multiples of 4px
├─ Gap between elements: 4/6/8/12/16
└─ Creates visual harmony
```

### Typography Scales
```
Font sizes follow ratio ~1.25x:
├─ xs: 12px (0.75rem)
├─ sm: 14px (0.875rem)
├─ base: 16px (1rem)
├─ lg: 18px (1.125rem)
├─ xl: 20px (1.25rem)
├─ 2xl: 24px (1.5rem)
├─ 3xl: 30px (1.875rem)
├─ 4xl: 36px (2.25rem)
├─ 5xl: 48px (3rem)
├─ 6xl: 60px (3.75rem)
├─ 7xl: 72px (4.5rem)
└─ 8xl: 96px (6rem)

Mobile first approach:
├─ Default: text-base or text-lg
├─ Tablet: md:text-xl
└─ Desktop: lg:text-2xl
```

### Color Harmony
```
Color progression (warm palette):
├─ Darkest: stone-950 (near black)
├─ Dark: stone-800 / stone-900
├─ Medium: stone-600 / stone-700
├─ Light: stone-400 / stone-500
├─ Lightest: stone-50 / stone-100
└─ Accent: Primary brand color (varies by deployment)

Usage rules:
├─ Headings: stone-800 (darkest text)
├─ Body text: stone-600 (readable)
├─ Labels: stone-400 (secondary)
├─ Backgrounds: stone-50 to stone-100
├─ Accents: primary color
└─ Inverse: white on dark backgrounds
```

---

## 🎓 DESIGN PRINCIPLES APPLIED

### 1. **Hierarchy**
- Large title (hero) → Medium sections → Small details
- Color progression: dark → medium → light
- Font weight: black → bold → regular
- Spacing: large gaps between major sections, small within

### 2. **Contrast**
- High contrast text (white on dark, dark on light)
- Visual weight distribution (not all heavy, not all light)
- Bold headings vs. light subtitles
- Colored accents against neutral backgrounds

### 3. **Consistency**
- Repeating patterns (card style, spacing, fonts)
- Predictable interactions (all hovers behave similarly)
- Unified color palette (warm neutrals + primary accent)
- Systematic responsive behavior (same logic across sizes)

### 4. **Clarity**
- Single visual focus per section
- Clear information hierarchy
- Unambiguous interactive elements
- No hidden content or surprise behaviors

### 5. **Elegance**
- Minimalist approach (only necessary elements)
- Subtle animations (not distracting)
- Quality typography (serif for elegance)
- Generous spacing (breathing room)

### 6. **Usability**
- Large touch targets (mobile-friendly)
- Clear navigation (close button accessible)
- Predictable scrolling (no jumps)
- Responsive design (works everywhere)

---

## 📋 IMPLEMENTATION NOTES FOR DEVELOPERS

### Conversion Guide (Design → Code)

**Design element → CSS class/property**
```
Hero full height → h-[100vh] or min-h-screen
Large title → text-7xl md:text-8xl
Rounded card → rounded-2xl
Soft shadow → shadow-2xl shadow-stone-900/10
Light overlay → bg-white/80 backdrop-blur-xl
Gradient → bg-gradient-to-t from-stone-950
Responsive column → md:grid-cols-3 lg:grid-cols-4
Stagger animation → staggerChildren: 0.1
Parallax effect → useTransform(scrollYProgress, ...)
```

### Component Extraction Suggestions
```
<QuoteCard>
├─ Props: introduction (string)
└─ Returns: Styled blockquote section

<InfoCard>
├─ Props: icon (string), label, value
└─ Returns: Single info card with animation

<ContentSection>
├─ Props: title, content
└─ Returns: Section with title + paragraphs

<GalleryGrid>
├─ Props: images[], onImageClick
└─ Returns: Responsive grid + lightbox

<MapSection>
├─ Props: region, ethnicGroup
└─ Returns: Leaflet map with highlights
```

### Performance Considerations
```
Image optimization:
├─ Hero image: Use srcset for responsive sizes
├─ Gallery images: Lazy load (intersection observer)
├─ Placeholder: Show during loading

Animation optimization:
├─ Use transform/opacity (GPU accelerated)
├─ Avoid layout-triggering properties
├─ Limit number of animated elements
└─ Debounce scroll events

Scroll performance:
├─ Use passive event listeners
├─ Throttle parallax calculations
├─ Avoid re-renders on every scroll event
└─ Consider will-change: transform for hero
```

---

## 🎬 FINAL DESIGN SUMMARY

### Visual Metaphor
**"Digital Museum Experience"** → Elegant, cultural, thoughtful
- Clean aesthetic (white/neutral backgrounds)
- Respectful typography (serif fonts)
- Subtle animations (not entertainment, but guidance)
- Generous spacing (room to breathe, room to think)
- Quality imagery (hero photos of ethnic groups)

### Key Differentiators
1. **Hero isn't covered** → Title always visible
2. **Gallery integrated** → Easy to find images
3. **Smooth scrolling** → Parallax provides depth
4. **Card design** → Modern but museum-like
5. **Responsive** → Same experience on all devices

### Intended User Journey
```
1. See hero image + title (full viewport)
   └─ "Wow, visually engaging"

2. Scroll down, content floats into view
   └─ "Elegant entrance, not jarring"

3. Read introduction in beautiful quote card
   └─ "Respectful presentation"

4. Scan key facts (population, region, language)
   └─ "Quick reference information"

5. Deep dive into detailed sections
   └─ "Comprehensive but not overwhelming"

6. View distribution map
   └─ "See where this group lives"

7. Browse gallery of images
   └─ "See the culture visually"

8. Footer credits
   └─ "Trust and attribution"
```

### Accessibility Assurance
```
✓ WCAG AA compliant (color contrast)
✓ Semantic HTML structure
✓ Keyboard navigation support
✓ Screen reader friendly
✓ Reduced motion respected
✓ Large touch targets
✓ Text alternatives for images
✓ Form labels present
```

---

**End of Design Specifications Document**

Status: Ready for Development
Date: January 28, 2026
Version: 1.0 - Final Design Spec
Audience: UI/UX, Frontend Developers, QA Testers
