import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

sql`SELECT 1`
  .then(() => console.log("✅ Connected to Neon"))
  .catch((err) => console.error("❌ Neon connection failed:", err.message));

export default sql;




