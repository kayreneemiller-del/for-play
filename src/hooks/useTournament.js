import { useMemo } from 'react'
import { KAYRA, MAT } from '../constants/players'
import { TOURNAMENT, HEAT_TIERS, ACHIEVEMENTS } from '../constants/tournament'
import { SKYTEAM, SEVEN_WONDERS, SEVEN_WONDERS_PANTHEON } from '../constants/games'

const WINNER_KEYS = [KAYRA, MAT]

// Normalise the different round shapes into one of: kayra | mat | tie | coop-win | coop-loss
function resultOf(r) {
  const w = r.winner ?? r.outcome
  if (WINNER_KEYS.includes(w)) return w
  if (w === 'tie') return 'tie'
  if (w === 'landed') return 'coop-win'
  if (w === 'crashed') return 'coop-loss'
  return null
}

export function tournamentStatus(today = new Date().toISOString().slice(0, 10)) {
  if (today < TOURNAMENT.start) return 'upcoming'
  if (today > TOURNAMENT.end) return 'finished'
  return 'live'
}

export function eachTournamentDay() {
  const days = []
  const d = new Date(`${TOURNAMENT.start}T12:00:00`)
  const end = new Date(`${TOURNAMENT.end}T12:00:00`)
  while (d <= end) {
    days.push(d.toISOString().slice(0, 10))
    d.setDate(d.getDate() + 1)
  }
  return days
}

export function useTournament(rounds) {
  return useMemo(() => {
    const games = rounds
      .filter((r) => r.date >= TOURNAMENT.start && r.date <= TOURNAMENT.end)
      .slice()
      .sort((a, b) => (a.date === b.date ? (a.id ?? 0) - (b.id ?? 0) : a.date < b.date ? -1 : 1))

    const heat = { [KAYRA]: 0, [MAT]: 0 }
    const wins = { [KAYRA]: 0, [MAT]: 0 }
    const dayHeat = {} // date -> { kayra, mat }
    const seenGames = new Set()
    const seenDays = new Set()
    const results = []
    const log = []

    for (const r of games) {
      const res = resultOf(r)
      const mult = r.date === TOURNAMENT.finaleDate ? TOURNAMENT.finaleMultiplier : 1
      const gain = { [KAYRA]: 1, [MAT]: 1 } // participation
      if (WINNER_KEYS.includes(res)) { gain[res] += 3; wins[res]++ }
      else if (res === 'tie' || res === 'coop-win') { gain[KAYRA] += 2; gain[MAT] += 2 }
      if (!seenGames.has(r.gameId)) { seenGames.add(r.gameId); gain[KAYRA] += 2; gain[MAT] += 2 }
      if (!seenDays.has(r.date)) { seenDays.add(r.date); gain[KAYRA] += 2; gain[MAT] += 2 }

      dayHeat[r.date] ??= { [KAYRA]: 0, [MAT]: 0 }
      for (const p of WINNER_KEYS) {
        const pts = gain[p] * mult
        heat[p] += pts
        dayHeat[r.date][p] += pts
      }
      results.push(res)
      log.push({ round: r, res, gain: { [KAYRA]: gain[KAYRA] * mult, [MAT]: gain[MAT] * mult } })
    }

    const coupleHeat = heat[KAYRA] + heat[MAT]
    const tiers = HEAT_TIERS.map((t) => ({ ...t, unlocked: coupleHeat >= t.at }))

    // ── achievements: each returns the players who earned it ─────────────
    const both = (cond) => (cond ? WINNER_KEYS : [])
    const winsList = games.map((r, i) => ({ r, res: results[i] })).filter((x) => WINNER_KEYS.includes(x.res))
    const earned = {}

    earned.opening_move = both(games.length >= 1)
    earned.first_blood = games.length && WINNER_KEYS.includes(results[0]) ? [results[0]] : []
    earned.hat_trick = WINNER_KEYS.filter((p) => wins[p] >= 3)
    earned.sweep = WINNER_KEYS.filter((p) => {
      let run = 0
      return results.some((res) => {
        run = res === p ? run + 1 : 0
        return run >= 3
      })
    })
    earned.comeback = WINNER_KEYS.filter((p) => {
      const o = p === KAYRA ? MAT : KAYRA
      return results.some((res, i) => i > 0 && res === p && results[i - 1] === o)
    })
    // A day only counts once it's over (or the tournament has closed).
    const todayStr = new Date().toISOString().slice(0, 10)
    earned.daily_champ = WINNER_KEYS.filter((p) => {
      const o = p === KAYRA ? MAT : KAYRA
      return Object.entries(dayHeat).some(([d, h]) => d < todayStr && h[p] > h[o])
    })
    earned.supremacy = WINNER_KEYS.filter((p) =>
      games.some((r) =>
        (r.gameId === SEVEN_WONDERS || r.gameId === SEVEN_WONDERS_PANTHEON) &&
        r.winner === p && (r.winMethod === 'military' || r.winMethod === 'science'))
    )
    earned.variety = both(seenGames.size >= 4)
    earned.marathon = both(games.length >= 10)
    earned.perfect_landing = both(games.some((r) => r.gameId === SKYTEAM && resultOf(r) === 'coop-win'))
    earned.saturday_win = WINNER_KEYS.filter((p) =>
      winsList.some((x) => x.res === p && x.r.date === TOURNAMENT.finaleDate))

    const achievements = ACHIEVEMENTS.map((a) => ({ ...a, earnedBy: earned[a.id] ?? [] }))

    const leader = heat[KAYRA] === heat[MAT] ? 'tie' : heat[KAYRA] > heat[MAT] ? KAYRA : MAT

    return { games, log, heat, wins, coupleHeat, tiers, achievements, leader, dayHeat, gamesPlayed: seenGames.size }
  }, [rounds])
}
