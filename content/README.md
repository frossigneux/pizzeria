# Editing the menu and settings

Two files in this folder control what the website shows:

| File | What it holds |
|---|---|
| [`menu.json`](menu.json) | Categories, pizzas, drinks, descriptions and prices |
| [`settings.json`](settings.json) | Name, WhatsApp number, opening hours, preparation time, address, bank accounts |

## How to edit on GitHub

1. Open the file above and click the pencil icon (**Edit this file**).
2. Make your change.
3. Click **Commit changes…**, then **Commit changes** again.
4. The site updates by itself within about 2 minutes. On the file's page, a mark appears next to your change: a yellow dot while it builds, then a green check when it is live (details in the **Actions** tab).

If you made a mistake, a red cross appears instead. Click it, then **Details**: the build log ends with a message saying what to fix and where. **The live site keeps the previous version until the mistake is fixed**, so customers never see a broken menu.

## Common changes

**Change a price.** Write a plain number, without quotes or `₾`:

```json
"price": 17
```

**Hide a pizza for now** (sold out, seasonal). Add `"available": false` to it, and remove the line (or set it to `true`) to show it again:

```json
{
  "name": { "ka": "იმერული", "en": "Imeruli", "ru": "Имерули" },
  "description": { "ka": "…", "en": "…", "ru": "…" },
  "price": 20,
  "available": false
},
```

**Add a pizza.** Copy an existing block from `{` to `},` and paste it below, then change the text and the price. Every block except the last one in a list ends with a comma.

**Reorder.** Items and categories appear on the site in the same order as in the file.

**Texts in three languages.** `ka` is Georgian, `en` English, `ru` Russian. If one is missing, the site uses the English text, or the Georgian one if there is no English.

## Settings

- `"whatsapp"`: the number that receives orders, with country code, e.g. `"+995 555 12 34 56"`.
- `"openingHours"`: 24-hour clock, Tbilisi time, e.g. `"open": "11:00"`, `"close": "23:00"`.
- `"prepMinutes"`: the usual wait shown to customers ("ready in ~20 min").
- `"bankAccounts"`: IBAN and account holder for Bank of Georgia (`bog`) and TBC (`tbc`). Spaces in the IBAN are fine.
- `"showSampleLabels"`: set it to `false` once the real menu, hours and accounts are filled in. This removes the yellow "sample" labels.

## Rules of JSON, in short

- Text goes in straight double quotes: `"Margherita"`.
- Numbers have no quotes: `15`.
- Items in a list are separated by commas, with **no comma after the last one**.
- Each `{` needs its `}` and each `[` needs its `]`.

Optional: give an item an `"id"` (e.g. `"id": "margherita"`) if you want to rename it in English without emptying carts that customers already have open. Without an id, the English name is used.
