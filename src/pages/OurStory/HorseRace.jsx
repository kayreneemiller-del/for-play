import { KAYRA, MAT } from '../../constants/players'
import { useCouple, usePlayerLabels } from '../../context/CoupleContext'
import { getDateNights } from '../../constants/dateNights'

function trackLeft(progress) {
  return `${12 + (progress / RACE_GOAL) * 76}%`
}

function Lane({ name, progress, wins, color, emoji }) {
  const displayProgress = wins > 0 && progress === 0 ? RACE_GOAL : progress
  const atFinish = displayProgress === RACE_GOAL

  return (
    <div
      className="relative h-14 rounded-xl mb-2 overflow-hidden border"
      style={{ background: `${color}0A`, borderColor: `${color}35` }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${color}22 0px, ${color}22 1px, transparent 1px, transparent 38px)`,
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 border-t border-dashed border-white/10"
        style={{ left: '12%', right: '8%' }}
      />
      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wide" style={{ color }}>
        {name}
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg leading-none">🏁</div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out"
        style={{ left: trackLeft(displayProgress) }}
      >
        <span className={`block text-2xl leading-none ${atFinish ? '' : 'animate-trot'}`}>
          {atFinish ? '🎉' : emoji}
        </span>
      </div>
    </div>
  )
}

export default function HorseRace({ overall }) {
  const { profile } = useCouple()
  const playerLabels = usePlayerLabels()
  const { kayraWins, matWins } = overall

  const RACE_GOAL = profile?.raceGoal ?? 5
  const p1Name = playerLabels[KAYRA]
  const p2Name = playerLabels[MAT]

  const kayraProgress = kayraWins % RACE_GOAL
  const matProgress = matWins % RACE_GOAL
  const kayraRacesWon = Math.floor(kayraWins / RACE_GOAL)
  const matRacesWon = Math.floor(matWins / RACE_GOAL)

  const totalRacesFinished = kayraRacesWon + matRacesWon
  const prizes = getDateNights(p1Name, p2Name)
  const prize = prizes[totalRacesFinished % prizes.length]

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
      <div className="h-1.5 bg-gradient-to-r from-teal via-gold to-magenta" />

      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <span className="text-2xl">🏇</span>
        <div className="flex-1">
          <div className="font-display text-xl text-gold leading-tight">Date Night Race</div>
          <div className="text-cream/50 text-xs">First to {RACE_GOAL} competitive wins</div>
        </div>
        {totalRacesFinished > 0 && (
          <div className="flex flex-col items-end gap-0.5 text-xs">
            {kayraRacesWon > 0 && (
              <span className="text-teal">
                {'🏆'.repeat(Math.min(kayraRacesWon, 5))} {p1Name} ×{kayraRacesWon}
              </span>
            )}
            {matRacesWon > 0 && (
              <span className="text-magenta">
                {'🏆'.repeat(Math.min(matRacesWon, 5))} {p2Name} ×{matRacesWon}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-gold/25 animate-racePulse">
        <div className="bg-gold/10 px-3 py-1.5 text-center">
          <span className="text-gold text-xs uppercase tracking-widest font-bold">🎰 Prize at Stake</span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div className="p-3">
            <div className="text-teal text-xs font-bold uppercase tracking-wide mb-1">{p1Name} wins →</div>
            <div className="text-cream text-sm leading-snug">{prize.p1Wins}</div>
          </div>
          <div className="p-3">
            <div className="text-magenta text-xs font-bold uppercase tracking-wide mb-1">{p2Name} wins →</div>
            <div className="text-cream text-sm leading-snug">{prize.p2Wins}</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="relative h-5 mb-1">
          {Array.from({ length: RACE_GOAL + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 text-xs text-cream/30"
              style={{ left: `${12 + (i / RACE_GOAL) * 76}%` }}
            >
              {i === 0 ? '🚦' : i === RACE_GOAL ? '🏁' : i}
            </div>
          ))}
        </div>

        <Lane name={p1Name} progress={kayraProgress} wins={kayraWins} color="#00F5D4" emoji="🐴" />
        <Lane name={p2Name} progress={matProgress} wins={matWins} color="#FF2D78" emoji="🐎" />

        <div className="flex justify-between text-xs text-cream/40 mt-1 px-1">
          <span className="text-teal">{kayraProgress}/{RACE_GOAL} wins</span>
          <span className="text-magenta">{matProgress}/{RACE_GOAL} wins</span>
        </div>

        {kayraWins + matWins === 0 && (
          <div className="text-center text-cream/40 text-xs mt-3">
            Your first race is waiting… log a game to start! 🎲
          </div>
        )}
      </div>
    </div>
  )
}
