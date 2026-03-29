import { useState, useEffect, useCallback } from 'react'
import { getAllRounds, addRound as dbAddRound } from '../db/queries'

export function useRounds() {
  const [rounds, setRounds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRounds()
      .then(setRounds)
      .finally(() => setLoading(false))
  }, [])

  const addRound = useCallback(async (round) => {
    const id = await dbAddRound(round)
    const newRound = { ...round, id }
    setRounds((prev) => [...prev, newRound])
    return id
  }, [])

  return { rounds, loading, addRound }
}
