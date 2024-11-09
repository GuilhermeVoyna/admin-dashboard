import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { Search } from './search';
import { off } from 'process';
import {User} from './user';
import {getUniqueLines} from '@/lib/db';
import { warn } from 'console';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string ; s: string;i: string};
}) {
  const searchMac = searchParams.q ?? '';
  const searchStatus = searchParams.s ?? '';
  const searchLine = searchParams.i ?? '';
  const offset = Number(searchParams.offset) ?? 0;

  const { esps, newOffset, prevOffset } = await getUsers(searchMac, searchStatus, Number(offset), searchLine);
  const safeNewOffset = newOffset ?? 20;
  const safePrevOffset = prevOffset ??0;
  const lines = await getUniqueLines();
  // create a prevOffset
return (
  <main className="flex flex-1 flex-col p-4 md:p-6 bg-gray-100 min-h-screen">
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h1 className="font-semibold text-2xl md:text-3xl text-gray-800 mb-4 md:mb-0">ESP32 Devices</h1>
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center mb-8">
      <div className="w-full md:w-1/2">
        <Search lines={lines} mac={searchMac} status={searchStatus} line={searchLine} />
      </div>
    </div>
    <div className="w-full mb-4">
      <UsersTable esp={esps} offset={offset} prevOffset={safePrevOffset} newOffset={safeNewOffset}/>
    </div>
  </main>
);
}
