import { openDB, deleteDB, wrap, unwrap } from 'idb';
let readEventStore,
    bookmarkedEventStore,
    eventStore,
    pubkeyStore;

const DB_NAME = 'ONOSENDAI',
    EVENTS = 'events',
    PUBKEYS = 'pubkeys',
    BOOKMARKS = 'bookmarkedEvents',
    READS = 'readEvents'

let db;

const initDB = (idb) => {
    let dbRequest = idb.open(DB_NAME, 1)

    dbRequest.onerror = (event) => {
        console.error(`Database error: ${event.target.error.message}`);
    };

    dbRequest.onsuccess = (event) => {
        db = event.target.result;
        console.log('db', db)
        console.log('event.target', event.target)
        console.log(`Database success: ${event.target}`);
    };

    dbRequest.onupgradeneeded = (event) => {
        console.log('event', event)
        eventStore = db.createObjectStore(EVENTS, { keyPath: 'id', });
        eventStore.createIndex('pubkey', 'pubkey');
        console.log('eventStore', eventStore)
    };
}

const upgradeDB = (idb, v) => {
    let dbRequest = idb.open(DB_NAME, v)

    dbRequest.onupgradeneeded = (event) => {
        eventStore = db.createObjectStore(EVENTS, { keyPath: 'id', });
        eventStore.createIndex('pubkey', 'pubkey');

    };
}


// const db = await openDB(DB_NAME, 1, {
//     upgrade(db) {
//         eventStore = db.createObjectStore(EVENTS, {
//             keyPath: 'id',
//             autoIncrement: true,
//         });
//         eventStore.createIndex('pubkey', 'pubkey');
//         console.log('eventStore0', eventStore)
//         console.log('db0', db)
//     },
// });
// console.log('db1', db)
// console.log('eventStore1', eventStore)
// console.log('pubkeyStore1', pubkeyStore)
// // const dbPromise = openDB(DB_NAME, 1, {
// //   upgrade(db) {
// //     db.createObjectStore(EVENTS);
// //   },
// // });


// var db = await openDB(DB_NAME, 1)
// eventStore.createIndex('pubkey', 'pubkey');
/* 
initDB(window.indexedDB)
upgradeDB(window.indexedDB, version + 1)
import { initDB, upgradeDB } from './db'
*/

export { db, initDB, upgradeDB };