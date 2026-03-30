import CollapsibleCard from '../../components/CollapsibleCard'
import { PLAYER_LABELS } from '../../constants/players'

const CAT_LABELS = {
  birds: 'Birds', bonus_cards: 'Bonus Cards', round_goals: 'Round Goals',
  eggs: 'Eggs', cached_food: 'Cached Food', tucked_cards: 'Tucked Cards',
  nectar: 'Nectar', hummingbird: 'Hummingbird',
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function WingspanStats({ stats }) {
  const { leader, kayraWins, matWins, ties, total, highestScore, kayraAvg, matAvg,
    kayraStreak, matStreak, closestGame, biggestBlowout, categoryHighs } = stats

  const leaderLabel = leader === 'tie' ? 'Tied' : `${PLAYER_LABELS[leader]} leads`

  return (
    <CollapsibleCard title="🦅 Wingspan Americas" subtitle={`${leaderLabel} · ${total} rounds`}>
      <StatRow label="Kayra wins" value={`${kayraWins}W / ${matWins}W${ties > 0 ? ` / ${ties}T` : ''}`} />
      {highestScore && (
        <StatRow
          label="Highest score ever"
          value={`${highestScore.total} by ${PLAYER_LABELS[highestScore.player]}`}
        />
      )}
      {kayraAvg !== null && <StatRow label="Kayra avg score" value={kayraAvg} />}
      {matAvg !== null && <StatRow label="Matt avg score" value={matAvg} />}
      {kayraStreak > 1 && <StatRow label="Kayra best streak" value={`${kayraStreak} wins`} />}
      {matStreak > 1 && <StatRow label="Matt best streak" value={`${matStreak} wins`} />}
      {closestGame !== null && <StatRow label="Closest game" value={`${closestGame} pt margin`} />}
      {biggestBlowout !== null && <StatRow label="Biggest blowout" value={`${biggestBlowout} pts`} />}

      {Object.entries(categoryHighs).some(([, v]) => v) && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Category Highs</div>
          {Object.entries(categoryHighs).map(([cat, best]) =>
            best ? (
              <StatRow
                key={cat}
                label={CAT_LABELS[cat] ?? cat}
                value={`${best.val} by ${PLAYER_LABELS[best.player]}`}
              />
            ) : null
          )}
        </div>
      )}

      {total === 0 && (
        <p className="text-cream/40 text-sm text-center py-2">No Wingspan games yet!</p>
      )}
    </CollapsibleCard>
  )
}
