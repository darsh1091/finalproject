import { LowSync, JSONFileSync } from 'lowdb';
import { join } from 'path';

const file = join(process.cwd(), 'backend', 'src', 'data', 'db.json');
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
