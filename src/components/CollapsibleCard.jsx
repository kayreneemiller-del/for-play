import { useState } from 'react'

export default function CollapsibleCard({ title, subtitle, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <div>
          <div className="text-base font-bold text-white">{title}</div>
          {subtitle && <div className="text-xs text-cream/60 mt-0.5">{subtitle}</div>}
        </div>
        <span className={`text-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  )
}
