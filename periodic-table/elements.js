/**
 * elements.js
 * ============
 * Core element data for the Periodic Table Flashcard Program.
 *
 * HOW TO ADD NEW ELEMENTS:
 * Each element is an object in the ELEMENTS array with these fields:
 *   - number    {number}  Atomic number (must be unique)
 *   - symbol    {string}  Chemical symbol (e.g. "H")
 *   - name      {string}  Full element name (e.g. "Hydrogen")
 *   - mass      {number}  Standard atomic weight (rounded to 3 decimal places)
 *   - group     {number|null}  Group number 1–18, or null for lanthanides/actinides
 *   - period    {number}  Period number 1–7
 *   - type      {string}  One of the TYPE keys defined in ELEMENT_TYPES below
 *   - block     {string}  Electron block: "s", "p", "d", or "f"
 *
 * HOW TO ADD NEW ELEMENT TYPES:
 * Add an entry to the ELEMENT_TYPES object below, then assign that key
 * as the `type` field on any elements belonging to that category.
 *
 * HOW TO ADD NEW GROUPS / PERIODS:
 * Groups and periods are derived automatically from element data.
 * Just make sure each element has the correct `group` and `period` values.
 *
 * See DEVELOPER_GUIDE.md for full instructions on extending modes and UI.
 */

// ─── Element Type Definitions ─────────────────────────────────────────────────
// Each key maps to a display label shown in the UI filter.
// To add a new type: add a key-value pair here, then use the key in element data.
export const ELEMENT_TYPES = {
  "alkali-metal":        "Alkali Metal",
  "alkaline-earth":      "Alkaline Earth Metal",
  "transition-metal":    "Transition Metal",
  "post-transition":     "Post-Transition Metal",
  "metalloid":           "Metalloid",
  "nonmetal":            "Nonmetal",
  "halogen":             "Halogen",
  "noble-gas":           "Noble Gas",
  "lanthanide":          "Lanthanide",
  "actinide":            "Actinide",
};

