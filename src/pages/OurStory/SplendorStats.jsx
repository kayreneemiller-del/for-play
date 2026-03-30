import CollapsibleCard from '../../components/CollapsibleCard'
import { PLAYER_LABELS } from '../../constants/players'

const METHOD_LABELS = { prestige: 'Prestige', crowns: 'Crowns', columns: 'Columns' }

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function SplendorStats({ stats }) {
  const { leader, kayraWins, matWins, total, methodCounts, kayraFavMethod, matFavMethod, biggestMargin } = stats

  const leaderLabel = leader === 'tie' ? 'Tied' : `${PLAYER_LABELS[leader]} leads`
  const totalMethods = Object.values(methodCounts).reduce((s, v) => s + v, 0)

  return (
    <CollapsibleCard title="💎 Splendor Duel" subtitle={`${leaderLabel} · ${total} rounds`}>
      <StatRow label="Record" value={`Kayra ${kayraWins} – Matt ${matWins}`} />
      {biggestMargin !== null && <StatRow label="Biggest margin" value={`${biggestMargin} pts`} />}
      {kayraFavMethod && <StatRow label="Kayra's go-to method" value={METHOD_LABELS[kayraFavMethod]} />}
      {matFavMethod && <StatRow label="Matt's go-to method" value={METHOD_LABELS[matFavMethod]} />}

      {totalMethods > 0 && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Win Methods</div>
          {Object.entries(methodCounts).map(([method, count]) => (
            <div key={method} className="py-1.5 border-b border-white/5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cream/70">{METHOD_LABELS[method]}</span>
                <span className="text-white font-medium">{count} ({totalMethods > 0 ? Math.round((count / totalMethods) * 100) : 0}%)</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-magenta rounded-full transition-all duration-700"
                  style={{ width: `${totalMethods > 0 ? (count / totalMethods) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {total === 0 && (
        <p className="text-cream/40 text-sm text-center py-2">No Splendor Duel games yet!</p>
      )}
    </CollapsibleCard>
  )
}
