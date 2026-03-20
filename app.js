/**
 * app.js
 * =======
 * Main application controller for the Periodic Table Flashcard Program.
 *
 * This file manages:
 *   - Session state (current deck, answered cards, score)
 *   - Rendering the active flashcard
 *   - Handling user interaction (answer input, card flip, reset)
 *   - Building filter panels (groups, periods, types, custom selection)
 *   - Coordinating between elements.js (data) and styles.css (presentation)
 *
 * HOW TO ADD A NEW FILTER CATEGORY:
 * 1. Open elements.js and ensure element data has the relevant property.
 * 2. In buildFilterPanels(), add a new section using buildCheckboxGroup().
 * 3. In getFilteredElements(), add a condition that reads your new checkboxes.
 * 4. See DEVELOPER_GUIDE.md for a full walkthrough.
 *
 * HOW TO ADD A NEW QUIZ MODE:
 * All quiz mode logic lives in elements.js → QUIZ_MODES.
 * This file auto-discovers all modes from that object — no changes needed here
 * unless you want to change how the mode selector is rendered.
 */

import {
  ELEMENTS, ELEMENT_TYPES, QUIZ_MODES,
  ALL_GROUPS, ALL_PERIODS
} from "./elements.js";

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  deck:        [],      // Elements remaining in this round
  answered:    [],      // Elements correctly answered this round
  current:     null,    // The element currently shown
  quizMode:    "symbol-to-name",
  filterMode:  "all",   // "all" | "custom" | "group" | "period" | "type"
  revealed:    false,   // Whether card has been flipped
  score:       { correct: 0, total: 0 },
};

// ─── DOM References ───────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildQuizModeSelector();
  buildFilterModeSelector();
  buildFilterPanels();
  attachEventListeners();
  startRound();
});

// ─── Quiz Mode Selector ───────────────────────────────────────────────────────
function buildQuizModeSelector() {
  const sel = $("quiz-mode-select");
  sel.innerHTML = "";
  for (const [key, mode] of Object.entries(QUIZ_MODES)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = mode.label;
    sel.appendChild(opt);
  }
  sel.value = state.quizMode;
}

// ─── Filter Mode Selector ─────────────────────────────────────────────────────
function buildFilterModeSelector() {
  const filterModes = [
    { value: "all",    label: "Whole Table" },
    { value: "custom", label: "Custom Selection" },
    { value: "group",  label: "By Group" },
    { value: "period", label: "By Period" },
    { value: "type",   label: "By Element Type" },
  ];

  const sel = $("filter-mode-select");
  sel.innerHTML = "";
  filterModes.forEach(fm => {
    const opt = document.createElement("option");
    opt.value = fm.value;
    opt.textContent = fm.label;
    sel.appendChild(opt);
  });
  sel.value = state.filterMode;
}

// ─── Filter Panels ────────────────────────────────────────────────────────────
function buildFilterPanels() {
  buildCustomPanel();
  buildGroupPanel();
  buildPeriodPanel();
  buildTypePanel();
  updateFilterPanelVisibility();
}

function buildCustomPanel() {
  const container = $("custom-panel");
  container.innerHTML = "<p class='panel-label'>Select elements to study:</p>";
  const grid = document.createElement("div");
  grid.className = "custom-grid";

  ELEMENTS.forEach(el => {
    const label = document.createElement("label");
    label.className = "custom-chip";
    label.title = el.name;
    label.dataset.type = el.type;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.name = "custom-el";
    cb.value = el.number;
    cb.checked = true;

    label.appendChild(cb);
    label.appendChild(document.createTextNode(el.symbol));
    grid.appendChild(label);
  });

  container.appendChild(grid);

  // Select/deselect all buttons
  const btnRow = document.createElement("div");
  btnRow.className = "btn-row";
  btnRow.innerHTML = `
    <button class="pill-btn" onclick="selectAll(true)">Select All</button>
    <button class="pill-btn" onclick="selectAll(false)">Deselect All</button>
  `;
  container.appendChild(btnRow);
}

window.selectAll = function(checked) {
  document.querySelectorAll('input[name="custom-el"]').forEach(cb => cb.checked = checked);
};

