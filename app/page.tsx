import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { Search } from './search';
import { off } from 'process';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string ; s: string;i: string};
}) {
  const searchMac = searchParams.q ?? '';
  const searchStatus = searchParams.s ?? '';
  const searchLine = searchParams.i ?? '';
  const offset = Number(searchParams.offset) ?? 0;

  const { esps, newOffset, prevOffset } = await getUsers(searchMac, searchStatus, Number(offset));
  const safeNewOffset = newOffset ?? 20;
  const safePrevOffset = prevOffset ??0;
  // create a prevOffset
 
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Esp32</h1>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <div className="w-full mb-4">
      <UsersTable esp={esps} offset={offset} prevOffset={safePrevOffset} newOffset={safeNewOffset}/>
      </div>
    </main>
  );
}
