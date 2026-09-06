import { KAYRA, MAT } from './players'
import { WINGSPAN, WINGSPAN_POCKET, SPLENDOR, SKYTEAM, AZUL } from './games'

export const ACCOLADES = [
  {
    id: 'first_flight',
    name: 'First Flight',
    emoji: '🪺',
    hint: 'Log your first Wingspan game',
    unlock: ({ rounds }) => rounds.some((r) => r.gameId === WINGSPAN),
  },
  {
    id: 'pocket_debut',
    name: 'Pocket Birder',
    emoji: '🐣',
    hint: 'Log your first Wingspan Pocket game',
    unlock: ({ rounds }) => rounds.some((r) => r.gameId === WINGSPAN_POCKET),
  },
  {
    id: 'pocket_ace',
    name: 'Pocket Rocket',
    emoji: '🧳',
    hint: 'Score 50+ points in a single Wingspan Pocket game',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === WINGSPAN_POCKET)
        .some(
          (r) =>
            (r.scores[KAYRA]?.total ?? 0) >= 50 ||
            (r.scores[MAT]?.total ?? 0) >= 50
        ),
  },
  {
    id: 'azul_debut',
    name: 'First Tile',
    emoji: '🔷',
    hint: 'Log your first Azul game',
    unlock: ({ rounds }) => rounds.some((r) => r.gameId === AZUL),
  },
  {
    id: 'mosaic_master',
    name: 'Mosaic Master',
    emoji: '🏺',
    hint: 'Complete two full color sets in one Azul game',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === AZUL)
        .some(
          (r) =>
            (r.scores[KAYRA]?.colors ?? 0) >= 2 ||
            (r.scores[MAT]?.colors ?? 0) >= 2
        ),
  },
  {
    id: 'palace_wall',
    name: 'Palace Wall',
    emoji: '🧱',
    hint: 'Score 100+ points in a single Azul game',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === AZUL)
        .some(
          (r) =>
            (r.scores[KAYRA]?.total ?? 0) >= 100 ||
            (r.scores[MAT]?.total ?? 0) >= 100
        ),
  },
  {
    id: 'by_a_row',
    name: 'By a Row',
    emoji: '📏',
    hint: 'Win an Azul game on the full-row tiebreaker',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === AZUL)
        .some(
          (r) =>
            r.outcome !== 'tie' &&
            (r.scores[KAYRA]?.total ?? 0) === (r.scores[MAT]?.total ?? 0)
        ),
  },
  {
    id: 'gem_hoarder',
    name: 'Gem Hoarder',
    emoji: '💎',
    hint: 'Win 5 Splendor Duel games via Prestige',
    unlock: ({ rounds }) => {
      const wins = rounds.filter(
        (r) => r.gameId === SPLENDOR && r.winMethod === 'prestige'
      )
      return wins.length >= 5
    },
  },
  {
    id: 'crown_jewel',
    name: 'Crown Jewel',
    emoji: '👑',
    hint: 'Win a Splendor Duel game via Crowns',
    unlock: ({ rounds }) =>
      rounds.some((r) => r.gameId === SPLENDOR && r.winMethod === 'crowns'),
  },
  {
    id: 'column_climber',
    name: 'Column Climber',
    emoji: '🏛️',
    hint: 'Win a Splendor Duel game via Columns',
    unlock: ({ rounds }) =>
      rounds.some((r) => r.gameId === SPLENDOR && r.winMethod === 'columns'),
  },
  {
    id: 'hat_trick',
    name: 'Hat Trick',
    emoji: '🎩',
    hint: 'Win with all three Splendor Duel methods',
    unlock: ({ rounds }) => {
      const methods = new Set(
        rounds
          .filter((r) => r.gameId === SPLENDOR && r.winMethod)
          .map((r) => r.winMethod)
      )
      return methods.has('prestige') && methods.has('crowns') && methods.has('columns')
    },
  },
  {
    id: 'safe_landing',
    name: 'Safe Landing',
    emoji: '🛬',
    hint: 'Land the plane 3 times in a row in Sky Team',
    unlock: ({ rounds }) => {
      const outcomes = rounds
        .filter((r) => r.gameId === SKYTEAM)
        .map((r) => r.outcome)
      let cur = 0
      let max = 0
      for (const o of outcomes) {
        if (o === 'landed') { cur++; max = Math.max(max, cur) }
        else cur = 0
      }
      return max >= 3
    },
  },
  {
    id: 'going_down',
    name: 'Going Down',
    emoji: '💥',
    hint: 'Crash 3 times in a row in Sky Team',
    unlock: ({ rounds }) => {
      const outcomes = rounds
        .filter((r) => r.gameId === SKYTEAM)
        .map((r) => r.outcome)
      let cur = 0
      let max = 0
      for (const o of outcomes) {
        if (o === 'crashed') { cur++; max = Math.max(max, cur) }
        else cur = 0
      }
      return max >= 3
    },
  },
  {
    id: 'wingspan_champ',
    name: 'Wingspan Champ',
    emoji: '🏆',
    hint: 'Win 10 Wingspan games total (combined)',
    unlock: ({ rounds }) => {
      const wins = rounds.filter(
        (r) => r.gameId === WINGSPAN && (r.outcome === KAYRA || r.outcome === MAT)
      )
      return wins.length >= 10
    },
  },
  {
    id: 'highest_flyer',
    name: 'Highest Flyer',
    emoji: '🚀',
    hint: 'Record a Wingspan score over 100 points',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === WINGSPAN)
        .some(
          (r) =>
            (r.scores[KAYRA]?.total ?? 0) > 100 ||
            (r.scores[MAT]?.total ?? 0) > 100
        ),
  },
  {
    id: 'hummingbird_hero',
    name: 'Hummingbird Hero',
    emoji: '🐦',
    hint: 'Score 10+ Hummingbird points in a single Wingspan game',
    unlock: ({ rounds }) =>
      rounds
        .filter((r) => r.gameId === WINGSPAN)
        .some(
          (r) =>
            (r.scores[KAYRA]?.hummingbird ?? 0) >= 10 ||
            (r.scores[MAT]?.hummingbird ?? 0) >= 10
        ),
  },
  {
    id: 'nectar_royalty',
    name: 'Nectar Royalty',
    emoji: '🌺',
    hint: 'Score the highest ever Nectar total in a Wingspan game',
    unlock: ({ rounds }) => {
      const nectarScores = rounds
        .filter((r) => r.gameId === WINGSPAN)
        .flatMap((r) => [r.scores[KAYRA]?.nectar ?? 0, r.scores[MAT]?.nectar ?? 0])
      return nectarScores.some((n) => n >= 8)
    },
  },
  {
    id: 'on_a_roll',
    name: 'On a Roll',
    emoji: '🎲',
    hint: 'Win 5 competitive games in a row',
    unlock: ({ rounds }) => {
      const comp = rounds
        .filter((r) => r.gameId === WINGSPAN || r.gameId === SPLENDOR)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      for (const player of [KAYRA, MAT]) {
        let cur = 0
        for (const r of comp) {
          const won = r.gameId === WINGSPAN ? r.outcome === player : r.winner === player
          if (won) { cur++; if (cur >= 5) return true }
          else cur = 0
        }
      }
      return false
    },
  },
  {
    id: 'for_play_royalty',
    name: 'For-Play Royalty',
    emoji: '👸',
    hint: 'Hold the For-Play Leader title for 30+ consecutive days',
    unlock: ({ rounds, stats }) => {
      if (!stats?.overall?.lastPlayed) return false
      const leader = stats.overall.leader
      if (leader === 'tie') return false
      const comp = rounds
        .filter((r) => r.gameId === WINGSPAN || r.gameId === SPLENDOR)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      if (comp.length < 2) return false
      const lastChangeIdx = (() => {
        let prevLeader = null
        let idx = 0
        let kayra = 0, mat = 0
        for (let i = 0; i < comp.length; i++) {
          const r = comp[i]
          const won = r.gameId === WINGSPAN ? r.outcome : r.winner
          if (won === KAYRA) kayra++
          else if (won === MAT) mat++
          const cur = kayra > mat ? KAYRA : mat > kayra ? MAT : 'tie'
          if (cur !== prevLeader) { prevLeader = cur; idx = i }
        }
        return idx
      })()
      const dateOfLastChange = new Date(comp[lastChangeIdx].date)
      const daysSince = Math.floor((new Date() - dateOfLastChange) / 86400000)
      return daysSince >= 30
    },
  },
  {
    id: 'evenly_matched',
    name: 'Evenly Matched',
    emoji: '⚖️',
    hint: 'Head-to-head record within 1 win of each other',
    unlock: ({ stats }) =>
      stats?.overall && Math.abs(stats.overall.kayraWins - stats.overall.matWins) <= 1 && stats.overall.total >= 4,
  },
  {
    id: 'date_night_mvp',
    name: 'Date Night MVP',
    emoji: '🌹',
    hint: 'Log 3 different games in one calendar day',
    unlock: ({ rounds }) => {
      const byDate = {}
      for (const r of rounds) {
        if (!byDate[r.date]) byDate[r.date] = new Set()
        byDate[r.date].add(r.gameId)
      }
      return Object.values(byDate).some((games) => games.size >= 3)
    },
  },
  {
    id: 'century_club',
    name: 'Century Club',
    emoji: '💯',
    hint: 'Play 100 total rounds across all games',
    unlock: ({ rounds }) => rounds.length >= 100,
  },
]
