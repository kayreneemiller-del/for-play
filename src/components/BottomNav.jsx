export default function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'log', label: 'Log Game', icon: '🎲' },
    { id: 'story', label: 'Our Story', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-white/10 pb-safe">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              flex-1 flex flex-col items-center justify-center py-3 gap-0.5
              transition-colors duration-150 relative
              ${active === tab.id ? 'text-gold' : 'text-white/40'}
            `}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {active === tab.id && (
              <div className="absolute bottom-0 w-12 h-0.5 bg-gold rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
