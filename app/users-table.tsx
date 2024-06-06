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
import { deleteESP32 } from './actions';
import { useRouter } from 'next/navigation';
import { func } from 'prop-types';
import { on } from 'events';

export function UsersTable({
  esp,
  offset,
  prevOffset,
  newOffset
}: {
  esp: SelectESP32[];
  offset: number | null;
  prevOffset: number | null;
  newOffset: number | null;
}) {
  const router = useRouter();
  let nextClickCount = 0;

  function onClick(offset: number = 0) {
    if (offset === 0) {
      return router.replace('/');
    }
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
    
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Mac</TableHead>
              <TableHead className="hidden md:table-cell">Latitude</TableHead>
              <TableHead className="hidden md:table-cell">Longitude</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {esp.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </form>
<div>
  
  {offset !== null && offset != newOffset ? (
    <Button
      className="mt-4 w-40"
      variant="secondary"
      onClick={() => onClick(newOffset)}
    >
      Next Page
    </Button>
  ) : (
    <Button className="mt-4 w-40" variant="secondary" disabled>
  <span style={{ color: '#808080' }}>Next Page</span>
</Button>
  )}

  {newOffset !== null && newOffset > 20 ? (
    <Button
      className="mt-4 w-40"
      variant="secondary"
      onClick={() => onClick(prevOffset)}
    >
      Previous Page
    </Button>
  ): (
    <Button className="mt-4 w-40" variant="secondary" disabled>
  <span style={{ color: '#808080' }}>Previous Page</span>
</Button>

  )}
</div>
    </>
  );
}

function UserRow({ user: esp32 }: { user: SelectESP32 }) {
  const userId = esp32.id;
  const deleteEspWithId = deleteESP32.bind(null, userId);

  return (
    <TableRow>
      <TableCell className="font-medium">{esp32.mac}</TableCell>
      <TableCell className="hidden md:table-cell">{esp32.latitude}</TableCell>
      <TableCell>{esp32.longitude}</TableCell>
      <TableCell>{esp32.status}</TableCell>
      <TableCell>
        <Button
          className="w-full"
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
