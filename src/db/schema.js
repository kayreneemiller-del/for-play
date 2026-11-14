import { openDB } from 'idb'

const DB_NAME = 'for-play-db'
const DB_VERSION = 3

let dbPromise = null

// v3: the Anniversary Games moved from Thu-Sun (Nov 12-15) to Wed-Sat (Nov 11-14).
// Relabel every logged round in the old window one day earlier. Nothing is deleted;
// the previous date is kept in `originalDate` so this can be reversed.
const OLD_WINDOW = ['2026-11-12', '2026-11-15']

function dayBefore(iso) {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

async function shiftTournamentDates(tx) {
  const store = tx.objectStore('rounds')
  let cursor = await store.index('by_date').openCursor(IDBKeyRange.bound(...OLD_WINDOW))
  const updates = []
  while (cursor) {
    updates.push(cursor.value)
    cursor = await cursor.continue()
  }
  for (const r of updates) {
    await store.put({ ...r, originalDate: r.date, date: dayBefore(r.date) })
  }
}

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, _newVersion, tx) {
        if (oldVersion < 1) {
          const store = db.createObjectStore('rounds', {
            keyPath: 'id',
            autoIncrement: true,
          })
          store.createIndex('by_game', 'gameId', { unique: false })
          store.createIndex('by_date', 'date', { unique: false })
        }
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('coupleProfile')) {
            db.createObjectStore('coupleProfile')
          }
          if (!db.objectStoreNames.contains('customGames')) {
            db.createObjectStore('customGames', { keyPath: 'id', autoIncrement: true })
          }
        }
        if (oldVersion < 3) {
          shiftTournamentDates(tx)
        }
      },
    })
  }
  return dbPromise
}
