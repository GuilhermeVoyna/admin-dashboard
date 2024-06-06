'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="p-4 md:p-6">
      <div className="mb-8 space-y-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          Please complete setup
        </h1>
        <p>
          Inside the Vercel Postgres dashboard, create a table based on the
          schema defined in this repository.
        </p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`CREATE TABLE esp32 (
    id SERIAL PRIMARY KEY,
    mac VARCHAR(17) NOT NULL,
    latitude DECIMAL(9, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    status VARCHAR(3) NOT NULL CHECK (status IN ('ON', 'OFF'))
);`}
          </code>
        </pre>
        <p>Insert a row for testing:</p>
        <pre className="my-4 px-3 py-4 bg-black text-white rounded-lg max-w-2xl overflow-scroll flex text-wrap">
          <code>
            {`INSERT INTO esp32 (mac, latitude, longitude, status) VALUES('00:1B:44:11:3A:B7', 40.712776, -74.005974, 'OFF');`}
          </code>
        </pre>
      </div>
    </main>
  );
}
