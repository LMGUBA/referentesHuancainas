import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { Pool as PgPool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const url = process.env.DATABASE_URL;

function usePg(url: string): boolean {
  if (process.env.DATABASE_DRIVER === 'pg') return true;
  return /localhost|127\.0\.0\.1|:\d{4}/.test(url);
}

let dbInstance: any = undefined;

if (url) {
  if (usePg(url)) {
    const pool = new PgPool({ connectionString: url });
    dbInstance = drizzlePg(pool, { schema });
  } else {
    const pool = new NeonPool({ connectionString: url });
    dbInstance = drizzleNeon({ client: pool, schema });
  }
}

export const db = dbInstance as any;
