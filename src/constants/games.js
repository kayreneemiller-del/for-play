export const WINGSPAN = 'wingspan'
export const WINGSPAN_POCKET = 'wingspan_pocket'
export const SPLENDOR = 'splendor'
export const SKYTEAM = 'skyteam'
export const JAIPUR = 'jaipur'
export const PATCHWORK = 'patchwork'
export const LOST_CITIES = 'lost_cities'
export const SEVEN_WONDERS = '7wonders'
export const ONITAMA = 'onitama'
export const AZUL = 'azul'

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
