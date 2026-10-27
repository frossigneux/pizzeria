---
name: Pizzeria (placeholder name)
description: Phone-first pickup ordering page, drawn as a Tbilisi metro line where every pizza is a station and the total waits at the green terminus.
colors:
  navy: "#14213d"
  navy-2: "#1e2d52"
  navy-3: "#2c3d66"
  red: "#d62828"
  green: "#1f7a47"
  green-lit: "#3fbf7a"
  tile: "#eceff3"
  tile-2: "#dde2e9"
  rule: "#cbd2dc"
  ink: "#14213d"
  ink-2: "#4a5470"
  on-navy: "#ffffff"
  on-navy-2: "#c3cae0"
  note-bg: "#fff1bf"
  note-ink: "#5a4500"
  error: "#b3261e"
  error-on-navy: "#ffb4ab"
typography:
  display:
    fontFamily: "Onest, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: "Onest, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: "Onest, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "\"tnum\" 1"
  body-small:
    fontFamily: "Onest, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Onest, Noto Sans Georgian, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
    lineHeight: 1.45
    letterSpacing: "0.06em"
rounded:
  plate: "4px"
  terminus: "6px"
  field: "8px"
  action: "10px"
  dock: "16px"
  pill: "999px"
  dot: "50%"
spacing:
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-5: "24px"
  sp-6: "32px"
  sp-7: "48px"
components:
  category-pill:
    backgroundColor: "{colors.on-navy}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 12px 0 16px"
    height: "40px"
  category-pill-active:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
  interchange-plate:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "8px 12px"
  qty-add:
    backgroundColor: "{colors.on-navy}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 12px"
    height: "48px"
  qty-add-hover:
    backgroundColor: "{colors.tile-2}"
  qty-stepper:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    rounded: "{rounded.pill}"
    height: "48px"
  qty-stepper-hover:
    backgroundColor: "{colors.navy-3}"
  field-input:
    backgroundColor: "{colors.on-navy}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "12px"
    height: "48px"
  pay-option:
    textColor: "{colors.on-navy}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "48px"
  pay-option-checked:
    backgroundColor: "{colors.navy-2}"
  button-send:
    backgroundColor: "{colors.green}"
    textColor: "{colors.on-navy}"
    typography: "{typography.title}"
    rounded: "{rounded.action}"
    padding: "0 16px"
    height: "56px"
  button-send-hover:
    backgroundColor: "#1a6a3d"
  button-ghost:
    textColor: "{colors.on-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.navy-3}"
  order-dock:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.on-navy}"
    rounded: "{rounded.dock}"
    width: "380px"
  sample-tag:
    backgroundColor: "{colors.note-bg}"
    textColor: "{colors.note-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.plate}"
    padding: "2px 8px"
---

# Design System: Pizzeria

## Overview

**Creative North Star: "The Red Line to Pickup"**

The page is Tbilisi metro wayfinding applied to an order. Night-navy enamel sign panels carry white type; a red line runs down the menu with each pizza as a station on it; the order dock repeats that line in miniature, one dot per pizza, ending at a green square terminus beside the send button. The ground is the pale station tile. Nothing is photographic; the line, the dots and the reversed plates carry the whole identity.

Density is that of a transit sign: tight, fixed furniture per row (name, price, ingredients, second-language name, quantity control), a single column of content on phones, the order panel standing beside the line on desktop. Rank never comes from size. There are two text sizes and one display size; hierarchy is made with weight (400 / 600 / 800), capitals (Latin and Cyrillic only) and reversal (white on navy).

The system is trilingual (Georgian, English, Russian) and must read the same in all three. Georgian Mkhedruli has no case, so the system never asks it to shout. Every name, dish, price, hour, IBAN and phone number is currently a placeholder and is marked as such with the yellow sample tag.

**Key Characteristics:**
- Navy sign header, tile ground, one red line, one green terminus.
- Round dots are stations; rounded squares are termini; pills are controls; 4px plates are sign labels.
- Two text sizes plus one display size; rank by weight, case and reversal.
- Flat, in-flow content; only the order dock floats.
- Tabular numerals everywhere so prices and counts do not jitter.

## Colors

A transit palette: one deep navy family for signs and the dock, one red for the line, one green for the destination, on cool off-white tile.

### Primary
- **Night Enamel Navy** (navy): the sign header, the interchange plates, the order dock, the active category pill, the filled quantity stepper, text selection. Also the body ink (ink carries the same value as a separate token for text).
- **Enamel Navy, raised** (navy-2): surfaces inside navy, such as the language switch track, the checked payment option, the bank details box, the stepper inside the dock.
- **Enamel Navy, edge** (navy-3): rules and borders inside the dock, unchecked payment option borders, hover fill for controls on navy, the dashed empty track.

