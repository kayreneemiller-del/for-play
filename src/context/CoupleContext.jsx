import { createContext, useContext, useEffect, useState } from 'react'
import { getCoupleProfile, saveCoupleProfile } from '../db/queries'

const CoupleContext = createContext(null)

export function CoupleProvider({ children }) {
  const [profile, setProfile] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCoupleProfile()
      .then((p) => setProfile(p ?? null))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  const saveProfile = async (newProfile) => {
    await saveCoupleProfile(newProfile)
    setProfile(newProfile)
  }

  return (
    <CoupleContext.Provider value={{ profile, saveProfile, loading }}>
      {children}
    </CoupleContext.Provider>
  )
}

export function useCouple() {
  const ctx = useContext(CoupleContext)
  if (!ctx) throw new Error('useCouple must be used within CoupleProvider')
  return ctx
}

export function usePlayerLabels() {
  const { profile } = useCouple()
  return {
    kayra: profile?.player1 ?? 'Player 1',
    mat: profile?.player2 ?? 'Player 2',
  }
}
