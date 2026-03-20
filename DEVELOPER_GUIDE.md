# Developer Guide — Periodic Table Flashcards

This document explains the structure of the program and provides step-by-step instructions for adding new features, modes, and content.

---

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | Page structure and DOM skeleton |
| `styles.css`  | All visual styling (design tokens, layout, components) |
| `elements.js` | Element data, quiz mode definitions, filter utilities |
| `app.js`      | Application controller — state, rendering, events |
| `DEVELOPER_GUIDE.md` | This file |

The project uses **ES Modules** (`type="module"` on the script tag), so all `import`/`export` statements work natively in modern browsers. No build tools are needed.

---

## How to Add a New Quiz Mode

A quiz mode defines *what* is shown on the front of a card and *what* the correct answer is.

**Open `elements.js` and find the `QUIZ_MODES` object.**

Each entry looks like this:

```js
"your-mode-key": {
  label:  "Display Name in Dropdown",  // shown in the UI
  prompt: el => el.symbol,             // what appears on the card front
  answer: el => el.name,               // the correct answer string
  hint:   el => `Atomic #${el.number}`,// hint shown after reveal (optional)
  check:  (input, el) => normalizeStr(input) === normalizeStr(el.name),
},
```

**Steps:**

1. Add a new entry to `QUIZ_MODES` with a unique string key.
2. Write `prompt(el)` — this returns the text displayed on the card. It can be any element property or computed value.
3. Write `answer(el)` — this returns the canonical correct answer string.
4. Write `hint(el)` — optional extra info shown after the card is flipped (return `""` if not needed).
5. Write `check(input, el)` — returns `true` if the user's answer is acceptable. Use `normalizeStr()` to do case-insensitive, trimmed comparison. For numeric answers you can use `Math.abs(parsed - el.mass) < tolerance`.

**That's it.** `app.js` auto-discovers all modes from `QUIZ_MODES` and adds them to the dropdown. No changes to `app.js` or `index.html` are required.

**Example — Symbol to Atomic Number:**

```js
"symbol-to-number": {
  label:  "Symbol → Atomic #",
  prompt: el => el.symbol,
  answer: el => String(el.number),
  hint:   el => el.name,
  check:  (input, el) => normalizeStr(input) === normalizeStr(String(el.number)),
},
```

---

## How to Add a New Element Property

If you want to quiz on a property not currently in the data (e.g., electron configuration, discovery year, state at room temperature):

1. **Add the property to each element object in `elements.js`:**

```js
{ number: 1, symbol: "H", name: "Hydrogen", ..., state: "gas" },
```

2. **Create a quiz mode that uses it** (see section above):

```js
"name-to-state": {
  label:  "Name → State at Room Temp",
  prompt: el => el.name,
  answer: el => el.state,
  hint:   el => el.symbol,
  check:  (input, el) => normalizeStr(input) === normalizeStr(el.state),
},
```

---

## How to Add a New Filter Mode

A filter mode controls *which* elements are included in the current study deck.

**Open `app.js` and find the `getFilteredElements()` function.**

1. **Add your filter mode to the `filterModes` array** inside `buildFilterModeSelector()`:

```js
{ value: "block", label: "By Electron Block" },
```

2. **Add a filter panel builder** (call it in `buildFilterPanels()`):

```js
function buildBlockPanel() {
  const container = document.getElementById("block-panel");
  container.innerHTML = "<p class='panel-label'>Select electron blocks:</p>";
  const blocks = ["s", "p", "d", "f"];
  container.appendChild(buildCheckboxGroup("block-cb", blocks, b => `${b}-block`, true));
}
```

3. **Add the panel `<div>` to `index.html`** inside `<section class="sidebar-section filter-panels">`:

```html
<div id="block-panel" class="filter-panel" hidden></div>
```

4. **Show/hide the panel** in `updateFilterPanelVisibility()`:

```js
document.getElementById("block-panel").hidden = mode !== "block";
```

5. **Add a `case` in `getFilteredElements()`:**

```js
case "block": {
  const checked = [...document.querySelectorAll('input[name="block-cb"]:checked')]
    .map(cb => cb.value);
  return ELEMENTS.filter(el => checked.includes(el.block));
}
```

---

## How to Add a New Element Type

1. Add the type key and label to `ELEMENT_TYPES` in `elements.js`:

```js
"superheavy": "Superheavy Element",
```

2. Assign the type to elements in `ELEMENTS`:

```js
{ number: 118, symbol: "Og", ..., type: "superheavy" },
```

3. Add a color variable in `styles.css` under `/* Element type colors */`:

```css
--c-superheavy: #e879f9;
```

4. Apply it to the card stripe and the chip/swatch elements by adding selectors following the existing pattern:

```css
.flashcard[data-type="superheavy"] { --type-color: var(--c-superheavy); }
.custom-chip[data-type="superheavy"]:has(input:checked) { border-color: var(--c-superheavy); color: var(--c-superheavy); }
.swatch[data-type="superheavy"] { background: var(--c-superheavy); }
```

5. Add a legend entry in `index.html`:

```html
<li><span class="swatch" data-type="superheavy"></span>Superheavy Element</li>
```

---

## How to Add a New Element

Elements are objects in the `ELEMENTS` array in `elements.js`. Each must have:

| Field    | Type          | Description |
|----------|---------------|-------------|
| `number` | number        | Atomic number (unique, 1–118+) |
| `symbol` | string        | Chemical symbol |
| `name`   | string        | Full IUPAC name |
| `mass`   | number        | Standard atomic weight |
| `group`  | number\|null  | Group 1–18, or `null` for lanthanides/actinides |
| `period` | number        | Period 1–7 |
| `type`   | string        | Key from `ELEMENT_TYPES` |
| `block`  | string        | `"s"`, `"p"`, `"d"`, or `"f"` |

Groups and periods are derived automatically from the data — no other changes are needed.

---

## How to Change the Visual Style

All design tokens are CSS custom properties in `:root {}` at the top of `styles.css`. To change the look:

- **Colors:** Edit `--bg`, `--accent`, `--text-primary`, etc.
- **Element type colors:** Edit `--c-alkali`, `--c-transition`, etc.
- **Fonts:** Change `--font-display` and `--font-mono`, and update the Google Fonts import in `index.html`.
- **Border radius:** Change `--radius` and `--radius-lg`.
- **Sidebar width:** Change `--sidebar-w`.

---

## Architecture Notes

- **State lives entirely in `app.js`** in the `state` object. Add new state fields there.
- **Data is read-only** in `elements.js`. Never mutate `ELEMENTS` at runtime.
- **The deck is a shuffled copy** of the filtered elements. The original `ELEMENTS` array is never modified.
- **Correct answers are removed** from `state.deck` and moved to `state.answered`. Incorrect answers are rotated to the end of the deck.
- **Filter changes** call `startRound()`, which rebuilds the deck from scratch.
- **Quiz mode changes** also call `startRound()`, resetting the round with the same filter.

---

## Adding a Persistent Score / Statistics Panel

To track scores across sessions (e.g., with `localStorage`):

1. In `app.js`, after `state.score.correct++`, call a `saveStats(el, quizMode)` function.
2. In `saveStats`, read the existing stats from `localStorage`, update them, and write back.
3. Add a stats panel to `index.html` and a render function in `app.js`.
4. Call the render function after each card is answered.

---

## Running the Program

Because this project uses ES Modules, you must serve it from a local web server (browsers block `import` on `file://` URLs).

**Quick options:**

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code: use the Live Server extension
```

Then open `http://localhost:8080` in your browser.
