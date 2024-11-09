'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon, Spinner } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useRef, useState } from 'react';

export function Search(props: { mac: string; status: string; line: string; lines: string[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mac, setMac] = useState(props.mac);
  const [status, setStatus] = useState(props.status);
  const [line, setLine] = useState(props.line);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (mac !== undefined) {
      if (mac) {
        params.set('q', mac);
      } else {
        params.delete('q');
      }
    }

    if (status !== undefined) {
      if (status) {
        params.set('s', status);
      } else {
        params.delete('s');
      }
    }

    if (line !== undefined && line !== '') {
      params.set('i', line);
    } else {
      params.delete('i');
    }

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }, [router, mac, status, line]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#fAfAfA] shadow-md rounded-lg mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">MAC</label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              ref={inputRef}
              value={mac ?? ''}
              onInput={(e) => setMac(e.currentTarget.value)}
              spellCheck={false}
              className="w-full pl-10 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Search MACs..."
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Status</label>
          <select
            value={status ?? ''}
            onChange={(e) => setStatus(e.currentTarget.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">All</option>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">Linha</label>
          <select
            value={line ?? ''}
            onChange={(e) => setLine(e.currentTarget.value)}
            className="bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">All Lines</option>
            {props.lines
              .filter((lineOption) => lineOption !== '')
              .map((lineOption) => (
              <option key={lineOption} value={lineOption}>
                {lineOption}
              </option>
              ))}
          </select>
        </div>
        {isPending && (
          <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full bg-white bg-opacity-60 rounded-xl">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
