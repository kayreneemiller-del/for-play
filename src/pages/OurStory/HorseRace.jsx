import { DATE_NIGHTS } from '../../constants/dateNights'

const RACE_GOAL = 5

// Maps progress (0–RACE_GOAL) to a left% within the track area (12%–88%)
function trackLeft(progress) {
  return `${12 + (progress / RACE_GOAL) * 76}%`
}

function Lane({ name, progress, wins, color, emoji }) {
  // If they've just completed a race (wins > 0 && progress === 0), show at finish
  const displayProgress = wins > 0 && progress === 0 ? RACE_GOAL : progress
  const atFinish = displayProgress === RACE_GOAL

  return (
    <div
      className="relative h-14 rounded-xl mb-2 overflow-hidden border"
      style={{
        background: `${color}0A`,
        borderColor: `${color}35`,
      }}
    >
      {/* Subtle lane stripes */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${color}22 0px, ${color}22 1px, transparent 1px, transparent 38px)`,
        }}
      />

      {/* Dotted center line */}
      <div
        className="absolute top-1/2 -translate-y-1/2 border-t border-dashed border-white/10"
        style={{ left: '12%', right: '8%' }}
      />

      {/* Player name */}
      <div
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wide"
        style={{ color }}
      >
        {name}
      </div>

      {/* Finish line */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg leading-none">🏁</div>

      {/* Horse */}
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
  const { kayraWins, matWins } = overall

  if (kayraWins + matWins === 0) return null

  const kayraProgress = kayraWins % RACE_GOAL
  const matProgress = matWins % RACE_GOAL
  const kayraRacesWon = Math.floor(kayraWins / RACE_GOAL)
  const matRacesWon = Math.floor(matWins / RACE_GOAL)

  const totalRacesFinished = kayraRacesWon + matRacesWon
  const prize = DATE_NIGHTS[totalRacesFinished % DATE_NIGHTS.length]

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-white/10">
      {/* Carnival bunting bar */}
      <div className="h-1.5 bg-gradient-to-r from-teal via-gold to-magenta" />

      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <span className="text-2xl">🏇</span>
        <div className="flex-1">
          <div className="font-display text-xl text-gold leading-tight">Date Night Race</div>
          <div className="text-cream/50 text-xs">First to {RACE_GOAL} competitive wins</div>
        </div>
        {/* Past race trophies */}
        {totalRacesFinished > 0 && (
          <div className="flex flex-col items-end gap-0.5 text-xs">
            {kayraRacesWon > 0 && (
              <span className="text-teal">
                {'🏆'.repeat(Math.min(kayraRacesWon, 5))} Kayra ×{kayraRacesWon}
              </span>
            )}
            {matRacesWon > 0 && (
              <span className="text-magenta">
                {'🏆'.repeat(Math.min(matRacesWon, 5))} Mat ×{matRacesWon}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Prize at stake */}
      <div className="mx-4 mb-3 rounded-xl overflow-hidden border border-gold/25 animate-racePulse">
        <div className="bg-gold/10 px-3 py-1.5 text-center">
          <span className="text-gold text-xs uppercase tracking-widest font-bold">🎰 Prize at Stake</span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div className="p-3">
            <div className="text-teal text-xs font-bold uppercase tracking-wide mb-1">Kayra wins →</div>
            <div className="text-cream text-sm leading-snug">{prize.kayraWins}</div>
          </div>
          <div className="p-3">
            <div className="text-magenta text-xs font-bold uppercase tracking-wide mb-1">Mat wins →</div>
            <div className="text-cream text-sm leading-snug">{prize.matWins}</div>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="px-4 pb-4">
        {/* Step markers */}
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

        <Lane
          name="Kayra"
          progress={kayraProgress}
          wins={kayraWins}
          color="#00F5D4"
          emoji="🐴"
        />
        <Lane
          name="Mat"
          progress={matProgress}
          wins={matWins}
          color="#FF2D78"
          emoji="🐎"
        />

        {/* Win counts below track */}
        <div className="flex justify-between text-xs text-cream/40 mt-1 px-1">
          <span className="text-teal">{kayraProgress}/{RACE_GOAL} wins</span>
          <span className="text-magenta">{matProgress}/{RACE_GOAL} wins</span>
        </div>
      </div>
    </div>
  )
}
