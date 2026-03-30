import { KAYRA, PLAYER_LABELS } from '../../constants/players'

export default function LeaderHero({ overall }) {
  const { leader, kayraWins, matWins, total, kayraStreak, matStreak, lastPlayed } = overall

  const isTie = leader === 'tie'
  const leaderName = isTie ? null : PLAYER_LABELS[leader]
  const leaderWins = leader === KAYRA ? kayraWins : matWins
  const winPct = total > 0 ? Math.round((leaderWins / total) * 100) : 0
  const streak = leader === KAYRA ? kayraStreak : matStreak

  const lastPlayedLabel = (() => {
    if (!lastPlayed) return null
    const days = Math.floor((new Date() - new Date(lastPlayed)) / 86400000)
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  })()

  return (
    <div className="relative bg-surface rounded-2xl p-5 border-2 border-gold gold-glow-lg overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-shimmer rounded-2xl" />
      </div>

      <div className="relative z-10">
        <div className="text-xs text-gold/60 uppercase tracking-widest mb-2">For-Play Leader</div>

        {isTie ? (
          <div className="text-center py-3">
            <div className="text-4xl mb-2">⚖️</div>
            <div className="font-display text-2xl text-cream">
              It's a tie — no one rules the bedroom… yet.
            </div>
            <div className="text-cream/50 text-sm mt-2">
              {kayraWins}W – {matWins}W across {total} games
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <div className="text-4xl">👑</div>
              <div className="flex-1">
                <div className="font-display text-3xl text-gold">{leaderName}</div>
                <div className="text-cream/70 text-sm mt-1">
                  {leaderWins} wins out of {total} competitive games
                </div>
                <div className="text-cream/50 text-sm">{winPct}% win rate</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 flex-wrap">
              {streak >= 2 && (
                <div className="bg-gold/10 border border-gold/30 rounded-full px-3 py-1 text-xs text-gold">
                  🔥 {streak}-game streak
                </div>
              )}
              {lastPlayedLabel && (
                <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-cream/50">
                  Last played: {lastPlayedLabel}
                </div>
              )}
            </div>

            {/* Score bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-cream/50 mb-1">
                <span className="text-teal">Kayra {kayraWins}</span>
                <span className="text-magenta">Matt {matWins}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                {total > 0 && (
                  <>
                    <div
                      className="bg-teal transition-all duration-700"
                      style={{ width: `${(kayraWins / total) * 100}%` }}
                    />
                    <div
                      className="bg-magenta transition-all duration-700"
                      style={{ width: `${(matWins / total) * 100}%` }}
                    />
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {total === 0 && (
          <div className="text-center text-cream/40 text-sm mt-3">
            Log your first game to crown a leader!
          </div>
        )}
      </div>
    </div>
  )
}
