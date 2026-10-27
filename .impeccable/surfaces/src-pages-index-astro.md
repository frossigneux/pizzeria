---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Order page (index)

Scope: the single public page: menu → cart → send the order on WhatsApp. Mode: Operate (the visitor's success is a sent order). Phone-first, trilingual (ქა / EN / RU), pickup only, payment by BOG/TBC transfer or at pickup.

Constraints: no backend; every name, dish, price is a marked placeholder until the owner supplies real ones (see the placeholder list in src/data/config.ts).

Unresolved: real name and logo, menu and prices, WhatsApp number, IBANs, opening hours, pickup address.

## Direction contract

THESIS: The order is a metro journey. Each pizza you add becomes a station on a red line, and the total sits at the green terminus beside the WhatsApp button. Refuses the category default of photo cards and a floating orange "View cart" pill.

OWN-WORLD: Tbilisi metro wayfinding. Night-navy enamel sign panels with white type, a red line, a green line/terminus, station-tile off-white ground. Round line dots, pill controls with 2px navy borders. Two text sizes plus one display size; rank comes from weight, capitals and reversal (white on navy). Integer step scale. Onest for Latin/Cyrillic, Noto Sans Georgian for Mkhedruli.

STORY: The visitor sees immediately that it is open, the wait time, and how to pay, then picks pizzas with +/−. The line and the total update live, and one tap on the green bar opens WhatsApp with the order already written. After sending, BOG/TBC details stay one tap away to copy.

FIRST VIEWPORT: Navy sign header (M-dot + name, ქა/EN/RU switch, open status + ready time + payment line). Sticky category pills showing their counts. The menu as a vertical red line, each pizza a station row with fixed furniture: name, ingredients, Georgian name, ₾ price, Add / −n+ control. A navy dock pinned to the bottom: the cart line (one dot per pizza, green terminus), item count, pickup time, payment choice, and the green "Send on WhatsApp · ₾ total" button within thumb reach.

FORM: Tbilisi metro line signage, candidate 6 of 7 on the grounded list; seed:d6dff343574a88f3. Signature move: the live cart line in the dock; a single +/− control updates the line, the total and the WhatsApp message.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
