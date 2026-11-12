import { KAYRA, MAT } from './players'

// The Anniversary Games — a four-day special edition (Thu-Sun) for our 2nd anniversary.
// Edit these dates to re-run the tournament some other week.
export const TOURNAMENT = {
  id: 'anniversary-2026',
  name: 'The Anniversary Games',
  tagline: 'Year Two · Thu → Sun',
  start: '2026-11-12',
  end: '2026-11-15',
  finaleDate: '2026-11-14', // Saturday: double points
  finaleMultiplier: 2,
}

export const HEAT_RULES = [
  { icon: '🎲', label: 'Play any game together', pts: '+1 each' },
  { icon: '🏆', label: 'Win a competitive game', pts: '+3' },
  { icon: '🤝', label: 'Tie, or land a co-op together', pts: '+2 each' },
  { icon: '🌈', label: 'First time playing a game this week', pts: '+2 each' },
  { icon: '📅', label: 'Play on a new day', pts: '+2 each' },
  { icon: '🔥', label: 'Saturday finale', pts: '×2 everything' },
]

// Unlocked by the couple's combined Heat. Rewards stay hidden until earned.
export const HEAT_TIERS = [
  { id: 'spark', at: 6, emoji: '🕯️', name: 'Spark', reward: 'Candles lit, phones away, and a dessert you share off one plate.' },
  { id: 'flirt', at: 14, emoji: '💋', name: 'Flirt', reward: 'Ten minutes of undivided attention: kissing, nothing else on the agenda.' },
  { id: 'slowburn', at: 24, emoji: '🎶', name: 'Slow Burn', reward: 'One slow dance in the kitchen, lights low. Whoever has the lower Heat picks the song.' },
  { id: 'heatwave', at: 36, emoji: '🌹', name: 'Heat Wave', reward: 'Matching massages, oil supplied, 15 minutes each, no talking about the dishes.' },
  { id: 'inferno', at: 50, emoji: '🔥', name: 'Inferno', reward: 'A full anniversary night in: dress code of your choosing, door locked, and the rest is between the two of you.' },
]

// {w} = the player who earned it, {o} = the other player.
export const ACHIEVEMENTS = [
  {
    id: 'opening_move', scope: 'both', emoji: '🥂', name: 'Opening Move',
    hint: 'Log the first game of the tournament',
    reward: 'Toast to year two. The first sip is fed to each other.',
  },
  {
    id: 'first_blood', scope: 'player', emoji: '💘', name: 'First Blood',
    hint: 'Win the first game of the tournament',
    reward: '{o} owes {w} a proper kiss, delivered with commitment.',
  },
  {
    id: 'hat_trick', scope: 'player', emoji: '🎩', name: 'Hat Trick',
    hint: 'Win 3 games',
    reward: '{w} picks the outfit {o} wears tonight. Lingerie-optional, {w}\'s call.',
  },
  {
    id: 'sweep', scope: 'player', emoji: '🧹', name: 'Clean Sweep',
    hint: 'Win 3 games in a row',
    reward: '{o} gives {w} a 20-minute massage and says "yes, dear" to every request.',
  },
  {
    id: 'comeback', scope: 'player', emoji: '😈', name: 'Sweet Revenge',
    hint: 'Win right after losing a game',
    reward: '{w} chooses a "forfeit" for {o}, tasteful but flirty. Veto only if it makes you blush too hard.',
  },
  {
    id: 'daily_champ', scope: 'player', emoji: '👑', name: 'Daily Champion',
    hint: 'Finish a day with more Heat than your partner',
    reward: '{w} gets breakfast in bed, and {o} is wearing something nice while serving it.',
  },
  {
    id: 'supremacy', scope: 'player', emoji: '⚡', name: 'Supreme Seducer',
    hint: 'Win 7 Wonders Duel by Military or Science Supremacy',
    reward: '{o} must say one thing they still find irresistible about {w}, in a very low voice.',
  },
  {
    id: 'variety', scope: 'both', emoji: '🌈', name: 'Unabashed',
    hint: 'Play 4 different games',
    reward: 'Pick one thing from each other\'s wishlist: a place, a treat, or a little something for the bedroom.',
  },
  {
    id: 'marathon', scope: 'both', emoji: '🥵', name: 'Marathon Lovers',
    hint: 'Log 10 games',
    reward: 'Hot bath for two, a drink in hand, and bragging rights over who really won.',
  },
  {
    id: 'perfect_landing', scope: 'both', emoji: '🛬', name: 'Smooth Landing',
    hint: 'Land Sky Team together',
    reward: 'Teamwork deserves a reward: a full-body hug that lasts until someone gives in and kisses.',
  },
  {
    id: 'saturday_win', scope: 'player', emoji: '🎆', name: 'Anniversary Victor',
    hint: 'Win a game on Saturday',
    reward: '{o} plans the finale: {w} gets the chair, the playlist, and the last word.',
  },
]

export const GRAND_CHAMPION = {
  emoji: '🏆',
  name: 'Grand Champion',
  hint: 'Most Heat when the tournament closes Sunday night',
  reward: '{o} owes {w} a "wedding night redux": candles, dress code, no phones, and {w} writes the itinerary. If it ends in a tie, you both do.',
}

export const PLAYERS = [KAYRA, MAT]