// ─── Element Data ─────────────────────────────────────────────────────────────
export const ELEMENTS = [
  { number:1,  symbol:"H",  name:"Hydrogen",      mass:1.008,   group:1,    period:1, type:"nonmetal",         block:"s" },
  { number:2,  symbol:"He", name:"Helium",         mass:4.003,   group:18,   period:1, type:"noble-gas",        block:"s" },
  { number:3,  symbol:"Li", name:"Lithium",        mass:6.941,   group:1,    period:2, type:"alkali-metal",     block:"s" },
  { number:4,  symbol:"Be", name:"Beryllium",      mass:9.012,   group:2,    period:2, type:"alkaline-earth",   block:"s" },
  { number:5,  symbol:"B",  name:"Boron",          mass:10.811,  group:13,   period:2, type:"metalloid",        block:"p" },
  { number:6,  symbol:"C",  name:"Carbon",         mass:12.011,  group:14,   period:2, type:"nonmetal",         block:"p" },
  { number:7,  symbol:"N",  name:"Nitrogen",       mass:14.007,  group:15,   period:2, type:"nonmetal",         block:"p" },
  { number:8,  symbol:"O",  name:"Oxygen",         mass:15.999,  group:16,   period:2, type:"nonmetal",         block:"p" },
  { number:9,  symbol:"F",  name:"Fluorine",       mass:18.998,  group:17,   period:2, type:"halogen",          block:"p" },
  { number:10, symbol:"Ne", name:"Neon",           mass:20.180,  group:18,   period:2, type:"noble-gas",        block:"p" },
  { number:11, symbol:"Na", name:"Sodium",         mass:22.990,  group:1,    period:3, type:"alkali-metal",     block:"s" },
  { number:12, symbol:"Mg", name:"Magnesium",      mass:24.305,  group:2,    period:3, type:"alkaline-earth",   block:"s" },
  { number:13, symbol:"Al", name:"Aluminum",       mass:26.982,  group:13,   period:3, type:"post-transition",  block:"p" },
  { number:14, symbol:"Si", name:"Silicon",        mass:28.086,  group:14,   period:3, type:"metalloid",        block:"p" },
  { number:15, symbol:"P",  name:"Phosphorus",     mass:30.974,  group:15,   period:3, type:"nonmetal",         block:"p" },
  { number:16, symbol:"S",  name:"Sulfur",         mass:32.065,  group:16,   period:3, type:"nonmetal",         block:"p" },
  { number:17, symbol:"Cl", name:"Chlorine",       mass:35.453,  group:17,   period:3, type:"halogen",          block:"p" },
  { number:18, symbol:"Ar", name:"Argon",          mass:39.948,  group:18,   period:3, type:"noble-gas",        block:"p" },
  { number:19, symbol:"K",  name:"Potassium",      mass:39.098,  group:1,    period:4, type:"alkali-metal",     block:"s" },
  { number:20, symbol:"Ca", name:"Calcium",        mass:40.078,  group:2,    period:4, type:"alkaline-earth",   block:"s" },
  { number:21, symbol:"Sc", name:"Scandium",       mass:44.956,  group:3,    period:4, type:"transition-metal", block:"d" },
  { number:22, symbol:"Ti", name:"Titanium",       mass:47.867,  group:4,    period:4, type:"transition-metal", block:"d" },
  { number:23, symbol:"V",  name:"Vanadium",       mass:50.942,  group:5,    period:4, type:"transition-metal", block:"d" },
  { number:24, symbol:"Cr", name:"Chromium",       mass:51.996,  group:6,    period:4, type:"transition-metal", block:"d" },
  { number:25, symbol:"Mn", name:"Manganese",      mass:54.938,  group:7,    period:4, type:"transition-metal", block:"d" },
  { number:26, symbol:"Fe", name:"Iron",           mass:55.845,  group:8,    period:4, type:"transition-metal", block:"d" },
  { number:27, symbol:"Co", name:"Cobalt",         mass:58.933,  group:9,    period:4, type:"transition-metal", block:"d" },
  { number:28, symbol:"Ni", name:"Nickel",         mass:58.693,  group:10,   period:4, type:"transition-metal", block:"d" },
  { number:29, symbol:"Cu", name:"Copper",         mass:63.546,  group:11,   period:4, type:"transition-metal", block:"d" },
  { number:30, symbol:"Zn", name:"Zinc",           mass:65.38,   group:12,   period:4, type:"transition-metal", block:"d" },
  { number:31, symbol:"Ga", name:"Gallium",        mass:69.723,  group:13,   period:4, type:"post-transition",  block:"p" },
  { number:32, symbol:"Ge", name:"Germanium",      mass:72.630,  group:14,   period:4, type:"metalloid",        block:"p" },
  { number:33, symbol:"As", name:"Arsenic",        mass:74.922,  group:15,   period:4, type:"metalloid",        block:"p" },
  { number:34, symbol:"Se", name:"Selenium",       mass:78.971,  group:16,   period:4, type:"nonmetal",         block:"p" },
  { number:35, symbol:"Br", name:"Bromine",        mass:79.904,  group:17,   period:4, type:"halogen",          block:"p" },
  { number:36, symbol:"Kr", name:"Krypton",        mass:83.798,  group:18,   period:4, type:"noble-gas",        block:"p" },
  { number:37, symbol:"Rb", name:"Rubidium",       mass:85.468,  group:1,    period:5, type:"alkali-metal",     block:"s" },
  { number:38, symbol:"Sr", name:"Strontium",      mass:87.62,   group:2,    period:5, type:"alkaline-earth",   block:"s" },
  { number:39, symbol:"Y",  name:"Yttrium",        mass:88.906,  group:3,    period:5, type:"transition-metal", block:"d" },
  { number:40, symbol:"Zr", name:"Zirconium",      mass:91.224,  group:4,    period:5, type:"transition-metal", block:"d" },
  { number:41, symbol:"Nb", name:"Niobium",        mass:92.906,  group:5,    period:5, type:"transition-metal", block:"d" },
  { number:42, symbol:"Mo", name:"Molybdenum",     mass:95.96,   group:6,    period:5, type:"transition-metal", block:"d" },
  { number:43, symbol:"Tc", name:"Technetium",     mass:98.000,  group:7,    period:5, type:"transition-metal", block:"d" },
  { number:44, symbol:"Ru", name:"Ruthenium",      mass:101.07,  group:8,    period:5, type:"transition-metal", block:"d" },
  { number:45, symbol:"Rh", name:"Rhodium",        mass:102.906, group:9,    period:5, type:"transition-metal", block:"d" },
  { number:46, symbol:"Pd", name:"Palladium",      mass:106.42,  group:10,   period:5, type:"transition-metal", block:"d" },
  { number:47, symbol:"Ag", name:"Silver",         mass:107.868, group:11,   period:5, type:"transition-metal", block:"d" },
  { number:48, symbol:"Cd", name:"Cadmium",        mass:112.411, group:12,   period:5, type:"transition-metal", block:"d" },
  { number:49, symbol:"In", name:"Indium",         mass:114.818, group:13,   period:5, type:"post-transition",  block:"p" },
  { number:50, symbol:"Sn", name:"Tin",            mass:118.710, group:14,   period:5, type:"post-transition",  block:"p" },
  { number:51, symbol:"Sb", name:"Antimony",       mass:121.760, group:15,   period:5, type:"metalloid",        block:"p" },
  { number:52, symbol:"Te", name:"Tellurium",      mass:127.60,  group:16,   period:5, type:"metalloid",        block:"p" },
  { number:53, symbol:"I",  name:"Iodine",         mass:126.904, group:17,   period:5, type:"halogen",          block:"p" },
  { number:54, symbol:"Xe", name:"Xenon",          mass:131.293, group:18,   period:5, type:"noble-gas",        block:"p" },
  { number:55, symbol:"Cs", name:"Cesium",         mass:132.905, group:1,    period:6, type:"alkali-metal",     block:"s" },
  { number:56, symbol:"Ba", name:"Barium",         mass:137.327, group:2,    period:6, type:"alkaline-earth",   block:"s" },
  { number:57, symbol:"La", name:"Lanthanum",      mass:138.905, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:58, symbol:"Ce", name:"Cerium",         mass:140.116, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:59, symbol:"Pr", name:"Praseodymium",   mass:140.908, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:60, symbol:"Nd", name:"Neodymium",      mass:144.242, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:61, symbol:"Pm", name:"Promethium",     mass:145.000, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:62, symbol:"Sm", name:"Samarium",       mass:150.36,  group:null, period:6, type:"lanthanide",       block:"f" },
  { number:63, symbol:"Eu", name:"Europium",       mass:151.964, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:64, symbol:"Gd", name:"Gadolinium",     mass:157.25,  group:null, period:6, type:"lanthanide",       block:"f" },
  { number:65, symbol:"Tb", name:"Terbium",        mass:158.925, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:66, symbol:"Dy", name:"Dysprosium",     mass:162.500, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:67, symbol:"Ho", name:"Holmium",        mass:164.930, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:68, symbol:"Er", name:"Erbium",         mass:167.259, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:69, symbol:"Tm", name:"Thulium",        mass:168.934, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:70, symbol:"Yb", name:"Ytterbium",      mass:173.054, group:null, period:6, type:"lanthanide",       block:"f" },
  { number:71, symbol:"Lu", name:"Lutetium",       mass:174.967, group:3,    period:6, type:"lanthanide",       block:"d" },
  { number:72, symbol:"Hf", name:"Hafnium",        mass:178.49,  group:4,    period:6, type:"transition-metal", block:"d" },
  { number:73, symbol:"Ta", name:"Tantalum",       mass:180.948, group:5,    period:6, type:"transition-metal", block:"d" },
  { number:74, symbol:"W",  name:"Tungsten",       mass:183.84,  group:6,    period:6, type:"transition-metal", block:"d" },
  { number:75, symbol:"Re", name:"Rhenium",        mass:186.207, group:7,    period:6, type:"transition-metal", block:"d" },
  { number:76, symbol:"Os", name:"Osmium",         mass:190.23,  group:8,    period:6, type:"transition-metal", block:"d" },
  { number:77, symbol:"Ir", name:"Iridium",        mass:192.217, group:9,    period:6, type:"transition-metal", block:"d" },
  { number:78, symbol:"Pt", name:"Platinum",       mass:195.084, group:10,   period:6, type:"transition-metal", block:"d" },
  { number:79, symbol:"Au", name:"Gold",           mass:196.967, group:11,   period:6, type:"transition-metal", block:"d" },
  { number:80, symbol:"Hg", name:"Mercury",        mass:200.592, group:12,   period:6, type:"transition-metal", block:"d" },
  { number:81, symbol:"Tl", name:"Thallium",       mass:204.383, group:13,   period:6, type:"post-transition",  block:"p" },
  { number:82, symbol:"Pb", name:"Lead",           mass:207.2,   group:14,   period:6, type:"post-transition",  block:"p" },
  { number:83, symbol:"Bi", name:"Bismuth",        mass:208.980, group:15,   period:6, type:"post-transition",  block:"p" },
  { number:84, symbol:"Po", name:"Polonium",       mass:209.000, group:16,   period:6, type:"post-transition",  block:"p" },
  { number:85, symbol:"At", name:"Astatine",       mass:210.000, group:17,   period:6, type:"halogen",          block:"p" },
  { number:86, symbol:"Rn", name:"Radon",          mass:222.000, group:18,   period:6, type:"noble-gas",        block:"p" },
  { number:87, symbol:"Fr", name:"Francium",       mass:223.000, group:1,    period:7, type:"alkali-metal",     block:"s" },
  { number:88, symbol:"Ra", name:"Radium",         mass:226.000, group:2,    period:7, type:"alkaline-earth",   block:"s" },
  { number:89, symbol:"Ac", name:"Actinium",       mass:227.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:90, symbol:"Th", name:"Thorium",        mass:232.038, group:null, period:7, type:"actinide",         block:"f" },
  { number:91, symbol:"Pa", name:"Protactinium",   mass:231.036, group:null, period:7, type:"actinide",         block:"f" },
  { number:92, symbol:"U",  name:"Uranium",        mass:238.029, group:null, period:7, type:"actinide",         block:"f" },
  { number:93, symbol:"Np", name:"Neptunium",      mass:237.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:94, symbol:"Pu", name:"Plutonium",      mass:244.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:95, symbol:"Am", name:"Americium",      mass:243.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:96, symbol:"Cm", name:"Curium",         mass:247.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:97, symbol:"Bk", name:"Berkelium",      mass:247.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:98, symbol:"Cf", name:"Californium",    mass:251.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:99, symbol:"Es", name:"Einsteinium",    mass:252.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:100,symbol:"Fm", name:"Fermium",        mass:257.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:101,symbol:"Md", name:"Mendelevium",    mass:258.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:102,symbol:"No", name:"Nobelium",       mass:259.000, group:null, period:7, type:"actinide",         block:"f" },
  { number:103,symbol:"Lr", name:"Lawrencium",     mass:262.000, group:3,    period:7, type:"actinide",         block:"d" },
  { number:104,symbol:"Rf", name:"Rutherfordium",  mass:265.000, group:4,    period:7, type:"transition-metal", block:"d" },
  { number:105,symbol:"Db", name:"Dubnium",        mass:268.000, group:5,    period:7, type:"transition-metal", block:"d" },
  { number:106,symbol:"Sg", name:"Seaborgium",     mass:271.000, group:6,    period:7, type:"transition-metal", block:"d" },
  { number:107,symbol:"Bh", name:"Bohrium",        mass:272.000, group:7,    period:7, type:"transition-metal", block:"d" },
  { number:108,symbol:"Hs", name:"Hassium",        mass:270.000, group:8,    period:7, type:"transition-metal", block:"d" },
  { number:109,symbol:"Mt", name:"Meitnerium",     mass:276.000, group:9,    period:7, type:"transition-metal", block:"d" },
  { number:110,symbol:"Ds", name:"Darmstadtium",   mass:281.000, group:10,   period:7, type:"transition-metal", block:"d" },
  { number:111,symbol:"Rg", name:"Roentgenium",    mass:280.000, group:11,   period:7, type:"transition-metal", block:"d" },
  { number:112,symbol:"Cn", name:"Copernicium",    mass:285.000, group:12,   period:7, type:"transition-metal", block:"d" },
  { number:113,symbol:"Nh", name:"Nihonium",       mass:284.000, group:13,   period:7, type:"post-transition",  block:"p" },
  { number:114,symbol:"Fl", name:"Flerovium",      mass:289.000, group:14,   period:7, type:"post-transition",  block:"p" },
  { number:115,symbol:"Mc", name:"Moscovium",      mass:288.000, group:15,   period:7, type:"post-transition",  block:"p" },
  { number:116,symbol:"Lv", name:"Livermorium",    mass:293.000, group:16,   period:7, type:"post-transition",  block:"p" },
  { number:117,symbol:"Ts", name:"Tennessine",     mass:294.000, group:17,   period:7, type:"halogen",          block:"p" },
  { number:118,symbol:"Og", name:"Oganesson",      mass:294.000, group:18,   period:7, type:"noble-gas",        block:"p" },
];

