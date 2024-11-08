import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const status = searchParams.get('status');

  try {
    if (!id || !status) {
      throw new Error('ID and status are required');
    }

    if (status !== 'ON' && status !== 'OFF') {
      throw new Error('Status must be either "ON" or "OFF"');
    }

    // Atualiza o status do registro com o ID fornecido
    const result = await sql`
      UPDATE esp32 
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;

    // Verifica se algum registro foi atualizado
    if (result.rowCount === 0) {
      throw new Error(`No record found with ID: ${id}`);
    }

    // Retorna o registro atualizado
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    // Retorna uma mensagem de erro mais informativa
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
