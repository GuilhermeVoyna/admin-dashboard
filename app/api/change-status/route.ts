import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mac = searchParams.get('mac');
  const status = searchParams.get('status');

  try {
    if (!mac || !status) {
      throw new Error('MAC address and status are required');
    }

    if (status !== 'ON' && status !== 'OFF') {
      throw new Error('Status must be either "ON" or "OFF"');
    }

    // Update the status of the record with the provided MAC address
    const result = await sql`
      UPDATE esp32 
      SET status = ${status}
      WHERE mac = ${mac}
      RETURNING *;
    `;

    // Check if any record was updated
    if (result.rowCount === 0) {
      throw new Error(`No record found with MAC address: ${mac}`);
    }

    // Return the updated record
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    // Return a more informative error message
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}