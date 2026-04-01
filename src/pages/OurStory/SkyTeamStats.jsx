import CollapsibleCard from '../../components/CollapsibleCard'
import { usePlayerLabels } from '../../context/CoupleContext'

const DIFF_LABELS = { green: '🟢 Green', yellow: '🟡 Yellow', red: '🔴 Red', black: '⚫ Black' }
const DIFF_ORDER = ['green', 'yellow', 'red', 'black']

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function SkyTeamStats({ stats }) {
  const playerLabels = usePlayerLabels()
  const { total, landings, crashes, landingRate, currentLandingStreak,
    longestLandingStreak, hardestBeaten, favoriteMap, crashByDiff, totalByDiff } = stats

  const hasDiffData = DIFF_ORDER.some((d) => totalByDiff[d] > 0)

  return (
    <CollapsibleCard title="✈️ Sky Team" subtitle={`${playerLabels.kayra} & ${playerLabels.mat} · ${total} sessions`}>
      <StatRow
        label="Landings / Crashes"
        value={`${landings} ✅ / ${crashes} 💥${landingRate !== null ? ` (${landingRate}%)` : ''}`}
      />
      {currentLandingStreak > 0 && (
        <StatRow label="Current landing streak" value={`${currentLandingStreak} in a row`} />
      )}
      {longestLandingStreak > 0 && (
        <StatRow label="Best landing streak ever" value={`${longestLandingStreak} in a row`} />
      )}
      {hardestBeaten && (
        <StatRow
          label="Hardest map beaten"
          value={`${DIFF_LABELS[hardestBeaten.difficulty]} — ${hardestBeaten.map}`}
        />
      )}
      {favoriteMap && <StatRow label="Favorite map" value={favoriteMap} />}

      {hasDiffData && (
        <div className="pt-2">
          <div className="text-xs text-gold/60 uppercase tracking-wider mb-2">Crash Rate by Difficulty</div>
          {DIFF_ORDER.filter((d) => totalByDiff[d] > 0).map((d) => {
            const rate = Math.round((crashByDiff[d] / totalByDiff[d]) * 100)
            return (
              <div key={d} className="py-1.5 border-b border-white/5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cream/70">{DIFF_LABELS[d]}</span>
                  <span className="text-white font-medium">{rate}% crash ({crashByDiff[d]}/{totalByDiff[d]})</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-red rounded-full transition-all duration-700"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {total === 0 && (
        <p className="text-cream/40 text-sm text-center py-2">No Sky Team sessions yet!</p>
      )}
    </CollapsibleCard>
  )
}
