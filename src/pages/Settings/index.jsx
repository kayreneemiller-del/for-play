import { useState, useRef } from 'react'
import { useCouple } from '../../context/CoupleContext'
import { useCustomGames } from '../../hooks/useCustomGames'
import { exportAllData, importAllData } from '../../db/queries'
import { getDateNights, PRIZE_SUGGESTIONS } from '../../constants/dateNights'

function PrizeInput({ value, onChange, placeholder, accentClass }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <div className="flex gap-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-surface border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none ${accentClass}`}
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          title="Browse suggestions"
          className="px-2.5 rounded-lg bg-surface-2 border border-white/10 text-cream/50 hover:text-gold hover:border-gold/40 transition-colors text-sm"
        >
          💡
        </button>
      </div>
      {open && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-surface border border-white/15 rounded-xl shadow-xl max-h-52 overflow-y-auto">
          {PRIZE_SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { onChange(s); setOpen(false) }}
              className="w-full text-left px-3 py-2 text-sm text-cream/80 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 bg-surface-2">
        <h2 className="font-display text-lg text-gold">{title}</h2>
      </div>
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  )
}

export default function Settings() {
  const { profile, saveProfile } = useCouple()
  const { customGames, deleteCustomGame } = useCustomGames()

  const [name1, setName1] = useState(profile?.player1 ?? '')
  const [name2, setName2] = useState(profile?.player2 ?? '')
  const [raceGoal, setRaceGoal] = useState(profile?.raceGoal ?? 5)
  const [nameSaved, setNameSaved] = useState(false)

  const defaultPrizes = profile?.prizes?.length > 0
    ? profile.prizes
    : getDateNights(profile?.player1 ?? 'Player 1', profile?.player2 ?? 'Player 2')
  const [prizes, setPrizes] = useState(defaultPrizes)
  const [prizesSaved, setPrizesSaved] = useState(false)

  const [importModal, setImportModal] = useState(false)
  const [pendingImport, setPendingImport] = useState(null)
  const [clearModal, setClearModal] = useState(false)

  const fileRef = useRef(null)

  const handleSaveNames = async () => {
    await saveProfile({
      ...profile,
      player1: name1.trim() || profile?.player1,
      player2: name2.trim() || profile?.player2,
      raceGoal,
    })
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2000)
  }

  const handleUpdatePrize = (index, field, value) => {
    setPrizes(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }
  const handleAddPrize = () => {
    setPrizes(prev => [...prev, { p1Wins: '', p2Wins: '' }])
  }
  const handleDeletePrize = (index) => {
    setPrizes(prev => prev.filter((_, i) => i !== index))
  }
  const handleSavePrizes = async () => {
    await saveProfile({ ...profile, prizes })
    setPrizesSaved(true)
    setTimeout(() => setPrizesSaved(false), 2000)
  }

  const handleExport = async () => {
    const data = await exportAllData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `for-play-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        setPendingImport(data)
        setImportModal(true)
      } catch {
        alert('Invalid JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const confirmImport = async () => {
    if (!pendingImport) return
    await importAllData(pendingImport)
    setImportModal(false)
    window.location.reload()
  }

  const handleClearAll = async () => {
    await importAllData({ rounds: [], customGames: [], profile: null })
    window.location.reload()
  }

  return (
    <div className="px-4 pt-6 pb-4 mb-nav space-y-4">
      <div className="mb-2">
        <h1 className="font-display text-3xl text-gold">Settings</h1>
        <p className="text-cream/60 text-sm mt-1">Manage your game room</p>
      </div>

      {/* Names */}
      <Section title="Your Names">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-cream/70 uppercase tracking-wider">Player 1 (you)</label>
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value.slice(0, 20))}
            maxLength={20}
            className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-cream/70 uppercase tracking-wider">Player 2 (partner)</label>
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value.slice(0, 20))}
            maxLength={20}
            className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-cream/70 uppercase tracking-wider">🏇 Date night goal (wins)</label>
          <div className="flex gap-2">
            {[3, 5, 7, 10].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRaceGoal(n)}
                className={`flex-1 py-2 rounded-xl font-display text-lg transition-all duration-150 ${
                  raceGoal === n
                    ? 'bg-gold/20 border-2 border-gold text-gold'
                    : 'bg-surface-2 border border-white/10 text-white/40'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSaveNames}
          className="w-full py-2.5 rounded-full bg-gold text-surface font-bold text-sm hover:brightness-110 active:scale-95 transition-all duration-150"
        >
          {nameSaved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </Section>

      {/* Data */}
      <Section title="Your Data">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 py-2.5 rounded-xl bg-teal/10 border border-teal/40 text-teal text-sm font-bold hover:bg-teal/20 active:scale-95 transition-all duration-150"
          >
            📤 Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex-1 py-2.5 rounded-xl bg-magenta/10 border border-magenta/40 text-magenta text-sm font-bold hover:bg-magenta/20 active:scale-95 transition-all duration-150"
          >
            📥 Import JSON
          </button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleFileChange} />
        </div>
        <p className="text-cream/40 text-xs">
          Export creates a backup file. Import replaces all your data from a backup.
        </p>
      </Section>

      {/* Date Night Prizes */}
      <Section title="Date Night Prizes">
        <p className="text-cream/50 text-xs -mt-2">These prizes cycle each time a race is won. Edit, reorder, or add your own.</p>
        <div className="space-y-3">
          {prizes.map((prize, i) => (
            <div key={i} className="bg-surface-2 border border-white/10 rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">Prize #{i + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeletePrize(i)}
                  className="text-neon-red text-xs px-2 py-0.5 rounded-lg hover:bg-neon-red/10 transition-colors"
                >
                  Remove
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-teal/80 uppercase tracking-wide">{name1 || 'Player 1'} wins →</label>
                <PrizeInput
                  value={prize.p1Wins}
                  onChange={(v) => handleUpdatePrize(i, 'p1Wins', v)}
                  placeholder="What does Player 1 win?"
                  accentClass="focus:border-teal"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-magenta/80 uppercase tracking-wide">{name2 || 'Player 2'} wins →</label>
                <PrizeInput
                  value={prize.p2Wins}
                  onChange={(v) => handleUpdatePrize(i, 'p2Wins', v)}
                  placeholder="What does Player 2 win?"
                  accentClass="focus:border-magenta"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddPrize}
          className="w-full py-2 rounded-xl border border-dashed border-white/20 text-cream/50 text-sm hover:border-gold/40 hover:text-gold/70 transition-colors"
        >
          + Add Prize
        </button>
        <button
          type="button"
          onClick={handleSavePrizes}
          className="w-full py-2.5 rounded-full bg-gold text-surface font-bold text-sm hover:brightness-110 active:scale-95 transition-all duration-150"
        >
          {prizesSaved ? '✓ Prizes Saved!' : 'Save Prizes'}
        </button>
      </Section>

      {/* Custom Games */}
      <Section title="Custom Games">
        {customGames.length === 0 ? (
          <p className="text-cream/40 text-sm text-center py-2">No custom games yet. Create one from Log Game!</p>
        ) : (
          <div className="space-y-2">
            {customGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between bg-surface-2 rounded-xl px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{game.emoji ?? '🎯'}</span>
                  <div>
                    <div className="text-white text-sm font-medium">{game.name}</div>
                    <div className="text-cream/40 text-xs">{game.winCondition === 'lowest' ? 'Lowest score wins' : 'Highest score wins'}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteCustomGame(game.id)}
                  className="text-neon-red text-sm px-3 py-1 rounded-lg hover:bg-neon-red/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Danger Zone */}
      <Section title="Danger Zone">
        <p className="text-cream/50 text-sm">This will permanently delete all your game history and settings.</p>
        <button
          type="button"
          onClick={() => setClearModal(true)}
          className="w-full py-2.5 rounded-xl bg-neon-red/10 border border-neon-red/40 text-neon-red text-sm font-bold hover:bg-neon-red/20 active:scale-95 transition-all duration-150"
        >
          🗑️ Clear All Data
        </button>
      </Section>

      {/* Import Confirmation Modal */}
      {importModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="bg-surface border border-white/20 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-display text-xl text-gold">Confirm Import</h3>
            <p className="text-cream/70 text-sm">
              This will replace all your game history. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setImportModal(false); setPendingImport(null) }}
                className="flex-1 py-2.5 rounded-full border border-white/30 text-cream text-sm hover:border-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmImport}
                className="flex-1 py-2.5 rounded-full bg-magenta text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
              >
                Yes, Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {clearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="bg-surface border border-white/20 rounded-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-display text-xl text-neon-red">Clear All Data</h3>
            <p className="text-cream/70 text-sm">
              This will permanently delete all game history, custom games, and your profile. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setClearModal(false)}
                className="flex-1 py-2.5 rounded-full border border-white/30 text-cream text-sm hover:border-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="flex-1 py-2.5 rounded-full bg-neon-red text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
              >
                Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
