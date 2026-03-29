import { getDB } from './schema'

export async function addRound(round) {
  const db = await getDB()
  return db.add('rounds', round)
}

export async function getAllRounds() {
  const db = await getDB()
  return db.getAll('rounds')
}

export async function deleteRound(id) {
  const db = await getDB()
  return db.delete('rounds', id)
}
