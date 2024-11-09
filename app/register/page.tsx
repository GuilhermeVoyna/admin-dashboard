"use client";

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [mac, setMacAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('ON');
  const [line, setLine] = useState('');
  console.warn(line);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseURL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const apiEndpoint = 'api/insert-esp/';
    const queryString = `${baseURL}/${apiEndpoint}?mac=${mac}&latitude=${latitude}&longitude=${longitude}&status=${status}&line=${line}`;

    fetch(queryString)
      .then(response => {
        if (!response.ok) {
          alert('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registro bem-sucedido:', data);
        setMacAddress('');
        setLatitude('');
        setLongitude('');
        setStatus('ON');
        setLine('');
      })
      .catch(error => {
        console.error('Erro durante o registro:', error);
      });
  };

  return (
    <main className="flex flex-col items-center gap-10 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-700 text-center">Device Settings</h1>
      
      <div className="bg-white max-w-4xl w-full p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Register New Device</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mac" className="block text-sm font-semibold text-gray-600">MAC Address</label>
            <input
              type="text"
              id="mac"
              value={mac}
              onChange={e => setMacAddress(e.target.value)}
              required
              placeholder="00:1A:2B:3C:4D:5E"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="latitude" className="block text-sm font-semibold text-gray-600">Latitude</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              required
              placeholder="-23.5489"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-semibold text-gray-600">Longitude</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required
              placeholder="46.6388"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-200"
            />
          </div>
            <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-600">Status</label>
            <select
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm bg-white transition duration-200"
            >
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
            </div>
          <div>
            <label htmlFor="line" className="block text-sm font-semibold text-gray-600">Line</label>
            <input
              type="text"
              id="line"
              value={line}
              onChange={e => setLine(e.target.value)}
              required
              placeholder="Unique Line Identifier"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            Register Device
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
