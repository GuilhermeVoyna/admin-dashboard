import { Map } from './components/map';
import React from 'react';

import { getEspByStatus, getUsers } from '@/lib/db';

export default async function IndexPage() {
  const statusOFF = 'OFF';
  const statusON = 'ON';
  const { esps: espsOff } = await getEspByStatus(statusOFF);
  const { esps: espsOn } = await getEspByStatus(statusON);
  // junta os dois arrays
  const esps = espsOff.concat(espsOn);
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-center items-center">
        <h1 className="font-semibold text-2xl text-indigo-800 md:text-3xl">
          Device Status Map
        </h1>
      </div>
      <div className="mt-6 rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="p-6">
          <h2 className="font-semibold text-xl text-gray-800 mb-4">Devices with Status OFF</h2>
          <div className="w-full h-[600px] md:h-[700px] rounded-lg border border-gray-200 overflow-hidden">
            <Map esp={esps} />
          </div>
        </div>
      </div>
    </main>
  );
}
