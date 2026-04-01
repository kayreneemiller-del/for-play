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

export async function getCoupleProfile() {
  const db = await getDB()
  return db.get('coupleProfile', 'profile')
}

export async function saveCoupleProfile(profile) {
  const db = await getDB()
  return db.put('coupleProfile', profile, 'profile')
}

export async function getAllCustomGames() {
  const db = await getDB()
  return db.getAll('customGames')
}

export async function addCustomGame(game) {
  const db = await getDB()
  return db.add('customGames', game)
}

export async function deleteCustomGame(id) {
  const db = await getDB()
  return db.delete('customGames', id)
}

export async function exportAllData() {
  const db = await getDB()
  const [profile, rounds, customGames] = await Promise.all([
    db.get('coupleProfile', 'profile'),
    db.getAll('rounds'),
    db.getAll('customGames'),
  ])
  return { profile, rounds, customGames, exportedAt: new Date().toISOString() }
}

export async function importAllData(data) {
  const db = await getDB()
  const tx = db.transaction(['rounds', 'customGames', 'coupleProfile'], 'readwrite')

  await tx.objectStore('rounds').clear()
  await tx.objectStore('customGames').clear()
  await tx.objectStore('coupleProfile').clear()

  if (data.rounds) {
    for (const round of data.rounds) {
      await tx.objectStore('rounds').put(round)
    }
  }
  if (data.customGames) {
    for (const game of data.customGames) {
      await tx.objectStore('customGames').put(game)
    }
  }
  if (data.profile) {
    await tx.objectStore('coupleProfile').put(data.profile, 'profile')
  }

  await tx.done
}
