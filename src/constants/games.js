export const WINGSPAN = 'wingspan'
export const WINGSPAN_POCKET = 'wingspan_pocket'
export const SPLENDOR = 'splendor'
export const SKYTEAM = 'skyteam'
export const JAIPUR = 'jaipur'
export const PATCHWORK = 'patchwork'
export const LOST_CITIES = 'lost_cities'
export const SEVEN_WONDERS = '7wonders'
export const SEVEN_WONDERS_PANTHEON = '7wonders_pantheon'
export const ONITAMA = 'onitama'
export const AZUL = 'azul'
export const HARMONIES = 'harmonies'

export const GAME_CONFIG = {
  [WINGSPAN]: {
    id: WINGSPAN,
    label: 'Wingspan Americas',
    emoji: '🦅',
    type: 'competitive',
    color: 'teal',
  },
  [WINGSPAN_POCKET]: {
    id: WINGSPAN_POCKET,
    label: 'Wingspan Pocket',
    emoji: '🐦',
    type: 'competitive',
    color: 'teal',
  },
  [SPLENDOR]: {
    id: SPLENDOR,
    label: 'Splendor Duel',
    emoji: '💎',
    type: 'competitive',
    color: 'magenta',
  },
  [SKYTEAM]: {
    id: SKYTEAM,
    label: 'Sky Team',
    emoji: '✈️',
    type: 'cooperative',
    color: 'gold',
  },
  [JAIPUR]: {
    id: JAIPUR,
    label: 'Jaipur',
    emoji: '🐪',
    type: 'competitive',
    color: 'gold',
  },
  [PATCHWORK]: {
    id: PATCHWORK,
    label: 'Patchwork',
    emoji: '🧵',
    type: 'competitive',
    color: 'teal',
  },
  [LOST_CITIES]: {
    id: LOST_CITIES,
    label: 'Lost Cities',
    emoji: '🗺️',
    type: 'competitive',
    color: 'magenta',
    allowNegative: true,
  },
  [SEVEN_WONDERS]: {
    id: SEVEN_WONDERS,
    label: '7 Wonders Duel',
    emoji: '🏛️',
    type: 'competitive',
    color: 'gold',
  },
  [SEVEN_WONDERS_PANTHEON]: {
    id: SEVEN_WONDERS_PANTHEON,
    label: '7 Wonders Duel Pantheon',
    emoji: '⚡',
    type: 'competitive',
    color: 'gold',
  },
  [ONITAMA]: {
    id: ONITAMA,
    label: 'Onitama',
    emoji: '🥋',
    type: 'competitive',
    color: 'teal',
  },
  [AZUL]: {
    id: AZUL,
    label: 'Azul',
    emoji: '🔷',
    type: 'competitive',
    color: 'teal',
  },
  [HARMONIES]: {
    id: HARMONIES,
    label: 'Harmonies',
    emoji: '🌿',
    type: 'competitive',
    color: 'teal',
  },
}

export const SPLENDOR_WIN_METHODS = [
  { value: 'prestige', label: 'Prestige — Reached 20 prestige points' },
  { value: 'crowns', label: 'Crowns — Collected 10 crown tokens' },
  { value: 'columns', label: 'Columns — Owned a card in each column' },
]

export const SEVEN_WONDERS_WIN_METHODS = [
  { value: 'military', label: 'Military Supremacy — Advanced your shield token' },
  { value: 'science', label: 'Science Supremacy — Collected 6 science symbols' },
  { value: 'civilian', label: 'Civilian Victory — Most victory points' },
]

// 7 Wonders Duel score pad rows, in the order printed on the pad.
// `bg` tints the row to match the card colour.
export const SEVEN_WONDERS_CATEGORIES = [
  { key: 'blue', label: 'Civilian', icon: '🟦', bg: 'rgba(96,165,250,0.18)' },
  { key: 'green', label: 'Science', icon: '🟩', bg: 'rgba(74,222,128,0.18)' },
  { key: 'yellow', label: 'Commercial', icon: '🟨', bg: 'rgba(250,204,21,0.18)' },
  { key: 'purple', label: 'Guilds', icon: '🟪', bg: 'rgba(167,139,250,0.18)' },
  { key: 'wonders', label: 'Wonders', icon: '🔺', bg: 'rgba(255,255,255,0.08)' },
  { key: 'progress', label: 'Progress Tokens', icon: '🟢', bg: 'rgba(52,211,153,0.18)' },
  { key: 'coins', label: 'Coins', icon: '🪙', bg: 'rgba(250,204,21,0.14)' },
  { key: 'military', label: 'Military', icon: '⚔️', bg: 'rgba(251,146,60,0.18)' },
]

