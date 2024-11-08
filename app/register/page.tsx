"use client";

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [mac, setMacAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('ON');
  const [line, setLine] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseURL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const apiEndpoint = 'api/insert-esp/';
    const queryString = `${baseURL}/${apiEndpoint}?mac=${mac}&latitude=${latitude}&longitude=${longitude}&status=${status}&line=${line}`;

    // Realizar requisição GET
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
        // Limpar o formulário
        setMacAddress('');
        setLatitude('');
        setLongitude('');
        setStatus('');
        setLine('');
      })
      .catch(error => {
        console.error('Erro durante o registro:', error);
      });
  };

  return (
<main className="flex flex-1 max-w-7xl flex-col gap-6 p-6 bg-gray-50 min-h-screen">
  <div className="flex justify-center">
    <h1 className="font-bold text-3xl text-indigo-700">Device Settings</h1>
  </div>
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto"> {/* Usando max-w-7xl para largura maior */}
    <h1 className="text-xl font-semibold mb-6 text-gray-800 text-center">Register New Device</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campo para o MAC Address */}
      <div>
        <label htmlFor="mac" className="block text-sm font-semibold text-gray-600">MAC Address</label>
        <input
          type="text"
          id="mac"
          value={mac}
          onChange={e => setMacAddress(e.target.value)}
          required
          placeholder="00:1A:2B:3C:4D:5E"
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Campo para Latitude */}
      <div>
        <label htmlFor="latitude" className="block text-sm font-semibold text-gray-600">Latitude</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
          placeholder="-23.5489"
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Campo para Longitude */}
      <div>
        <label htmlFor="longitude" className="block text-sm font-semibold text-gray-600">Longitude</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
          placeholder="46.6388"
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Campo para Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-600">Status</label>
        <select
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>
      </div>
      {/* Campo para Line */}
      <div>
        <label htmlFor="line" className="block text-sm font-semibold text-gray-600">Line</label>
        <input
          type="text"
          id="line"
          value={line}
          onChange={e => setLine(e.target.value)}
          required
          placeholder="Unique Line Identifier"
          className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      {/* Botão de Registro */}
      <button
        type="submit"
        className="w-full py-3 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
      >
        Register Device
      </button>
    </form>
  </div>
</main>

  );
};

export default RegisterPage;
