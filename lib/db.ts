import { openDB } from "idb";

// Constants
const DB_NAME = "inventory-db";
const DB_VERSION = 2;

export const PRODUCTS_STORE = "products";
export const SALES_STORE = "sales";

// Initialize DB with both stores
export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create "products" store
      if (!db.objectStoreNames.contains(PRODUCTS_STORE)) {
        db.createObjectStore(PRODUCTS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      // Create "sales" store
      if (!db.objectStoreNames.contains(SALES_STORE)) {
        db.createObjectStore(SALES_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

//
// Products CRUD
//
export const addProduct = async (product: any) => {
  const db = await initDB();
  return await db.add(PRODUCTS_STORE, product);
};

export const getProducts = async () => {
  const db = await initDB();
  return await db.getAll(PRODUCTS_STORE);
};

export const updateProduct = async (product: any) => {
  if (!product.id) throw new Error("Product must have an `id` to be updated.");
  const db = await initDB();
  return await db.put(PRODUCTS_STORE, product);
};

export const deleteProduct = async (id: number) => {
  const db = await initDB();
  return await db.delete(PRODUCTS_STORE, id);
};

export const getPaginatedProducts = async (page = 1, limit = 10) => {
  const db = await initDB();
  const tx = db.transaction(PRODUCTS_STORE, "readonly");
  const store = tx.objectStore(PRODUCTS_STORE);

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

//
// Sales CRUD
//
export const addSale = async (sale: any) => {
  const db = await initDB();
  return await db.add(SALES_STORE, sale);
};

export const getSales = async () => {
  const db = await initDB();
  return await db.getAll(SALES_STORE);
};

export const updateSale = async (sale: any) => {
  if (!sale.id) throw new Error("Sale must have an `id` to be updated.");
  const db = await initDB();
  return await db.put(SALES_STORE, sale);
};

export const deleteSale = async (id: number) => {
  const db = await initDB();
  return await db.delete(SALES_STORE, id);
};

export const getPaginatedSales = async (page = 1, limit = 10) => {
  const db = await initDB();
  const tx = db.transaction(SALES_STORE, "readonly");
  const store = tx.objectStore(SALES_STORE);

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