function buildGroupPanel() {
  const container = $("group-panel");
  container.innerHTML = "<p class='panel-label'>Select groups to study:</p>";
  container.appendChild(buildCheckboxGroup("group-cb", ALL_GROUPS, g => `Group ${g}`, true));
}

function buildPeriodPanel() {
  const container = $("period-panel");
  container.innerHTML = "<p class='panel-label'>Select periods to study:</p>";
  container.appendChild(buildCheckboxGroup("period-cb", ALL_PERIODS, p => `Period ${p}`, true));
}

function buildTypePanel() {
  const container = $("type-panel");
  container.innerHTML = "<p class='panel-label'>Select element types to study:</p>";
  const typeKeys = Object.keys(ELEMENT_TYPES);
  container.appendChild(buildCheckboxGroup("type-cb", typeKeys, k => ELEMENT_TYPES[k], true));
}

/**
 * buildCheckboxGroup
 * Helper to create a labeled checkbox list for filter panels.
 * @param {string} name   - name attribute for inputs
 * @param {Array}  items  - values to create checkboxes for
 * @param {Function} labelFn - maps item to display string
 * @param {boolean} checked  - default checked state
 */
function buildCheckboxGroup(name, items, labelFn, checked) {
  const wrapper = document.createElement("div");
  wrapper.className = "checkbox-group";
  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "checkbox-label";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.name = name;
    cb.value = item;
    cb.checked = checked;
    label.appendChild(cb);
    label.appendChild(document.createTextNode(labelFn(item)));
    wrapper.appendChild(label);
  });
  return wrapper;
}

function updateFilterPanelVisibility() {
  const mode = state.filterMode;
  $("custom-panel").hidden  = mode !== "custom";
  $("group-panel").hidden   = mode !== "group";
  $("period-panel").hidden  = mode !== "period";
  $("type-panel").hidden    = mode !== "type";
}

// ─── Element Filtering ────────────────────────────────────────────────────────
/**
 * getFilteredElements
 * Returns the subset of ELEMENTS based on current filter settings.
 *
 * HOW TO ADD A NEW FILTER MODE:
 * Add a new `case` block here. Read your filter inputs, then
 * return `ELEMENTS.filter(el => /* your condition *\/)`.
 */
function getFilteredElements() {
  switch (state.filterMode) {
    case "all":
      return [...ELEMENTS];

    case "custom": {
      const checked = [...document.querySelectorAll('input[name="custom-el"]:checked')]
        .map(cb => parseInt(cb.value));
      return ELEMENTS.filter(el => checked.includes(el.number));
    }

    case "group": {
      const checked = [...document.querySelectorAll('input[name="group-cb"]:checked')]
        .map(cb => parseInt(cb.value));
      return ELEMENTS.filter(el => checked.includes(el.group));
    }

    case "period": {
      const checked = [...document.querySelectorAll('input[name="period-cb"]:checked')]
        .map(cb => parseInt(cb.value));
      return ELEMENTS.filter(el => checked.includes(el.period));
    }

    case "type": {
      const checked = [...document.querySelectorAll('input[name="type-cb"]:checked')]
        .map(cb => cb.value);
      return ELEMENTS.filter(el => checked.includes(el.type));
    }

    default:
      return [...ELEMENTS];
  }
}

// ─── Round Management ─────────────────────────────────────────────────────────
function startRound() {
  const filtered = getFilteredElements();
  if (filtered.length === 0) {
    showEmptyState("No elements selected. Please adjust your filters.");
    return;
  }
  state.deck     = shuffle([...filtered]);
  state.answered = [];
  state.score    = { correct: 0, total: filtered.length };
  updateProgress();
  nextCard();
}

