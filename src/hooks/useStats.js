import { useMemo } from 'react'
import { KAYRA, MAT, PLAYER_LABELS } from '../constants/players'
import { WINGSPAN, SPLENDOR, SKYTEAM } from '../constants/games'

function streak(results, value) {
  let max = 0
  let cur = 0
  for (const r of results) {
    if (r === value) { cur++; max = Math.max(max, cur) }
    else cur = 0
  }
  return max
}

function currentStreak(results, value) {
  let cur = 0
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i] === value) cur++
    else break
  }
  return cur
}

export function useStats(rounds) {
  return useMemo(() => {
    const wingspan = rounds.filter((r) => r.gameId === WINGSPAN)
    const splendor = rounds.filter((r) => r.gameId === SPLENDOR)
    const skyteam = rounds.filter((r) => r.gameId === SKYTEAM)

    // ── Wingspan ──────────────────────────────────────────────────────────
    const wOutcomes = wingspan.map((r) => r.outcome)
    const wKayraWins = wOutcomes.filter((o) => o === KAYRA).length
    const wMatWins = wOutcomes.filter((o) => o === MAT).length
    const wTies = wOutcomes.filter((o) => o === 'tie').length

    const allWingspanScores = wingspan.flatMap((r) =>
      [KAYRA, MAT].map((p) => ({ player: p, total: r.scores[p]?.total ?? 0, round: r }))
    )
    const highestWingspanScore = allWingspanScores.reduce(
      (best, s) => (s.total > (best?.total ?? -1) ? s : best),
      null
    )

    const kayraAvg = wingspan.length
      ? Math.round(wingspan.reduce((s, r) => s + (r.scores[KAYRA]?.total ?? 0), 0) / wingspan.length)
      : null
    const matAvg = wingspan.length
      ? Math.round(wingspan.reduce((s, r) => s + (r.scores[MAT]?.total ?? 0), 0) / wingspan.length)
      : null

    const kayraWingspanStreak = streak(wOutcomes, KAYRA)
    const matWingspanStreak = streak(wOutcomes, MAT)

    const margins = wingspan.map((r) =>
      Math.abs((r.scores[KAYRA]?.total ?? 0) - (r.scores[MAT]?.total ?? 0))
    )
    const closestGame = margins.length ? Math.min(...margins) : null
    const biggestBlowout = margins.length ? Math.max(...margins) : null

    // per-category highs
    const categoryHighs = {}
    const cats = ['birds', 'bonus_cards', 'round_goals', 'eggs', 'cached_food', 'tucked_cards', 'nectar', 'hummingbird']
    for (const cat of cats) {
      let best = null
      for (const r of wingspan) {
        for (const p of [KAYRA, MAT]) {
          const val = r.scores[p]?.[cat] ?? 0
          if (best === null || val > best.val) best = { val, player: p }
        }
      }
      if (best) categoryHighs[cat] = best
    }

    const wingspanLeader =
      wKayraWins > wMatWins ? KAYRA : wMatWins > wKayraWins ? MAT : 'tie'

    // ── Splendor Duel ─────────────────────────────────────────────────────
    const sKayraWins = splendor.filter((r) => r.winner === KAYRA).length
    const sMatWins = splendor.filter((r) => r.winner === MAT).length

    const methodCounts = { prestige: 0, crowns: 0, columns: 0 }
    const kayraMethodCounts = { prestige: 0, crowns: 0, columns: 0 }
    const matMethodCounts = { prestige: 0, crowns: 0, columns: 0 }
    for (const r of splendor) {
      if (r.winMethod) {
        methodCounts[r.winMethod] = (methodCounts[r.winMethod] || 0) + 1
        if (r.winner === KAYRA) kayraMethodCounts[r.winMethod]++
        else if (r.winner === MAT) matMethodCounts[r.winMethod]++
      }
    }

    const splendorMargins = splendor
      .filter((r) => r.winnerPoints != null && r.loserPoints != null)
      .map((r) => r.winnerPoints - r.loserPoints)
    const biggestSplendorMargin = splendorMargins.length ? Math.max(...splendorMargins) : null

    const favMethod = (counts) => {
      const entries = Object.entries(counts).filter(([, v]) => v > 0)
      if (!entries.length) return null
      return entries.sort((a, b) => b[1] - a[1])[0][0]
    }

    const splendorLeader =
      sKayraWins > sMatWins ? KAYRA : sMatWins > sKayraWins ? MAT : 'tie'

    // ── Sky Team ──────────────────────────────────────────────────────────
    const landings = skyteam.filter((r) => r.outcome === 'landed').length
    const crashes = skyteam.filter((r) => r.outcome === 'crashed').length
    const landingRate = skyteam.length ? Math.round((landings / skyteam.length) * 100) : null

    const skyOutcomes = skyteam.map((r) => r.outcome)
    const currentLandingStreak = currentStreak(skyOutcomes, 'landed')
    const longestLandingStreak = streak(skyOutcomes, 'landed')

    const difficultyOrder = ['green', 'yellow', 'red', 'black']
    const landedRounds = skyteam.filter((r) => r.outcome === 'landed')
    const hardestBeaten = landedRounds.reduce((best, r) => {
      const idx = difficultyOrder.indexOf(r.difficulty)
      if (idx > difficultyOrder.indexOf(best?.difficulty ?? '')) return r
      return best
    }, null)

    const mapCounts = {}
    for (const r of skyteam) {
      if (r.map) mapCounts[r.map] = (mapCounts[r.map] || 0) + 1
    }
    const favoriteMap = Object.entries(mapCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

    const crashByDiff = { green: 0, yellow: 0, red: 0, black: 0 }
    const totalByDiff = { green: 0, yellow: 0, red: 0, black: 0 }
    for (const r of skyteam) {
      if (r.difficulty) {
        totalByDiff[r.difficulty]++
        if (r.outcome === 'crashed') crashByDiff[r.difficulty]++
      }
    }

    // ── Cumulative For-Play Leader ─────────────────────────────────────────
    const compRounds = [...wingspan, ...splendor]
    const totalKayraWins = wKayraWins + sKayraWins
    const totalMatWins = wMatWins + sMatWins
    const totalCompetitive = compRounds.length

    // cross-game current streak
    const allCompOutcomes = compRounds
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((r) => (r.gameId === WINGSPAN ? r.outcome : r.winner))
    const kayraCurrentStreak = currentStreak(allCompOutcomes, KAYRA)
    const matCurrentStreak = currentStreak(allCompOutcomes, MAT)

    const overallLeader =
      totalKayraWins > totalMatWins
        ? KAYRA
        : totalMatWins > totalKayraWins
        ? MAT
        : 'tie'

    const lastPlayed =
      rounds.length
        ? rounds.slice().sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
        : null

    // ── Fun Facts ─────────────────────────────────────────────────────────
    const facts = []
    if (rounds.length >= 1) {
      facts.push(`You've played ${rounds.length} total game${rounds.length !== 1 ? 's' : ''} together.`)
    }
    if (kayraCurrentStreak >= 3) {
      facts.push(`${PLAYER_LABELS[KAYRA]} is on a ${kayraCurrentStreak}-game hot streak. Watch out, Mat.`)
    }
    if (matCurrentStreak >= 3) {
      facts.push(`${PLAYER_LABELS[MAT]} is on a ${matCurrentStreak}-game hot streak. Watch out, Kayra.`)
    }
    if (landingRate !== null) {
      facts.push(`You crash the plane ${100 - landingRate}% of the time. ${100 - landingRate > 50 ? 'Yikes.' : 'Not bad!'}`)
    }
    if (closestGame !== null && closestGame <= 3) {
      facts.push(`Your closest Wingspan game was decided by just ${closestGame} point${closestGame !== 1 ? 's' : ''}. Intense.`)
    }
    if (biggestBlowout !== null && biggestBlowout >= 20) {
      facts.push(`Biggest Wingspan blowout: ${biggestBlowout} points. Someone was on fire.`)
    }
    if (favMethod(kayraMethodCounts)) {
      facts.push(`${PLAYER_LABELS[KAYRA]} tends to win Splendor Duel by ${favMethod(kayraMethodCounts)}. Noted.`)
    }
    if (favMethod(matMethodCounts)) {
      facts.push(`${PLAYER_LABELS[MAT]} tends to win Splendor Duel by ${favMethod(matMethodCounts)}. Sneaky.`)
    }
    if (lastPlayed) {
      const days = Math.floor((new Date() - new Date(lastPlayed)) / 86400000)
      if (days === 0) facts.push("You played today! That's the good stuff.")
      else if (days === 1) facts.push('Last game was yesterday. Ready for another round?')
      else facts.push(`Last game was ${days} days ago. Time to play!`)
    }
    if (skyteam.length > 0 && favoriteMap) {
      facts.push(`Your go-to Sky Team map is ${favoriteMap}.`)
    }
    if (totalKayraWins === totalMatWins && totalCompetitive >= 4) {
      facts.push("You're perfectly matched. No one rules the bedroom… yet.")
    }

    return {
      overall: {
        leader: overallLeader,
        kayraWins: totalKayraWins,
        matWins: totalMatWins,
        total: totalCompetitive,
        kayraStreak: kayraCurrentStreak,
        matStreak: matCurrentStreak,
        lastPlayed,
      },
      wingspan: {
        leader: wingspanLeader,
        kayraWins: wKayraWins,
        matWins: wMatWins,
        ties: wTies,
        total: wingspan.length,
        highestScore: highestWingspanScore,
        kayraAvg,
        matAvg,
        kayraStreak: kayraWingspanStreak,
        matStreak: matWingspanStreak,
        closestGame,
        biggestBlowout,
        categoryHighs,
      },
      splendor: {
        leader: splendorLeader,
        kayraWins: sKayraWins,
        matWins: sMatWins,
        total: splendor.length,
        methodCounts,
        kayraFavMethod: favMethod(kayraMethodCounts),
        matFavMethod: favMethod(matMethodCounts),
        biggestMargin: biggestSplendorMargin,
      },
      skyteam: {
        total: skyteam.length,
        landings,
        crashes,
        landingRate,
        currentLandingStreak,
        longestLandingStreak,
        hardestBeaten,
        favoriteMap,
        crashByDiff,
        totalByDiff,
      },
      facts,
    }
  }, [rounds])
}
