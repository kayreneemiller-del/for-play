export default function Card({ children, className = '', gold = false, glow = false }) {
  return (
    <div
      className={`
        bg-surface rounded-2xl p-4
        ${gold ? 'border border-gold' : 'border border-white/10'}
        ${glow ? 'gold-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
