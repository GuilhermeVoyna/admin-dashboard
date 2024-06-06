'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon, Spinner } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useTransition, useEffect, useRef, useState } from 'react';

export function Search(props: { value?: string, status?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [status, setStatus] = useState(props.status);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (value !== undefined) {
      if (value) {
        params.set('q', value);
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

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }, [router, value, status]);

  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
      <Input
        ref={inputRef}
        value={value ?? ''}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        spellCheck={false}
        className="w-full bg-white shadow-none appearance-none pl-8"
        placeholder="Search macs..."
      />
      <select
        value={status ?? ''}
        onChange={(e) => setStatus(e.currentTarget.value)}
        className="ml-2 bg-white shadow-none appearance-none"
      >
        <option value="">All</option>
        <option value="ON">ON</option>
        <option value="OFF">OFF</option>
      </select>
      {isPending && <Spinner />}
    </div>
  );
}