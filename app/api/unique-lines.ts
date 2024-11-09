import { NextApiRequest, NextApiResponse } from 'next';
import { getUniqueLines } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lines = await getUniqueLines();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unique lines' });
  }
}
