import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { numeric, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { eq, ilike, and } from 'drizzle-orm';


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
  status: varchar('status', { length: 3 }),
  line: numeric('line'),
  // Add the 'status' property to the table configuration
});

export type SelectESP32 = typeof esp32.$inferSelect;

export async function getEspByStatus(
  status: string,
  
): Promise<{
  esps: SelectESP32[];
}> {
    const esps = await db
      .select()
      .from(esp32)
      .where(ilike(esp32.status,`%${status}%`))
      .limit(1000);
    return {
      esps,
    };
}
// lib/db.js (exemplo)
export async function getUniqueLines() {
  const rows = await db.select({ value: esp32.line }).from(esp32);
  const uniqueValues = Array.from(new Set(rows.map(row => row.value ? row.value.toString() : '')));
  return uniqueValues;
}

// Atualização na função getUsers para incluir o filtro de linha
export async function getUsers(
  searchMac: string,
  searchStatus: string,
  offset: number,
  searchLine: string | null 
): Promise<{
  esps: SelectESP32[];
  newOffset: number | null;
  prevOffset: number | null;
}> {
  let query = db.select().from(esp32);

  const conditions = [];

  if (searchMac) {
    conditions.push(ilike(esp32.mac, `%${searchMac}%`));
  }

  if (searchStatus) {
    conditions.push(ilike(esp32.status, `%${searchStatus}%`));
  }

  if (searchLine) {
    const lineNumber = Number(searchLine);
    if (!isNaN(lineNumber)) {
      conditions.push(eq(esp32.line, lineNumber.toString()));
    }
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  const esps = await query.limit(20).offset(offset);
  const newOffset = esps.length >= 20 ? offset + 20 : null;
  const prevOffset = offset > 0 ? offset - 20 : null;

  return { esps, newOffset, prevOffset };
}

export async function deletEspById(id: number) {
  await db.delete(esp32).where(eq(esp32.id, id));
}
export async function changeEspStatus(id: number) {
  const esps = await db
  .select()
  .from(esp32)
  .where(eq(esp32.id, id))
  .limit(1);
  console.log(id);
  // update the status
  const newStatus = esps[0].status === 'ON' ? 'OFF' : 'ON';
  await db.update(esp32).set({ status: newStatus }).where(eq(esp32.id, id));
}