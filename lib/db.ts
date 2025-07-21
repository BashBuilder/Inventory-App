// lib/db.ts
import { openDB } from "idb";

const DB_NAME = "inventory-db";
const STORE_NAME = "products";

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

export const addProduct = async (product: any) => {
  const db = await initDB();
  await db.add(STORE_NAME, product);
};

export const getProducts = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const updateProduct = async (product: any) => {
  if (!product.id) {
    throw new Error("Product must have an `id` to be updated.");
  }

  const db = await initDB();
  await db.put(STORE_NAME, product);
};

export const deleteProduct = async (id: number) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

// Fetch paginated products
export const getPaginatedProducts = async (page = 1, limit = 10) => {
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
