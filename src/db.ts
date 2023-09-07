// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todosdb',
  password: 'admin',
  port: 5432,
});

export default pool;
