export default function PillButton({
  children,
  onClick,
  variant = 'gold',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const variants = {
    gold: 'bg-gold text-surface font-bold hover:brightness-110 active:scale-95 gold-glow',
    magenta: 'bg-magenta text-white font-bold hover:brightness-110 active:scale-95 magenta-glow',
    ghost: 'border border-white/30 text-cream hover:border-white/60 active:scale-95',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full px-6 py-3 text-sm transition-all duration-150
        ${variants[variant]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
