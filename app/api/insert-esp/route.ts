import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mac = searchParams.get('mac');
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const status = searchParams.get('status');

  try {
    if (!mac || !latitude || !longitude || !status) throw new Error('MAC, latitude, longitude, and status are required');
    
    // Insert into the esp32 table
    await sql`
      INSERT INTO esp32 (mac, latitude, longitude, status) 
      VALUES (${mac}, ${latitude}, ${longitude}, ${status})
    `;
    // Return the inserted data or a success message
    return NextResponse.json({ mac, latitude, longitude, status }, { status: 200 });
  } catch (error) {
    // Return a more informative error message
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
};