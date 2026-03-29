import { useEffect, useState } from 'react'

export default function WinnerBurst({ winner, outcome, onDone }) {
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 1800)
    const t2 = setTimeout(() => onDone?.(), 2300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  const isLanded = outcome === 'landed'
  const isCrashed = outcome === 'crashed'
  const isCoop = isLanded || isCrashed

  const emoji = isCrashed ? '💥' : isLanded ? '🛬' : '🏆'
  const color = isCrashed ? 'text-neon-red' : isLanded ? 'text-neon-green' : 'text-gold'
  const bgColor = isCrashed ? 'bg-neon-red/20' : isLanded ? 'bg-neon-green/20' : 'bg-gold/20'
  const message = isCrashed
    ? 'Mayday! Mayday!'
    : isLanded
    ? 'The Dotsons land safely! ✈️'
    : `${winner} wins! 🎉`

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        transition-opacity duration-500
        ${phase === 'out' ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className={`${bgColor} border border-white/20 rounded-3xl p-10 text-center animate-burst`}>
        <div className="text-7xl mb-4">{emoji}</div>
        <div className={`font-display text-3xl ${color} mb-2`}>{message}</div>
        {!isCoop && (
          <div className="text-cream/60 text-sm">Round saved!</div>
        )}
      </div>
    </div>
  )
}
