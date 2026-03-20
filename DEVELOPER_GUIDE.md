# Developer Guide — Flashcard Studio

This document explains the structure of the full project and provides step-by-step instructions for adding new programs, quiz modes, filters, content, and visual styles.

---

## Project Structure

```
your-project/
├── index.html                        ← Landing page (hub for all programs)
├── DEVELOPER_GUIDE.md                ← This file
│
└── periodic-table/                   ← Periodic Table program
    ├── index.html                    ← Program page structure and DOM skeleton
    ├── styles.css                    ← All visual styling for this program
    ├── elements.js                   ← Element data, quiz modes, filter utilities
    └── app.js                        ← Application controller — state, rendering, events
```

When you add more programs, each lives in its own folder at the same level as `periodic-table/`:

```
your-project/
├── index.html
├── DEVELOPER_GUIDE.md
├── periodic-table/
├── world-capitals/
├── human-anatomy/
└── math-formulas/
```

The root `index.html` links to each program. Every program is fully self-contained — its HTML, CSS, and JS files only reference each other using relative paths within the same folder.

---

## How to Add a New Program to the Landing Page

1. **Create a folder** for the new program at the project root (e.g. `world-capitals/`).

2. **Build the program** inside that folder. At minimum it needs an `index.html`. See the Periodic Table program as a reference for structure.

3. **Open the root `index.html`** and find the `.card-grid` div. Add a new `<a>` card:

```html
<a class="program-card program-card--future1" href="world-capitals/index.html">
  <span class="card-icon">🌍</span>
  <p class="card-subject">Geography</p>
  <h2 class="card-title">World Capitals</h2>
  <p class="card-desc">
    Every country and its capital city. Filter by continent or region.
  </p>
  <div class="card-footer">
    <span class="card-count">195 countries · 2 quiz modes</span>
    <span class="card-arrow">→</span>
  </div>
</a>
```

4. **Choose a card color class.** The landing page defines `program-card--periodic`, `program-card--future1`, `program-card--future2`, and `program-card--future3`. To add a new color scheme, open the root `index.html`'s `<style>` block and add:

```css
.program-card--mysubject {
  --card-accent: #2a1a3a;
  --card-glow:   rgba(42,26,58,0.08);
}
.program-card--mysubject:hover { border-color: #c0b0d0; }
```

5. **Remove placeholder cards** — the "Coming Soon" placeholders in the landing page are `<div>` elements with the `program-card--soon` class. Once a program is ready, replace the `<div>` with an `<a href="...">` and remove `program-card--soon`.

---

## Periodic Table Program — File Roles

| File | Purpose |
|------|---------|
| `periodic-table/index.html` | Page structure and DOM skeleton |
| `periodic-table/styles.css` | All visual styling (design tokens, layout, components) |
| `periodic-table/elements.js` | Element data, quiz mode definitions, filter utilities |
| `periodic-table/app.js` | Application controller — state, rendering, events |

The program uses **ES Modules** (`type="module"` on the script tag in `index.html`), so all `import`/`export` statements work natively in modern browsers. No build tools are needed. All paths between these files are relative, so the folder can be renamed without breaking anything as long as the landing page `href` is updated to match.

---

## How to Add a New Quiz Mode

A quiz mode defines *what* is shown on the front of a card and *what* the correct answer is.

**Open `periodic-table/elements.js` and find the `QUIZ_MODES` object.**

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
2. Write `prompt(el)` — returns the text displayed on the card. It can be any element property or computed value.
3. Write `answer(el)` — returns the canonical correct answer string.
4. Write `hint(el)` — optional extra info shown after the card is flipped (return `""` if not needed).
5. Write `check(input, el)` — returns `true` if the user's answer is acceptable. Use `normalizeStr()` for case-insensitive, trimmed comparison. For numeric answers you can use `Math.abs(parsed - el.mass) < tolerance`.

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

1. **Add the property to each element object in `periodic-table/elements.js`:**

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

**Open `periodic-table/app.js` and find the `getFilteredElements()` function.**

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

3. **Add the panel `<div>` to `periodic-table/index.html`** inside `<section class="sidebar-section filter-panels">`:

```html
<div id="block-panel" class="filter-panel" hidden></div>
```

4. **Show/hide the panel** in `updateFilterPanelVisibility()` in `app.js`:

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

1. Add the type key and label to `ELEMENT_TYPES` in `periodic-table/elements.js`:

```js
"superheavy": "Superheavy Element",
```

2. Assign the type to elements in `ELEMENTS`:

