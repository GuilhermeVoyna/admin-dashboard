'use server';

import { deletEspById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteUser(userId: number) {
  // Uncomment this to enable deletion
  // await deleteUserById(userId);
  // revalidatePath('/');
}

export async function deleteESP32(espId: number) {
  // Uncomment this to enable deletion
  await deletEspById(espId);
  revalidatePath('/');
}
