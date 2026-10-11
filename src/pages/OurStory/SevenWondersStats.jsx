import CollapsibleCard from '../../components/CollapsibleCard'
import { usePlayerLabels } from '../../context/CoupleContext'
import { SEVEN_WONDERS_CATEGORIES } from '../../constants/games'
import { KAYRA as KAYRA_KEY, MAT as MAT_KEY } from '../../constants/players'

const METHOD_LABELS = { military: '⚔️ Military', science: '🔬 Science', civilian: '🏛️ Civilian' }

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function SevenWondersStats({ stats }) {
  const playerLabels = usePlayerLabels()
  const { leader, kayraWins, matWins, ties, total, methodCounts, kayraMethods, matMethods,
    kayraAvg, matAvg, highestScore, categoryAvgs, categoryHighs,
    closestGame, biggestBlowout, kayraStreak, matStreak } = stats

  if (total === 0) return null

  const leaderLabel = leader === 'tie' ? 'Tied' : `${playerLabels[leader]} leads`
  const totalMethods = Object.values(methodCounts).reduce((s, v) => s + v, 0)

  return (
    <CollapsibleCard title="🏛️ 7 Wonders Duel" subtitle={`${leaderLabel} · ${total} rounds`}>
      <StatRow label="Record" value={`${playerLabels.kayra} ${kayraWins} – ${playerLabels.mat} ${matWins}${ties > 0 ? ` – ${ties}T` : ''}`} />
      {highestScore && (
        <StatRow label="Highest score ever" value={`${highestScore.total} by ${playerLabels[highestScore.player]}`} />
      )}
      {kayraAvg !== null && <StatRow label={`${playerLabels.kayra} avg score`} value={kayraAvg} />}
      {matAvg !== null && <StatRow label={`${playerLabels.mat} avg score`} value={matAvg} />}
      {kayraStreak > 1 && <StatRow label={`${playerLabels.kayra} best streak`} value={`${kayraStreak} wins`} />}
      {matStreak > 1 && <StatRow label={`${playerLabels.mat} best streak`} value={`${matStreak} wins`} />}
      {closestGame !== null && <StatRow label="Closest civilian game" value={`${closestGame} pt margin`} />}
      {biggestBlowout !== null && <StatRow label="Biggest civilian blowout" value={`${biggestBlowout} pts`} />}

      {totalMethods > 0 && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Win Methods</div>
          {Object.entries(methodCounts).map(([method, count]) => (
            <div key={method} className="py-1.5 border-b border-white/5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cream/70">{METHOD_LABELS[method]}</span>
                <span className="text-white font-medium">
                  {count} ({Math.round((count / totalMethods) * 100)}%)
                  <span className="text-cream/40 text-xs ml-2">
                    {playerLabels.kayra} {kayraMethods[method]} · {playerLabels.mat} {matMethods[method]}
                  </span>
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-magenta rounded-full transition-all duration-700"
                  style={{ width: `${(count / totalMethods) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {Object.keys(categoryAvgs).length > 0 && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Category Averages</div>
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 text-xs text-cream/50 pb-1">
            <span />
            <span className="w-12 text-center text-teal">{playerLabels.kayra}</span>
            <span className="w-12 text-center text-magenta">{playerLabels.mat}</span>
            <span className="w-20 text-right">High</span>
          </div>
          {SEVEN_WONDERS_CATEGORIES.filter((c) => categoryAvgs[c.key]).map((c) => {
            const high = categoryHighs[c.key]
            return (
              <div key={c.key} className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 py-1.5 border-b border-white/5 text-sm items-center">
                <span className="text-cream/70">{c.icon} {c.label}</span>
                <span className="w-12 text-center text-white tabular">{categoryAvgs[c.key][KAYRA_KEY] ?? '—'}</span>
                <span className="w-12 text-center text-white tabular">{categoryAvgs[c.key][MAT_KEY] ?? '—'}</span>
                <span className="w-20 text-right text-white/80 tabular">{high ? `${high.val} (${playerLabels[high.player]})` : '—'}</span>
              </div>
            )
          })}
        </div>
      )}
    </CollapsibleCard>
  )
}
