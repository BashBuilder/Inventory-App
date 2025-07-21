// lib/db.ts
import { openDB } from "idb";

const DB_NAME = "inventory-db";
const STORE_NAME = "sale";

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const addSales = async (product: any) => {
  const db = await initDB();
  await db.add(STORE_NAME, product);
};

export const getSales = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

// Fetch paginated products
export const getPaginatedSales = async (page = 1, limit = 10) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  const allItems: any[] = [];
  let cursor = await store.openCursor();
  let index = 0;
  const start = (page - 1) * limit;
  const end = page * limit;

  while (cursor && allItems.length < limit) {
    if (index >= start && index < end) {
      allItems.push(cursor.value);
    }
    index++;
    cursor = await cursor.continue();
  }

  return allItems;
};
