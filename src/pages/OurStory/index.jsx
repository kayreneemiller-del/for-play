import { useStats } from '../../hooks/useStats'
import LeaderHero from './LeaderHero'
import HorseRace from './HorseRace'
import WingspanStats from './WingspanStats'
import SplendorStats from './SplendorStats'
import SkyTeamStats from './SkyTeamStats'
import FunFacts from './FunFacts'
import Accolades from './Accolades'

export default function OurStory({ rounds }) {
  const stats = useStats(rounds)

  return (
    <div className="px-4 pt-6 pb-4 mb-nav space-y-4">
      <div className="mb-2">
        <h1 className="font-display text-3xl text-gold">Our Story</h1>
        <p className="text-cream/60 text-sm mt-1">Kayra & Mat's game history</p>
      </div>

      <LeaderHero overall={stats.overall} />
      <HorseRace overall={stats.overall} />

      <FunFacts facts={stats.facts} />

      <WingspanStats stats={stats.wingspan} />
      <SplendorStats stats={stats.splendor} />
      <SkyTeamStats stats={stats.skyteam} />

      <Accolades rounds={rounds} stats={stats} />
    </div>
  )
}
