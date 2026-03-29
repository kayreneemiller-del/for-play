import { useState } from 'react'

export default function TagInput({ label, tags, onChange }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInput('')
  }

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag))

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-xs text-cream/70 uppercase tracking-wider">{label}</label>}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          placeholder="Type module name + Enter"
          className="flex-1 bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={addTag}
          className="bg-surface-2 border border-white/20 rounded-lg px-3 py-2 text-gold text-sm hover:border-gold"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-gold/20 border border-gold/40 text-gold text-xs rounded-full px-3 py-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gold/60 hover:text-gold ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
