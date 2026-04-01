import { openDB } from 'idb'

const DB_NAME = 'for-play-db'
const DB_VERSION = 2

let dbPromise = null

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
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
      },
    })
  }
  return dbPromise
}
