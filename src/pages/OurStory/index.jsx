import { useStats } from '../../hooks/useStats'
import { useCouple, usePlayerLabels } from '../../context/CoupleContext'
import LeaderHero from './LeaderHero'
import HorseRace from './HorseRace'
import WingspanStats from './WingspanStats'
import SplendorStats from './SplendorStats'
import SkyTeamStats from './SkyTeamStats'
import FunFacts from './FunFacts'
import Accolades from './Accolades'
import CollapsibleCard from '../../components/CollapsibleCard'

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5">
      <span className="text-sm text-cream/70">{label}</span>
      <span className="text-sm text-white font-medium tabular">{value ?? '—'}</span>
    </div>
  )
}

export default function OurStory({ rounds, customGames }) {
  const { profile } = useCouple()
  const playerLabels = usePlayerLabels()
  const p1Name = profile?.player1 ?? 'Player 1'
  const p2Name = profile?.player2 ?? 'Player 2'
  const stats = useStats(rounds, p1Name, p2Name, customGames)

  return (
    <div className="px-4 pt-6 pb-4 mb-nav space-y-4">
      <div className="mb-2">
        <h1 className="font-display text-3xl text-gold">Our Story</h1>
        <p className="text-cream/60 text-sm mt-1">{p1Name} & {p2Name}'s game history</p>
      </div>

      <LeaderHero overall={stats.overall} />
      <HorseRace overall={stats.overall} />

      <FunFacts facts={stats.facts} />

      <WingspanStats stats={stats.wingspan} />
      <SplendorStats stats={stats.splendor} />
      <SkyTeamStats stats={stats.skyteam} />

      {stats.jaipur.total > 0 && (
        <CollapsibleCard title="🐪 Jaipur" subtitle={`${stats.jaipur.leader === 'tie' ? 'Tied' : `${playerLabels[stats.jaipur.leader]} leads`} · ${stats.jaipur.total} rounds`}>
          <StatRow label="Record" value={`${p1Name} ${stats.jaipur.kayraWins} – ${p2Name} ${stats.jaipur.matWins}`} />
        </CollapsibleCard>
      )}
      {stats.patchwork.total > 0 && (
        <CollapsibleCard title="🧵 Patchwork" subtitle={`${stats.patchwork.leader === 'tie' ? 'Tied' : `${playerLabels[stats.patchwork.leader]} leads`} · ${stats.patchwork.total} rounds`}>
          <StatRow label="Record" value={`${p1Name} ${stats.patchwork.kayraWins} – ${p2Name} ${stats.patchwork.matWins}`} />
        </CollapsibleCard>
      )}
      {stats.lostCities.total > 0 && (
        <CollapsibleCard title="🗺️ Lost Cities" subtitle={`${stats.lostCities.leader === 'tie' ? 'Tied' : `${playerLabels[stats.lostCities.leader]} leads`} · ${stats.lostCities.total} rounds`}>
          <StatRow label="Record" value={`${p1Name} ${stats.lostCities.kayraWins} – ${p2Name} ${stats.lostCities.matWins}`} />
        </CollapsibleCard>
      )}
      {stats.sevenWonders.total > 0 && (
        <CollapsibleCard title="🏛️ 7 Wonders Duel" subtitle={`${stats.sevenWonders.leader === 'tie' ? 'Tied' : `${playerLabels[stats.sevenWonders.leader]} leads`} · ${stats.sevenWonders.total} rounds`}>
          <StatRow label="Record" value={`${p1Name} ${stats.sevenWonders.kayraWins} – ${p2Name} ${stats.sevenWonders.matWins}`} />
        </CollapsibleCard>
      )}

      {stats.customStats.map(({ game, total, kayraWins, matWins, leader }) => (
        total > 0 && (
          <CollapsibleCard key={game.id} title={`${game.emoji ?? '🎯'} ${game.name}`} subtitle={`${leader === 'tie' ? 'Tied' : `${playerLabels[leader]} leads`} · ${total} rounds`}>
            <StatRow label="Record" value={`${p1Name} ${kayraWins} – ${p2Name} ${matWins}`} />
          </CollapsibleCard>
        )
      ))}

      <Accolades rounds={rounds} stats={stats} />
    </div>
  )
}
