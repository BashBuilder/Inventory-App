import { openDB } from "idb";

// Constants
const DB_NAME = "inventory-db";
const DB_VERSION = 9; // Increment this version when making changes to the schema

export const PRODUCTS_STORE = "products";
export const SALES_STORE = "sales";
export const PROFILE_STORE = "profile";

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

      // Recreate "profile" store without keyPath
      if (db.objectStoreNames.contains(PROFILE_STORE)) {
        db.deleteObjectStore(PROFILE_STORE); // ✅ Important!
      }
      db.createObjectStore(PROFILE_STORE); // ✅ No keyPath
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

// Profile CRUD
export const getProfile = async () => {
  const db = await initDB();
  return await db.get(PROFILE_STORE, "profile");
};

export const updateProfile = async (profile: any) => {
  const db = await initDB();
  return await db.put(PROFILE_STORE, profile, "profile");
};
export const deleteProfile = async () => {
  const db = await initDB();
  return await db.delete(PROFILE_STORE, "profile");
};

export const addProfile = async (profile: any) => {
  const db = await initDB();
  return await db.put(PROFILE_STORE, profile, "profile");
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

// search products
export const searchProducts = async (query: string): Promise<ProductType[]> => {
  const db = await initDB();
  const tx = db.transaction(PRODUCTS_STORE, "readonly");
  const store = tx.objectStore(PRODUCTS_STORE);

  const results: ProductType[] = [];
  const lowerQuery = query.toLowerCase();

  let cursor = await store.openCursor();
  while (cursor) {
    const product = cursor.value as ProductType;

    const matches = Object.entries(product).some(([key, value]) => {
      if (value === undefined || value === null) return false;

      // Skip 'img' since it's a File object
      if (key === "img") return false;

      return value.toString().toLowerCase().includes(lowerQuery);
    });

    if (matches) {
      results.push(product);
    }

    cursor = await cursor.continue();
  }
  return results;
};
export const searchSales = async (query: string): Promise<SalesType[]> => {
  const db = await initDB();
  const tx = db.transaction(SALES_STORE, "readonly");
  const store = tx.objectStore(SALES_STORE);

  const results: SalesType[] = [];
  const lowerQuery = query.toLowerCase();

  let cursor = await store.openCursor();
  while (cursor) {
    const product = cursor.value as SalesType;

    const matches = Object.entries(product).some(([key, value]) => {
      if (value === undefined || value === null) return false;

      // Skip 'img' since it's a File object
      if (key === "img") return false;

      return value.toString().toLowerCase().includes(lowerQuery);
    });

    if (matches) {
      results.push(product);
    }

    cursor = await cursor.continue();
  }
  return results;
};
