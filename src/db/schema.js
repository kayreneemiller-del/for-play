import { openDB } from 'idb'

const DB_NAME = 'for-play-db'
const DB_VERSION = 1

let dbPromise = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('rounds')) {
          const store = db.createObjectStore('rounds', {
            keyPath: 'id',
            autoIncrement: true,
          })
          store.createIndex('by_game', 'gameId', { unique: false })
          store.createIndex('by_date', 'date', { unique: false })
        }
      },
    })
  }
  return dbPromise
}