// ─── Quiz Mode Definitions ────────────────────────────────────────────────────
/**
 * QUIZ_MODES defines how a flashcard prompt is generated from an element.
 *
 * HOW TO ADD A NEW QUIZ MODE:
 * 1. Add a new key to this object.
 * 2. Set `label`   – human-readable name shown in the UI dropdown.
 * 3. Set `prompt`  – a function (element) => string returning the front-of-card text.
 * 4. Set `answer`  – a function (element) => string returning the canonical answer.
 * 5. Set `check`   – a function (userInput, element) => boolean for answer validation.
 *    Use normalizeStr() for case-insensitive, trimmed comparison.
 *
 * The new mode will automatically appear in the quiz mode selector.
 */
export function normalizeStr(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, " ");
}

export const QUIZ_MODES = {
  "symbol-to-name": {
    label:  "Symbol → Name",
    prompt: el => el.symbol,
    answer: el => el.name,
    hint:   el => `Atomic #${el.number}`,
    check:  (input, el) => normalizeStr(input) === normalizeStr(el.name),
  },
  "name-to-symbol": {
    label:  "Name → Symbol",
    prompt: el => el.name,
    answer: el => el.symbol,
    hint:   el => `Atomic #${el.number}`,
    check:  (input, el) => normalizeStr(input) === normalizeStr(el.symbol),
  },
  "number-to-name": {
    label:  "Atomic # → Name",
    prompt: el => `#${el.number}`,
    answer: el => el.name,
    hint:   el => `Symbol: ${el.symbol}`,
    check:  (input, el) => normalizeStr(input) === normalizeStr(el.name),
  },
  "name-to-number": {
    label:  "Name → Atomic #",
    prompt: el => el.name,
    answer: el => String(el.number),
    hint:   el => `Symbol: ${el.symbol}`,
    check:  (input, el) => normalizeStr(input) === normalizeStr(String(el.number)),
  },
  "mass-to-name": {
    label:  "Mass → Name",
    prompt: el => el.mass.toFixed(3),
    answer: el => el.name,
    hint:   el => `Symbol: ${el.symbol}`,
    check:  (input, el) => normalizeStr(input) === normalizeStr(el.name),
  },
  "name-to-mass": {
    label:  "Name → Mass",
    prompt: el => el.name,
    answer: el => el.mass.toFixed(3),
    hint:   el => `Symbol: ${el.symbol}`,
    // Accept answer within ±0.01 or exact string match
    check:  (input, el) => {
      const parsed = parseFloat(input);
      if (!isNaN(parsed)) return Math.abs(parsed - el.mass) < 0.011;
      return normalizeStr(input) === normalizeStr(String(el.mass));
    },
  },
};

// ─── Utility: Derive available groups and periods ─────────────────────────────
export const ALL_GROUPS  = [...new Set(ELEMENTS.map(e => e.group).filter(g => g !== null))].sort((a,b)=>a-b);
export const ALL_PERIODS = [...new Set(ELEMENTS.map(e => e.period))].sort((a,b)=>a-b);
