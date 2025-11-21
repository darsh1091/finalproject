import { LowSync, JSONFileSync } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const file = join(dataDir, 'db.json');
const adapter = new JSONFileSync(file);
const defaultData = {
  users: [],
  products: [],
  orders: [],
  reviews: [],
  carts: [],
  appointments: []
};

const db = new LowSync(adapter, defaultData);
db.read();
if (!db.data) {
  db.data = defaultData;
  db.write();
}

export default db;
