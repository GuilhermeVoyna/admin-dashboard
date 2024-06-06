import {Map} from './components/map';
import React from 'react';

import { getEspByStatus,getUsers } from '@/lib/db';

 export default async function IndexPage() {
  
  const statusOFF = 'OFF';
  const statusON = 'ON';
  const { esps : espsOff } = await getEspByStatus(statusOFF);


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Map</h1>
      </div>
      <div>
        <Map esp={espsOff} />
      </div>
    </main>
  );
}