function nextCard() {
  if (state.deck.length === 0) {
    showCompletionScreen();
    return;
  }
  state.current  = state.deck[0];
  state.revealed = false;
  renderCard();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── Card Rendering ───────────────────────────────────────────────────────────
function renderCard() {
  const el   = state.current;
  const mode = QUIZ_MODES[state.quizMode];

  const cardArea    = $("card-area");
  const promptEl    = $("card-prompt");
  const answerEl    = $("card-answer");
  const answerInput = $("answer-input");
  const hintEl      = $("card-hint");
  const metaEl      = $("card-meta");
  const completion  = $("completion-screen");
  const emptyState  = $("empty-state");

  cardArea.hidden    = false;
  completion.hidden  = true;
  emptyState.hidden  = true;

  promptEl.textContent = mode.prompt(el);
  answerEl.textContent = mode.answer(el);
  hintEl.textContent   = mode.hint ? mode.hint(el) : "";
  metaEl.textContent   = `${el.name} · ${el.symbol} · #${el.number}`;

  answerEl.hidden = true;
  hintEl.hidden   = true;
  metaEl.hidden   = true;

  // Style prompt size based on content length
  promptEl.className = "card-prompt";
  const promptText = mode.prompt(el);
  if (promptText.length > 14) promptEl.classList.add("card-prompt--sm");
  if (promptText.length > 20) promptEl.classList.add("card-prompt--xs");

  // Style card by element type
  const card = $("flashcard");
  card.dataset.type = el.type;
  card.classList.remove("card--correct", "card--wrong", "card--flipped");

  answerInput.value = "";
  answerInput.disabled = false;
  answerInput.focus();
  answerInput.placeholder = "Type your answer…";

  $("flip-btn").textContent = "Reveal Answer";
  $("flip-btn").disabled = false;
  $("next-btn").hidden = true;

  updateProgress();
}

// ─── Card Interaction ─────────────────────────────────────────────────────────
function revealCard() {
  if (state.revealed) return;
  state.revealed = true;

  const el    = state.current;
  const mode  = QUIZ_MODES[state.quizMode];
  const input = $("answer-input").value;
  const card  = $("flashcard");

  $("card-answer").hidden = false;
  $("card-hint").hidden   = false;
  $("card-meta").hidden   = false;
  $("answer-input").disabled = true;
  $("flip-btn").disabled  = true;

  const correct = mode.check(input, el);

  if (correct) {
    card.classList.add("card--correct");
    state.deck.shift();
    state.answered.push(el);
    state.score.correct++;
    $("flip-btn").textContent = "✓ Correct!";
  } else {
    card.classList.add("card--wrong");
    // Move element to end of deck so user sees it again
    state.deck.push(state.deck.shift());
    $("flip-btn").textContent = input.trim() ? "✗ Incorrect" : "Answer Revealed";
  }

  $("next-btn").hidden = false;
  updateProgress();
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function updateProgress() {
  const total     = state.score.total;
  const answered  = state.answered.length;
  const pct       = total > 0 ? (answered / total) * 100 : 0;

  $("progress-bar").style.width = pct + "%";
  $("progress-text").textContent = `${answered} / ${total} mastered`;
  $("deck-remaining").textContent = `${state.deck.length} remaining`;
}

// ─── Completion / Empty State ─────────────────────────────────────────────────
function showCompletionScreen() {
  $("card-area").hidden   = true;
  $("empty-state").hidden = true;
  const screen = $("completion-screen");
  screen.hidden = false;
  $("completion-score").textContent = `You mastered all ${state.score.total} elements!`;
}

function showEmptyState(msg) {
  $("card-area").hidden       = true;
  $("completion-screen").hidden = true;
  const el = $("empty-state");
  el.hidden = false;
  $("empty-msg").textContent = msg;
}

// ─── Event Listeners ─────────────────────────────────────────────────────────
function attachEventListeners() {
  // Quiz mode selector
  $("quiz-mode-select").addEventListener("change", e => {
    state.quizMode = e.target.value;
    startRound();
  });

  // Filter mode selector
  $("filter-mode-select").addEventListener("change", e => {
    state.filterMode = e.target.value;
    updateFilterPanelVisibility();
    startRound();
  });

  // Reveal / flip button
  $("flip-btn").addEventListener("click", revealCard);

  // Next card button
  $("next-btn").addEventListener("click", nextCard);

  // Reset button
  $("reset-btn").addEventListener("click", startRound);

  // Restart from completion screen
  $("restart-btn").addEventListener("click", startRound);

  // Enter key in input triggers reveal
  $("answer-input").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      if (!state.revealed) revealCard();
      else nextCard();
    }
  });

  // Apply filters button (for manual filter panel changes)
  $("apply-filters-btn").addEventListener("click", startRound);

  // Keyboard shortcut: Space to reveal/next
  document.addEventListener("keydown", e => {
    if (e.target === $("answer-input")) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (!state.revealed) revealCard();
      else if (!$("next-btn").hidden) nextCard();
    }
  });
}
