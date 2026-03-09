import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const runMigrations = async () => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./drizzle" });
  await pool.end();
};

runMigrations().catch((error) => {
  console.error("Migration failed", error);
  process.exit(1);
});
