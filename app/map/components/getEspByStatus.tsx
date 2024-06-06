import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { numeric, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike ,and} from 'drizzle-orm';


export const db = drizzle(
  neon(process.env.POSTGRES_URL!, {
    fetchOptions: {
      cache: 'no-store'
    }
  })
);

const esp32 = pgTable('esp32', {
  id: serial('id').primaryKey(),
  mac: varchar('mac', { length: 17 }),
  latitude: numeric('latitude'),
  longitude: numeric('longitude'),
  status: varchar('status', { length: 3 })
});

export type SelectESP32 = typeof esp32.$inferSelect;

export async function getEspByStatus(
  status: string,
  
): Promise<{
  esps: SelectESP32[];
}> {
  // Always search the full table, not per page

    const esps = await db
      .select()
      .from(esp32)
      .where(ilike(esp32.status,`%${status}%`))
      .limit(1000);
    return {
      esps
    };
  
}