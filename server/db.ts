import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema.js";

neonConfig.webSocketConstructor = ws;

const dbUrl = process.env.DATABASE_URL || "postgresql://localhost/proactive";

export const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle({ client: pool, schema });
