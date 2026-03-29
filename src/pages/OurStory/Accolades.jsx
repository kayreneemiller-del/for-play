import BadgeChip from '../../components/BadgeChip'
import { ACCOLADES } from '../../constants/accolades'

export default function Accolades({ rounds, stats }) {
  const unlockedCount = ACCOLADES.filter((a) => a.unlock({ rounds, stats })).length

  return (
    <div className="bg-surface rounded-2xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-gold/60 uppercase tracking-widest">Accolades</div>
        <div className="text-xs text-cream/40">{unlockedCount} / {ACCOLADES.length} unlocked</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {ACCOLADES.map((a) => (
          <BadgeChip
            key={a.id}
            accolade={a}
            unlocked={a.unlock({ rounds, stats })}
          />
        ))}
      </div>
    </div>
  )
}