```js
{ number: 118, symbol: "Og", ..., type: "superheavy" },
```

3. Add a color variable in `periodic-table/styles.css` under `/* Element type colors */`:

```css
--c-superheavy: #e879f9;
```

4. Apply it to the card stripe and chip/swatch elements following the existing pattern:

```css
.flashcard[data-type="superheavy"]                         { --type-color: var(--c-superheavy); }
.custom-chip[data-type="superheavy"]:has(input:checked)    { border-color: var(--c-superheavy); color: var(--c-superheavy); }
.swatch[data-type="superheavy"]                            { background: var(--c-superheavy); }
```

5. Add a legend entry in `periodic-table/index.html`:

```html
<li><span class="swatch" data-type="superheavy"></span>Superheavy Element</li>
```

---

## How to Add a New Element

Elements are objects in the `ELEMENTS` array in `periodic-table/elements.js`. Each must have:

| Field    | Type         | Description |
|----------|--------------|-------------|
| `number` | number       | Atomic number (unique, 1–118+) |
| `symbol` | string       | Chemical symbol |
| `name`   | string       | Full IUPAC name |
| `mass`   | number       | Standard atomic weight |
| `group`  | number\|null | Group 1–18, or `null` for lanthanides/actinides |
| `period` | number       | Period 1–7 |
| `type`   | string       | Key from `ELEMENT_TYPES` |
| `block`  | string       | `"s"`, `"p"`, `"d"`, or `"f"` |

Groups and periods are derived automatically from the data — no other changes needed.

---

## How to Change the Visual Style

**Periodic Table program:** All design tokens are CSS custom properties in `:root {}` at the top of `periodic-table/styles.css`.

- **Colors:** Edit `--bg`, `--accent`, `--text-primary`, etc.
- **Element type colors:** Edit `--c-alkali`, `--c-transition`, etc.
- **Fonts:** Change `--font-display` and `--font-mono`, and update the Google Fonts `<link>` in `periodic-table/index.html`.
- **Border radius:** Change `--radius` and `--radius-lg`.
- **Sidebar width:** Change `--sidebar-w`.

**Landing page:** All design tokens are in the `<style>` block at the top of the root `index.html`, also as CSS custom properties in `:root {}`.

- **Background and ink colors:** Edit `--bg`, `--ink`, `--ink-mid`, `--ink-faint`.
- **Card accent colors:** Edit `--accent-periodic`, `--accent-future1`, etc., and their corresponding `--card-accent` / `--card-glow` values on each `.program-card--*` class.
- **Fonts:** Change the Google Fonts `<link>` and update `--font-serif` / `--font-mono`.

---

## Architecture Notes

- **State lives entirely in `periodic-table/app.js`** in the `state` object. Add new state fields there.
- **Data is read-only** in `elements.js`. Never mutate `ELEMENTS` at runtime.
- **The deck is a shuffled copy** of the filtered elements. The original `ELEMENTS` array is never modified.
- **Correct answers are removed** from `state.deck` and moved to `state.answered`. Incorrect answers are rotated to the end of the deck.
- **Filter changes** call `startRound()`, which rebuilds the deck from scratch.
- **Quiz mode changes** also call `startRound()`, resetting the round with the same filter.
- **Each program is fully isolated.** Programs share no JS, CSS, or state with each other or with the landing page.

---

## Adding Persistent Score / Statistics

To track scores across sessions (e.g., with `localStorage`):

1. In `periodic-table/app.js`, after `state.score.correct++`, call a `saveStats(el, quizMode)` function.
2. In `saveStats`, read the existing stats from `localStorage`, update them, and write back.
3. Add a stats panel to `periodic-table/index.html` and a render function in `app.js`.
4. Call the render function after each card is answered.

---

## Running the Project Locally

Because this project uses ES Modules, you must serve it from a local web server — browsers block `import` on `file://` URLs.

Always serve from the **project root** (the folder containing the root `index.html`), not from inside a program subfolder.

```bash
# Python 3
cd your-project
python3 -m http.server 8080

# Node.js
cd your-project
npx serve .

# VS Code — use the Live Server extension, then open index.html and click Go Live
```

Then open `http://localhost:8080` in your browser. The landing page loads at the root, and each program is reachable via its card link.

---

## Deploying to GitHub Pages

1. Push the entire project root to a GitHub repository.
2. Go to the repo → **Settings** → **Pages**.
3. Under Source, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. Your site will be live at `https://yourusername.github.io/repo-name`.

The landing page will be the entry point, and all program subfolders will be accessible via their relative links.
