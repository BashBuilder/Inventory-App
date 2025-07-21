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
