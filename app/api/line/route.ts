import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Exportando a função GET para lidar com requisições GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const line = searchParams.get('line');

  try {
    if (!line) {
      throw new Error('Line parameter is required');
    }

    // Consulta para pegar apenas os IDs dos registros da linha específica
    const result = await sql`
      SELECT id FROM esp32 
      WHERE line = ${line};
    `;

    if (result.rowCount === 0) {
      throw new Error(`No records found for line: ${line}`);
    }

    // Retorna apenas os IDs encontrados
    return NextResponse.json(result.rows.map((row) => row.id), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
