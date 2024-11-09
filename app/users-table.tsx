'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectESP32 } from '@/lib/db';
import { deleteESP32, changeStatusESP32 } from './actions';
import { useRouter } from 'next/navigation';

export function UsersTable({
  esp,
  offset,
  prevOffset,
  newOffset
}: {
  esp: SelectESP32[];
  offset: number;
  prevOffset: number;
  newOffset: number;
}) {
  const router = useRouter();

  function onClick(offset: number = 0) {
    if (isNaN(offset)) {
      offset = 20;
    }
    router.replace(offset === 0 ? '/' : `/?offset=${offset}`);
    console.log(11, offset);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <form className="w-full max-w-7xl bg-white border shadow-md rounded-lg overflow-hidden">
        <Table>
        <TableHeader>
  <TableRow className="bg-gray-200">
    <TableHead className="hidden md:table-cell">Line Id</TableHead>
    <TableHead className="hidden md:table-cell">Esp Id</TableHead>
    <TableHead className="hidden md:table-cell">Mac</TableHead>
    <TableHead className="hidden md:table-cell">Latitude</TableHead>
    <TableHead className="hidden md:table-cell">Longitude</TableHead>
    <TableHead className="hidden md:table-cell">Status</TableHead>
    <TableHead className="hidden md:table-cell text-center">Actions</TableHead>
  </TableRow>
</TableHeader>

<TableBody>
  {esp.map((user) => (
    <UserRow key={user.id} user={user} />
  ))}
</TableBody>

        </Table>
      </form>
      
      <div className="mt-6 max-w-7xl flex justify-between w-full">
        <Button
          className="w-40 px-6 py-2 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
          variant="secondary"
          onClick={() => onClick(prevOffset ?? 20)}
          disabled={offset === 0 || offset === null || isNaN(offset)} 
        >
          Previous Page
        </Button>
        
        <Button
          className="w-40 px-6 py-2 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
          variant="secondary"
          onClick={() => onClick(newOffset ?? 20)}
          disabled={offset === null || offset === newOffset}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}function UserRow({ user: esp32 }: { user: SelectESP32 }) {
  const deleteEspWithId = deleteESP32.bind(null, esp32.id);
  const changeEspStatusWithId = changeStatusESP32.bind(null, esp32.id);

  return (
    <TableRow className="border-b hover:bg-gray-100">
      <TableCell className="hidden md:table-cell p-4">{esp32.line}</TableCell>
      <TableCell className="hidden md:table-cell p-4">{esp32.id}</TableCell>
      <TableCell className="font-medium p-4">{esp32.mac}</TableCell>
      <TableCell className="hidden md:table-cell p-4">{esp32.latitude}</TableCell>
      <TableCell className="p-4">{esp32.longitude}</TableCell>
      <TableCell className="p-4">{esp32.status}</TableCell>
      <TableCell className="p-4 flex space-x-2 w-full">
        <Button
          className="w-full px-4 py-2 text-sm bg-white text-black-500 border border-gray-500 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-100"
          size="sm"
          variant="outline"
          formAction={changeEspStatusWithId}
        >
          Change Status
        </Button>
        <Button
          className="w-full px-4 py-2 text-sm bg-white text-black-500 border border-gray-500 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-100"
          size="sm"
          variant="outline"
          formAction={deleteEspWithId}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}