### Secondary
- **Line Red** (red): the metro line (6px vertical rule, 4px rule under the category bar, 5px dock track), station dot rings and filled stations, the brand dot, the active count badge, and the global focus ring (3px outline).

### Tertiary
- **Terminus Green** (green): the send button only; the end of the journey.
- **Signal Green** (green-lit): small lit signals on navy: the open status dot, the terminus square, the checked radio, the copied state.

### Neutral
- **Station Tile** (tile): page ground and the sticky category bar.
- **Tile Shadow** (tile-2): count badges, hover fill on light controls.
- **Grout Line** (rule): 1px dividers between stations.
- **Ink** (ink) and **Muted Ink** (ink-2): primary text and secondary text (ingredients, second-language names, info labels) on tile.
- **Sign White** (on-navy) and **Sign White, dimmed** (on-navy-2): text on navy, and the white fill of pills, station dots and fields.
- **Placeholder Yellow** (note-bg, with note-ink text): placeholder marks only.
- **Error Red** (error) and **Error on Navy** (error-on-navy): the invalid-field ring, and error text inside the dock.

### Named Rules
**The Line Rule.** Red belongs to the line and to what sits on it: the line itself, station dots, the cart track, the active count, the focus ring. It is never the fill of a button, panel or text block.

**The Terminus Rule.** Green means arrival: open, chosen, copied, send. The send button is the only large green surface on the page.

**The Placeholder Yellow Rule.** Yellow (note-bg) marks invented content and nothing else. When config.placeholder turns off, yellow disappears from the page.

## Typography

**Display Font:** Onest (with Noto Sans Georgian, system-ui)
**Body Font:** Onest for Latin and Cyrillic; Noto Sans Georgian for Mkhedruli (under :lang(ka) the stack flips to Noto Sans Georgian first)

**Character:** A plain, sturdy grotesque that reads like station signage in both scripts. Onest ships at 400 / 600 / 800; Noto Sans Georgian at 400 / 700 / 800.

### Hierarchy
- **Display** (800, 1.5rem, 1 to 1.2): the brand name, the send total, the sent confirmation heading. Nothing else.
- **Title** (800, 1.0625rem, 1.3): dish names, prices, the dock title, section names on the interchange plate in Georgian.
- **Body** (400 / 600, 1.0625rem, 1.45): base text, info values, order lines. Tabular numerals globally.
- **Body small** (400 / 600, 0.875rem): ingredients, second-language names, hints, meta lines, language switch.
- **Label** (800, 0.875rem, 0.06em tracking, uppercase in en/ru only): interchange plates, field labels, pill and button text.

### Named Rules
**The Two Sizes Rule.** Text is 0.875rem or 1.0625rem; 1.5rem is reserved for the brand, the total and the confirmation. Rank comes from weight, capitals and reversal, never from a new size.

**The Mkhedruli Never Shouts Rule.** Uppercase and letter-spacing apply only under :lang(en) and :lang(ru). Georgian labels keep their case and spacing and rely on weight and reversal.

## Layout

Phone first. A single column: sign header, sticky category bar (scrolls horizontally, red 4px rule underneath), then the menu line with 16px side padding. The line sits on a fixed axis (line-x, 26px) and content is indented from it by line-x plus 16px. The order dock is pinned to the bottom of the viewport, collapsed to its track, title, meta line and send button, and the body reserves 220px at the bottom so nothing hides under it. Safe-area insets are honoured on header and dock.

At 960px and above, the content is centred at 1120px max; the menu line and the dock sit side by side in a grid (fluid column plus a 380px dock, 32px gap). The dock becomes a sticky panel (top 84px) that is always open. Header and category bar paddings align to the same 1120px column.

Spacing is an integer step scale (4, 8, 12, 16, 24, 32, 48). Station rows use 16px vertical padding; section interchanges get 32px above. Touch targets are at least 44px (language links 44 by 36).

## Elevation & Depth

Flat by default. Depth is carried by reversal (navy panels on tile) and by tonal steps within navy (navy, navy-2, navy-3), not by shadow. The single exception is the order dock, which floats over or beside the line and carries a soft ambient shadow; on mobile, an open dock dims the page with a 40% black scrim.

