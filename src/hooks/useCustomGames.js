import { useEffect, useState, useCallback } from 'react'
import {
  getAllCustomGames,
  addCustomGame as dbAddCustomGame,
  deleteCustomGame as dbDeleteCustomGame,
} from '../db/queries'

export function useCustomGames() {
  const [customGames, setCustomGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCustomGames()
      .then(setCustomGames)
      .catch(() => setCustomGames([]))
      .finally(() => setLoading(false))
  }, [])

  const addCustomGame = useCallback(async (game) => {
    const id = await dbAddCustomGame(game)
    const newGame = { ...game, id }
    setCustomGames((prev) => [...prev, newGame])
    return id
  }, [])

  const deleteCustomGame = useCallback(async (id) => {
    await dbDeleteCustomGame(id)
    setCustomGames((prev) => prev.filter((g) => g.id !== id))
  }, [])

  return { customGames, addCustomGame, deleteCustomGame, loading }
}