// Pantheon adds divinity cards (and their victory points) to the standard pad.
export const SEVEN_WONDERS_PANTHEON_CATEGORIES = [
  ...SEVEN_WONDERS_CATEGORIES.slice(0, 5),
  { key: 'divinities', label: 'Divinities', icon: '⚡', bg: 'rgba(244,114,182,0.18)' },
  ...SEVEN_WONDERS_CATEGORIES.slice(5),
]

export const ONITAMA_WIN_METHODS = [
  { value: 'stone', label: "Way of the Stone — Captured the opponent's Master" },
  { value: 'stream', label: "Way of the Stream — Moved your Master to their Temple Arch" },
]

export const SKYTEAM_DIFFICULTIES = [
  { value: 'green', label: 'Green', color: '#39FF14' },
  { value: 'yellow', label: 'Yellow', color: '#FFD700' },
  { value: 'red', label: 'Red', color: '#FF3131' },
  { value: 'black', label: 'Black', color: '#FFFFFF' },
]

export const WINGSPAN_CATEGORIES = [
  { key: 'birds', label: 'Birds Played' },
  { key: 'bonus_cards', label: 'Bonus Cards' },
  { key: 'round_goals', label: 'End-of-Round Goals' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'cached_food', label: 'Cached Food' },
  { key: 'tucked_cards', label: 'Tucked Cards' },
  { key: 'nectar', label: 'Nectar' },
  { key: 'hummingbird', label: 'Hummingbird Total' },
]

export const WINGSPAN_POCKET_CATEGORIES = [
  { key: 'birds', label: 'Bird Points' },
  { key: 'eggs', label: 'Eggs' },
  { key: 'tucked_cards', label: 'Tucked Cards' },
  { key: 'goals', label: 'Goals' },
]

// Azul: the score track already includes tile placement and floor-line
// penalties, so only the three end-of-game bonuses are multiplied out.
export const AZUL_CATEGORIES = [
  { key: 'track', label: 'Score Track', hint: 'after floor penalties', multiplier: 1 },
  { key: 'rows', label: 'Full Rows', hint: '2 pts each', multiplier: 2 },
  { key: 'columns', label: 'Full Columns', hint: '7 pts each', multiplier: 7 },
  { key: 'colors', label: 'Color Sets', hint: '10 pts each', multiplier: 10 },
]

// Harmonies score pad: one total per landscape (colour-matched like the pad),
// then the animal card points. Habitats + animals = final score.
export const HARMONIES_LANDSCAPES = [
  { key: 'trees', label: 'Trees', icon: '🌳', hint: 'Leaf on 0/1/2 trunks = 1/3/7 pts', bg: 'rgba(132,204,22,0.18)' },
  { key: 'mountains', label: 'Mountains', icon: '⛰️', hint: 'Stacks of 1/2/3 = 1/3/7 pts, only if touching another mountain', bg: 'rgba(148,163,184,0.20)' },
  { key: 'fields', label: 'Fields', icon: '🌾', hint: '5 pts per group of 2+ fields', bg: 'rgba(250,204,21,0.18)' },
  { key: 'buildings', label: 'Buildings', icon: '🏠', hint: '5 pts each, touching 3+ different colours', bg: 'rgba(248,113,113,0.18)' },
  { key: 'water', label: 'Water', icon: '💧', hint: 'Longest river: 2→2, 3→5, 4→8, 5→11, 6→15, +4 each beyond', bg: 'rgba(56,189,248,0.18)' },
]

// Animal cards: the pad has a column of slots, one score per card.
export const HARMONIES_MIN_ANIMAL_SLOTS = 4
export const HARMONIES_MAX_ANIMAL_SLOTS = 9
