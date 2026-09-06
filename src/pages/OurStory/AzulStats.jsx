import CollapsibleCard from '../../components/CollapsibleCard'
import { usePlayerLabels } from '../../context/CoupleContext'
import { KAYRA, MAT } from '../../constants/players'

const CAT_LABELS = {
  track: 'Score Track', rows: 'Full Rows', columns: 'Full Columns', colors: 'Color Sets',
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function AzulStats({ stats }) {
  const playerLabels = usePlayerLabels()
  const { leader, kayraWins, matWins, ties, total, highestScore, kayraAvg, matAvg,
    kayraStreak, matStreak, closestGame, biggestBlowout, categoryHighs, tiebreakWins } = stats

  const leaderLabel = leader === 'tie' ? 'Tied' : `${playerLabels[leader]} leads`

  return (
    <CollapsibleCard title="🔷 Azul" subtitle={`${leaderLabel} · ${total} rounds`}>
      <StatRow label="Record" value={`${kayraWins}W / ${matWins}W${ties > 0 ? ` / ${ties}T` : ''}`} />
      {highestScore && (
        <StatRow
          label="Highest score ever"
          value={`${highestScore.total} by ${playerLabels[highestScore.player]}`}
        />
      )}
      {kayraAvg !== null && <StatRow label={`${playerLabels[KAYRA]} avg score`} value={kayraAvg} />}
      {matAvg !== null && <StatRow label={`${playerLabels[MAT]} avg score`} value={matAvg} />}
      {kayraStreak > 1 && <StatRow label={`${playerLabels[KAYRA]} best streak`} value={`${kayraStreak} wins`} />}
      {matStreak > 1 && <StatRow label={`${playerLabels[MAT]} best streak`} value={`${matStreak} wins`} />}
      {closestGame !== null && <StatRow label="Closest game" value={`${closestGame} pt margin`} />}
      {biggestBlowout !== null && <StatRow label="Biggest blowout" value={`${biggestBlowout} pts`} />}
      {tiebreakWins > 0 && <StatRow label="Won on the row tiebreaker" value={tiebreakWins} />}

      {Object.entries(categoryHighs).some(([, v]) => v) && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Category Highs</div>
          {Object.entries(categoryHighs).map(([cat, best]) =>
            best ? (
              <StatRow
                key={cat}
                label={CAT_LABELS[cat] ?? cat}
                value={`${best.val} by ${playerLabels[best.player]}`}
              />
            ) : null
          )}
        </div>
      )}

      {total === 0 && (
        <p className="text-cream/40 text-sm text-center py-2">No Azul games yet!</p>
      )}
    </CollapsibleCard>
  )
}
