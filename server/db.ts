import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.js";

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/proactive';

if (!databaseUrl) {
  console.warn("WARNING: DATABASE_URL not set, using default connection");
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
