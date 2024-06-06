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

export function ESP32Table({
  devices,
  offset
}: {
  devices: SelectESP32[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">MAC Address</TableHead>
              <TableHead className="hidden md:table-cell">Latitude</TableHead>
              <TableHead className="hidden md:table-cell">Longitude</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <ESP32Row key={device.id} device={device} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function ESP32Row({ device }: { device: SelectESP32 }) {
  const deviceId = device.id;
  const deleteESP32WithId = deleteESP32.bind(null, deviceId);

  return (
    <TableRow>
      <TableCell className="font-medium">{device.mac}</TableCell>
      <TableCell className="hidden md:table-cell">{device.latitude}</TableCell>
      <TableCell className="hidden md:table-cell">{device.longitude}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deleteESP32WithId}
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}