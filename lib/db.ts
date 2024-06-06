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

export async function getUsers(
  searchMac: string,
  searchStatus: string,
  offset: number,
  
): Promise<{
  esps: SelectESP32[];
  newOffset: number | null;
  prevOffset: number | null;
}> {
  // Always search the full table, not per page
  if (searchMac && searchStatus) {
    const esps = await db
      .select()
      .from(esp32)
      .where(and(ilike(esp32.mac, `%${searchMac}%`),ilike(esp32.status, `%${searchStatus}%`)))
      .limit(1000);
    return {
      esps,
      newOffset: null,
      prevOffset: null
    };
  }
  
  if (searchStatus) {
    const esps = await db
      .select()
      .from(esp32)
      .where(ilike(esp32.status, `%${searchStatus}%`))
      .limit(1000);
    return {
      esps,
      newOffset: null,
      prevOffset: null
    };
  }

  if (searchMac) {
    const esps = await db
      .select()
      .from(esp32)
      .where(ilike(esp32.mac, `%${searchMac}%`))
      .limit(1000);
    return {
      esps,
      newOffset: null,
      prevOffset: null
    };
  }

  if (offset === null) {
    return { esps: [], newOffset: null, prevOffset: null };
  }

  const moreEsps = await db.select().from(esp32).limit(20).offset(offset);
  const newOffset = moreEsps.length >= 20 ? offset + 20 : offset;
  const preOffset = offset - 20;
  return { esps: moreEsps, newOffset, prevOffset: preOffset};
}

export async function deletEspById(id: number) {
  await db.delete(esp32).where(eq(esp32.id, id));
}