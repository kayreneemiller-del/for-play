export const WINGSPAN = 'wingspan'
export const SPLENDOR = 'splendor'
export const SKYTEAM = 'skyteam'

export const GAME_CONFIG = {
  [WINGSPAN]: {
    id: WINGSPAN,
    label: 'Wingspan Americas',
    emoji: '🦅',
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
}

export const SPLENDOR_WIN_METHODS = [
  { value: 'prestige', label: 'Prestige — Reached 20 prestige points' },
  { value: 'crowns', label: 'Crowns — Collected 10 crown tokens' },
  { value: 'columns', label: 'Columns — Owned a card in each column' },
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