### Shadow Vocabulary
- **Dock lift, mobile** (`box-shadow: 0 -6px 24px rgb(0 0 0 / 0.22)`): the bottom-pinned dock.
- **Dock lift, desktop** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.18)`): the sticky side dock.

### Named Rules
**The Only One Floats Rule.** The dock is the only element with a shadow. Stations, plates, pills and fields stay flat.

## Shapes

Shape carries meaning, as on a metro map. Circles are stations: station dots (18px, 4px red ring, filled red when in the order), interchange dots (26px, 5px navy ring), track dots in the dock, status and brand dots. Rounded squares are termini: the end-of-line marker on the info section (green ring, 6px radius), the track end (22px, 6px radius) and the sent terminus (34px, 8px radius). Pills (999px) are controls: category pills, the quantity control, copy and ghost buttons. Small 4px plates are sign labels: interchange names, sample tags, the "name to come" tag. Fields and the payment options use 8px; the send button 10px; the dock 16px (top corners only on mobile).

Borders are 2px solid for controls (navy on tile, navy-3 or dimmed white on navy) and 1px for dividers.

## Components

### Buttons
- **Send (primary):** full-width terminus-green bar, 56px tall, 10px radius, white 800 text, chat icon at left, display-size total at right. Hover darkens to a deeper green. Lives in the dock foot so it never scrolls away.
- **Ghost:** pill, 44px, 2px dimmed-white border on navy, 800 small text; hover fills navy-3. Used for the after-send actions.
- **Copy:** ghost pill with an icon; on success the border and text turn signal green.
- **Focus:** every focusable element gets the global 3px red outline, 2px offset.

### Chips
- **Category pill:** white pill with a 2px navy border, 40px tall, 600 small text and a round count badge (tile-2). Active (the section in view) reverses to navy with a red count badge.
- **Language switch:** a navy-2 track with three 44 by 36 segments; the current language is a white segment with navy text.

### Cards / Containers
There are no cards. Dishes are station rows on the line, divided by 1px grout rules. The containers that exist are the navy dock and, inside it, the navy-2 bank box (8px radius, 12px padding).

### Inputs / Fields
- **Style:** white field on navy, 2px white border, 8px radius, 48px minimum height, text at least 16px to stop iOS zoom, red caret. Select uses a custom navy chevron.
- **Labels:** label style (800, small, caps in en/ru), with optional markers back to 400 and dimmed.
- **Error:** the invalid field gets a 2px error-red ring; the hint below turns to error-on-navy at 600.
- **Payment options:** 48px rows with a 2px navy-3 border; checked rows get a white border and navy-2 fill, and the radio becomes a white dot in a thick signal-green ring.

### Navigation
The sign header (brand dot, name, language switch, open status with a lit dot, ready time, pickup and payment line) and the sticky category bar. Anchors scroll smoothly only when reduced motion is not requested.

### Quantity Control (signature)
One control per dish, a 48px pill with a 2px navy border. At zero it is a white "+ Add" pill. Once a pizza is in the order it reverses to navy and splits into minus, count and plus (44px buttons, navy-3 hover); the station dot fills red and bumps (scale 1.35, 0.4s). In the dock the same control sits on navy-2 at 44px.

### Order Dock and Cart Track (signature)
The dock opens with the cart track: a 5px red line with one white-and-red dot per pizza (overflow collapses to a count), ending at a green rounded-square terminus. Empty, the line turns to a dashed navy-3 track and the terminus goes navy-3. New dots slide in (0.45s, ease-out). Below: title and item count, order lines, the form, then the fixed foot with the meta line (pickup time and payment, with an underlined "change") and the send bar. The chevron rotates 180 degrees when opened.

### Sample Tag
A yellow 4px plate with dark brown text, placed next to anything invented (menu, hours, IBAN, status). Gated by config.placeholder.

## Do's and Don'ts

### Do:
- **Do** put every orderable item on the red line as a station with the fixed furniture: name, price, ingredients, second-language name, quantity control.
- **Do** make rank with weight, capitals (en/ru only) and navy reversal, inside the two text sizes (0.875rem, 1.0625rem) and the one display size (1.5rem).
- **Do** keep circles for stations, rounded squares for termini, pills for controls, 4px plates for sign labels.
- **Do** keep touch targets at 44px or more and keep the send button in the dock foot within thumb reach.
- **Do** honour prefers-reduced-motion: smooth scroll, the dot bump and the track animation only run when motion is allowed.
- **Do** mark every invented value with the yellow sample tag while config.placeholder is true.

### Don't:
- **Don't** uppercase or letter-space Georgian text.
- **Don't** introduce photo cards or a floating "View cart" pill; the dock and its line are the cart.
- **Don't** add shadows to in-flow content; only the dock floats.
- **Don't** use red as a fill for buttons or panels, or green for anything other than open, chosen, copied and send.
- **Don't** use placeholder yellow for emphasis or decoration.
- **Don't** add a fourth text size.
