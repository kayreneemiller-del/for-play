export default function FunFacts({ facts }) {
  if (!facts || facts.length === 0) return null

  return (
    <div className="bg-surface rounded-2xl border border-teal/20 p-4 space-y-2">
      <div className="text-xs text-teal/60 uppercase tracking-widest mb-3">Fun Facts</div>
      {facts.map((fact, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-cream/80">
          <span className="text-teal mt-0.5">✦</span>
          <span>{fact}</span>
        </div>
      ))}
    </div>
  )
}
