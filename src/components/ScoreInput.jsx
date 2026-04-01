export default function ScoreInput({ label, value, onChange, allowNegative = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs text-cream/70 uppercase tracking-wider">{label}</label>
      )}
      <input
        type="text"
        inputMode={allowNegative ? 'text' : 'numeric'}
        pattern={allowNegative ? '[\\-0-9]*' : '[0-9]*'}
        value={value === null || value === undefined ? '' : value}
        onChange={(e) => {
          const raw = allowNegative
            ? e.target.value.replace(/[^0-9\-]/g, '').replace(/(?!^)-/g, '')
            : e.target.value.replace(/[^0-9]/g, '')
          onChange(raw === '' || raw === '-' ? null : parseInt(raw, 10))
        }}
        className="
          bg-surface-2 border border-white/20 rounded-lg px-3 py-3
          text-2xl font-mono tabular text-white text-center
          focus:outline-none focus:border-gold focus:gold-glow
          w-full min-h-[3rem]
        "
      />
    </div>
  )
}
