import { useState } from 'react'
import { KAYRA, MAT } from '../../constants/players'
import { usePlayerLabels } from '../../context/CoupleContext'
import { GAME_CONFIG } from '../../constants/games'
import { TOURNAMENT, HEAT_RULES, GRAND_CHAMPION } from '../../constants/tournament'
import { useTournament, tournamentStatus, eachTournamentDay } from '../../hooks/useTournament'

const CLAIM_KEY = `forplay.claimed.${TOURNAMENT.id}`

function loadClaimed() {
  try { return new Set(JSON.parse(localStorage.getItem(CLAIM_KEY) ?? '[]')) } catch { return new Set() }
}

const fmtDay = (d) =>
  new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short' })

function fill(text, w, o) {
  return text.replaceAll('{w}', w).replaceAll('{o}', o)
}

function RewardCard({ emoji, name, hint, reward, unlocked, claimed, onClaim, badge }) {
  return (
    <div
      className={`rounded-2xl border p-3 ${
        unlocked ? 'border-magenta/60 bg-magenta/10' : 'border-white/10 bg-surface-2'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-3xl ${unlocked ? '' : 'grayscale opacity-40'}`}>{emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold ${unlocked ? 'text-white' : 'text-cream/50'}`}>{name}</span>
            {badge}
          </div>
          <div className="text-xs text-cream/50">{hint}</div>
          {unlocked ? (
            <div className="text-sm text-cream mt-2 leading-snug">{reward}</div>
          ) : (
            <div className="text-sm text-cream/30 mt-2 select-none blur-[3px]" aria-hidden="true">
              A little something wicked, sealed until you earn it.
            </div>
          )}
        </div>
      </div>
      {unlocked && (
        <button
          type="button"
          onClick={onClaim}
          className={`mt-3 w-full py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
            claimed ? 'bg-white/10 text-cream/50' : 'bg-gold text-surface'
          }`}
        >
          {claimed ? '✓ Redeemed' : 'Redeem 🔥'}
        </button>
      )}
    </div>
  )
}

export default function Tournament({ rounds }) {
  const names = usePlayerLabels()
  const t = useTournament(rounds)
  const status = tournamentStatus()
  const [claimed, setClaimed] = useState(loadClaimed)

  const toggleClaim = (id) =>
    setClaimed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      try { localStorage.setItem(CLAIM_KEY, JSON.stringify([...next])) } catch { /* ignore */ }
      return next
    })

  const total = Math.max(t.heat[KAYRA] + t.heat[MAT], 1)
  const kShare = (t.heat[KAYRA] / total) * 100
  const maxTier = t.tiers[t.tiers.length - 1].at
  const meter = Math.min((t.coupleHeat / maxTier) * 100, 100)
  const nextTier = t.tiers.find((x) => !x.unlocked)
  const days = eachTournamentDay()
  const grandWinner = status === 'finished' && t.leader !== 'tie' ? t.leader : null
  const other = (p) => (p === KAYRA ? names[MAT] : names[KAYRA])

  return (
    <div className="px-4 pt-6 pb-4 mb-nav space-y-4">
      <div>
        <div className="text-xs text-magenta uppercase tracking-widest">💍 Special Edition</div>
        <h1 className="font-display text-3xl text-gold">{TOURNAMENT.name}</h1>
        <p className="text-cream/60 text-sm mt-1">
          {TOURNAMENT.tagline} ·{' '}
          {status === 'live' ? '🔴 Live now' : status === 'upcoming' ? 'Starts soon' : 'Final results'}
        </p>
      </div>

      {/* Scoreboard */}
      <div className="bg-surface rounded-2xl border border-white/10 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-teal via-magenta to-gold" />
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            {[KAYRA, MAT].map((p) => (
              <div key={p} className={t.leader === p ? 'animate-racePulse rounded-xl' : ''}>
                <div className={`text-xs font-bold uppercase tracking-wide ${p === KAYRA ? 'text-teal' : 'text-magenta'}`}>
                  {t.leader === p && '👑 '}{names[p]}
                </div>
                <div className="text-5xl font-mono font-bold text-white tabular">{t.heat[p]}</div>
                <div className="text-xs text-cream/50">🔥 heat · {t.wins[p]} wins</div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-3 rounded-full overflow-hidden bg-white/10 flex">
            <div className="bg-teal transition-all duration-700" style={{ width: `${t.coupleHeat ? kShare : 50}%` }} />
            <div className="bg-magenta flex-1" />
          </div>
          <div className="text-center text-xs text-cream/50 mt-2">
            {t.leader === 'tie'
              ? t.coupleHeat ? 'Dead heat. Anyone\'s game.' : 'Log a game to start the heat.'
              : `${names[t.leader]} leads by ${Math.abs(t.heat[KAYRA] - t.heat[MAT])}`}
          </div>
        </div>
      </div>

      {/* Day strip */}
      <div className="grid grid-cols-4 gap-2">
        {days.map((d) => {
          const h = t.dayHeat[d]
          const finale = d === TOURNAMENT.finaleDate
          return (
            <div key={d} className={`rounded-xl border p-2 text-center ${finale ? 'border-gold/60 bg-gold/10' : 'border-white/10 bg-surface'}`}>
              <div className="text-xs text-cream/60">{fmtDay(d)}{finale && ' ×2'}</div>
              <div className="text-sm font-mono tabular mt-1">
                <span className="text-teal">{h?.[KAYRA] ?? 0}</span>
                <span className="text-cream/30"> · </span>
                <span className="text-magenta">{h?.[MAT] ?? 0}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Heat meter */}
      <div className="bg-surface rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gold/60 uppercase tracking-widest">Couple Heat Meter</div>
          <div className="text-xs text-cream/50">{t.coupleHeat} 🔥 together</div>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-1">
          <div className="h-full bg-gradient-to-r from-gold via-magenta to-red-500 transition-all duration-700" style={{ width: `${meter}%` }} />
        </div>
        <div className="text-xs text-cream/40 mb-3">
          {nextTier ? `${nextTier.at - t.coupleHeat} more heat to unlock ${nextTier.name} ${nextTier.emoji}` : 'Inferno reached. Behave. Or don\'t.'}
        </div>
        <div className="space-y-2">
          {t.tiers.map((tier) => (
            <RewardCard
              key={tier.id}
              emoji={tier.emoji}
              name={tier.name}
              hint={`${tier.at} combined heat`}
              reward={tier.reward}
              unlocked={tier.unlocked}
              claimed={claimed.has(tier.id)}
              onClaim={() => toggleClaim(tier.id)}
            />
          ))}
        </div>
      </div>

      {/* Grand champion */}
      <RewardCard
        emoji={GRAND_CHAMPION.emoji}
        name={GRAND_CHAMPION.name}
        hint={GRAND_CHAMPION.hint}
        reward={grandWinner ? fill(GRAND_CHAMPION.reward, names[grandWinner], other(grandWinner)) : ''}
        unlocked={!!grandWinner}
        claimed={claimed.has('grand')}
        onClaim={() => toggleClaim('grand')}
        badge={grandWinner && <span className="text-xs text-gold">👑 {names[grandWinner]}</span>}
      />

      {/* Achievements */}
      <div className="bg-surface rounded-2xl border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gold/60 uppercase tracking-widest">Naughty-or-Nice Achievements</div>
          <div className="text-xs text-cream/40">
            {t.achievements.filter((a) => a.earnedBy.length).length} / {t.achievements.length}
          </div>
        </div>
        <div className="space-y-2">
          {t.achievements.map((a) => {
            const unlocked = a.earnedBy.length > 0
            // If both players earned a player-scoped award, show both rewards.
            const rewards = a.earnedBy.map((p) =>
              a.scope === 'both' ? a.reward : fill(a.reward, names[p], other(p)))
            const uniq = [...new Set(rewards)]
            return (
              <RewardCard
                key={a.id}
                emoji={a.emoji}
                name={a.name}
                hint={a.hint}
                reward={uniq.map((r, i) => <div key={i} className={i ? 'mt-1.5' : ''}>{r}</div>)}
                unlocked={unlocked}
                claimed={claimed.has(a.id)}
                onClaim={() => toggleClaim(a.id)}
                badge={
                  unlocked && a.scope === 'player' && (
                    <span className="text-xs text-gold">
                      {a.earnedBy.map((p) => names[p]).join(' & ')}
                    </span>
                  )
                }
              />
            )
          })}
        </div>
      </div>

      {/* Rules */}
      <div className="bg-surface rounded-2xl border border-white/10 p-4">
        <div className="text-xs text-gold/60 uppercase tracking-widest mb-3">How Heat Works</div>
        {HEAT_RULES.map((r) => (
          <div key={r.label} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
            <span className="text-lg">{r.icon}</span>
            <span className="flex-1 text-sm text-cream/80">{r.label}</span>
            <span className="text-sm text-gold font-bold">{r.pts}</span>
          </div>
        ))}
        <p className="text-xs text-cream/40 mt-3">
          Games logged {TOURNAMENT.start} through {TOURNAMENT.end} count automatically. Just log them like normal on the 🎲 tab.
        </p>
      </div>

      {/* Game log */}
      {t.log.length > 0 && (
        <div className="bg-surface rounded-2xl border border-white/10 p-4">
          <div className="text-xs text-gold/60 uppercase tracking-widest mb-3">Tournament Log</div>
          {t.log.slice().reverse().map(({ round, res, gain }, i) => (
            <div key={round.id ?? i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0 text-sm">
              <span>{GAME_CONFIG[round.gameId]?.emoji ?? '🎯'}</span>
              <span className="flex-1 text-cream/80 truncate">
                {GAME_CONFIG[round.gameId]?.label ?? 'Custom game'}
                <span className="text-cream/40"> · {res === 'tie' ? 'Tie' : res === 'coop-win' ? 'Team win' : res === 'coop-loss' ? 'Team loss' : `${names[res]} won`}</span>
              </span>
              <span className="text-xs font-mono tabular"><span className="text-teal">+{gain[KAYRA]}</span> <span className="text-magenta">+{gain[MAT]}</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
