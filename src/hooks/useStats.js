import { useMemo } from 'react'
import { KAYRA, MAT } from '../constants/players'
import { WINGSPAN, WINGSPAN_POCKET, SPLENDOR, SKYTEAM, JAIPUR, PATCHWORK, LOST_CITIES, SEVEN_WONDERS, ONITAMA } from '../constants/games'

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

export function useStats(rounds, p1Name = 'Player 1', p2Name = 'Player 2', customGames = []) {
  return useMemo(() => {
    const wingspan = rounds.filter((r) => r.gameId === WINGSPAN)
    const wingspanPocket = rounds.filter((r) => r.gameId === WINGSPAN_POCKET)
    const splendor = rounds.filter((r) => r.gameId === SPLENDOR)
    const skyteam = rounds.filter((r) => r.gameId === SKYTEAM)
    const jaipur = rounds.filter((r) => r.gameId === JAIPUR)
    const patchwork = rounds.filter((r) => r.gameId === PATCHWORK)
    const lostCities = rounds.filter((r) => r.gameId === LOST_CITIES)
    const sevenWonders = rounds.filter((r) => r.gameId === SEVEN_WONDERS)
    const onitama = rounds.filter((r) => r.gameId === ONITAMA)

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

    // ── Wingspan Pocket ───────────────────────────────────────────────────
    const wpOutcomes = wingspanPocket.map((r) => r.outcome)
    const wpKayraWins = wpOutcomes.filter((o) => o === KAYRA).length
    const wpMatWins = wpOutcomes.filter((o) => o === MAT).length
    const wpTies = wpOutcomes.filter((o) => o === 'tie').length

    const allPocketScores = wingspanPocket.flatMap((r) =>
      [KAYRA, MAT].map((p) => ({ player: p, total: r.scores[p]?.total ?? 0, round: r }))
    )
    const highestPocketScore = allPocketScores.reduce(
      (best, s) => (s.total > (best?.total ?? -1) ? s : best),
      null
    )

    const wpKayraAvg = wingspanPocket.length
      ? Math.round(wingspanPocket.reduce((s, r) => s + (r.scores[KAYRA]?.total ?? 0), 0) / wingspanPocket.length)
      : null
    const wpMatAvg = wingspanPocket.length
      ? Math.round(wingspanPocket.reduce((s, r) => s + (r.scores[MAT]?.total ?? 0), 0) / wingspanPocket.length)
      : null

    const wpKayraStreak = streak(wpOutcomes, KAYRA)
    const wpMatStreak = streak(wpOutcomes, MAT)

    const wpMargins = wingspanPocket.map((r) =>
      Math.abs((r.scores[KAYRA]?.total ?? 0) - (r.scores[MAT]?.total ?? 0))
    )
    const wpClosestGame = wpMargins.length ? Math.min(...wpMargins) : null
    const wpBiggestBlowout = wpMargins.length ? Math.max(...wpMargins) : null

    const wpCategoryHighs = {}
    const wpCats = ['birds', 'eggs', 'tucked_cards', 'goals']
    for (const cat of wpCats) {
      let best = null
      for (const r of wingspanPocket) {
        for (const p of [KAYRA, MAT]) {
          const val = r.scores[p]?.[cat] ?? 0
          if (best === null || val > best.val) best = { val, player: p }
        }
      }
      if (best) wpCategoryHighs[cat] = best
    }

    const wingspanPocketLeader =
      wpKayraWins > wpMatWins ? KAYRA : wpMatWins > wpKayraWins ? MAT : 'tie'

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

    // ── New simple-score games ─────────────────────────────────────────────
    const jaipurKayraWins = jaipur.filter((r) => r.outcome === KAYRA).length
    const jaipurMatWins = jaipur.filter((r) => r.outcome === MAT).length
    const jaipurLeader = jaipurKayraWins > jaipurMatWins ? KAYRA : jaipurMatWins > jaipurKayraWins ? MAT : 'tie'

    const patchworkKayraWins = patchwork.filter((r) => r.outcome === KAYRA).length
    const patchworkMatWins = patchwork.filter((r) => r.outcome === MAT).length
    const patchworkLeader = patchworkKayraWins > patchworkMatWins ? KAYRA : patchworkMatWins > patchworkKayraWins ? MAT : 'tie'

    const lcKayraWins = lostCities.filter((r) => r.outcome === KAYRA).length
    const lcMatWins = lostCities.filter((r) => r.outcome === MAT).length
    const lcLeader = lcKayraWins > lcMatWins ? KAYRA : lcMatWins > lcKayraWins ? MAT : 'tie'

    const swKayraWins = sevenWonders.filter((r) => r.winner === KAYRA).length
    const swMatWins = sevenWonders.filter((r) => r.winner === MAT).length
    const swLeader = swKayraWins > swMatWins ? KAYRA : swMatWins > swKayraWins ? MAT : 'tie'

    const oniKayraWins = onitama.filter((r) => r.winner === KAYRA).length
    const oniMatWins = onitama.filter((r) => r.winner === MAT).length
    const oniLeader = oniKayraWins > oniMatWins ? KAYRA : oniMatWins > oniKayraWins ? MAT : 'tie'
    const oniMethodCounts = { stone: 0, stream: 0 }
    for (const r of onitama) {
      if (r.winMethod) oniMethodCounts[r.winMethod] = (oniMethodCounts[r.winMethod] || 0) + 1
    }

    // ── Custom games ──────────────────────────────────────────────────────
    const customStats = customGames.map((game) => {
      const gameId = `custom_${game.id}`
      const gameRounds = rounds.filter((r) => r.gameId === gameId)
      const kayraWins = gameRounds.filter((r) => r.outcome === KAYRA).length
      const matWins = gameRounds.filter((r) => r.outcome === MAT).length
      const leader = kayraWins > matWins ? KAYRA : matWins > kayraWins ? MAT : 'tie'
      return { game, total: gameRounds.length, kayraWins, matWins, leader }
    })

    // ── Cumulative For-Play Leader ─────────────────────────────────────────
    // All competitive rounds (all games except skyteam)
    const customCompRounds = rounds.filter((r) => r.gameId.startsWith('custom_'))
    const allCompRounds = [
      ...wingspan, ...wingspanPocket, ...splendor, ...jaipur, ...patchwork, ...lostCities, ...sevenWonders, ...onitama,
      ...customCompRounds,
    ]

    const totalKayraWins = wKayraWins + wpKayraWins + sKayraWins + jaipurKayraWins + patchworkKayraWins + lcKayraWins + swKayraWins + oniKayraWins
      + customStats.reduce((s, cs) => s + cs.kayraWins, 0)
    const totalMatWins = wMatWins + wpMatWins + sMatWins + jaipurMatWins + patchworkMatWins + lcMatWins + swMatWins + oniMatWins
      + customStats.reduce((s, cs) => s + cs.matWins, 0)
    const totalCompetitive = allCompRounds.length

    // cross-game current streak
    const allCompOutcomes = allCompRounds
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((r) => {
        if (r.gameId === WINGSPAN || r.gameId === WINGSPAN_POCKET || r.gameId === JAIPUR || r.gameId === PATCHWORK || r.gameId === LOST_CITIES || r.gameId.startsWith('custom_')) {
          return r.outcome
        }
        return r.winner
      })
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
      facts.push(`${p1Name} is on a ${kayraCurrentStreak}-game hot streak. Watch out, ${p2Name}.`)
    }
    if (matCurrentStreak >= 3) {
      facts.push(`${p2Name} is on a ${matCurrentStreak}-game hot streak. Watch out, ${p1Name}.`)
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
      facts.push(`${p1Name} tends to win Splendor Duel by ${favMethod(kayraMethodCounts)}. Noted.`)
    }
    if (favMethod(matMethodCounts)) {
      facts.push(`${p2Name} tends to win Splendor Duel by ${favMethod(matMethodCounts)}. Sneaky.`)
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
      facts.push("You're perfectly matched. The rivalry is officially tied.")
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
      wingspanPocket: {
        leader: wingspanPocketLeader,
        kayraWins: wpKayraWins,
        matWins: wpMatWins,
        ties: wpTies,
        total: wingspanPocket.length,
        highestScore: highestPocketScore,
        kayraAvg: wpKayraAvg,
        matAvg: wpMatAvg,
        kayraStreak: wpKayraStreak,
        matStreak: wpMatStreak,
        closestGame: wpClosestGame,
        biggestBlowout: wpBiggestBlowout,
        categoryHighs: wpCategoryHighs,
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
      jaipur: { total: jaipur.length, kayraWins: jaipurKayraWins, matWins: jaipurMatWins, leader: jaipurLeader },
      patchwork: { total: patchwork.length, kayraWins: patchworkKayraWins, matWins: patchworkMatWins, leader: patchworkLeader },
      lostCities: { total: lostCities.length, kayraWins: lcKayraWins, matWins: lcMatWins, leader: lcLeader },
      sevenWonders: { total: sevenWonders.length, kayraWins: swKayraWins, matWins: swMatWins, leader: swLeader },
      onitama: { total: onitama.length, kayraWins: oniKayraWins, matWins: oniMatWins, leader: oniLeader, methodCounts: oniMethodCounts },
      customStats,
      facts,
    }
  }, [rounds, p1Name, p2Name, customGames])
}
