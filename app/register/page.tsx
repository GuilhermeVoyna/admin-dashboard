"use client";

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [mac, setMacAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseURL = 'http://localhost:3000';
    const apiEndpoint = 'api/insert-esp/';
    const queryString = `${baseURL}/${apiEndpoint}?mac=${mac}&latitude=${latitude}&longitude=${longitude}&status=${status}`;

    // Perform GET request
    fetch(queryString)
      .then(response => {
        if (!response.ok) {
          alert('Network response was not ok');
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful:', data);
        // Handle successful registration
        // Clear the form
        setMacAddress('');
        setLatitude('');
        setLongitude('');
        setStatus('');
      })
      .catch(error => {
        console.error('Error during registration:', error);
        // Handle error during registration
      });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Settings</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mac" className="block text-sm font-medium text-gray-700">MAC Address:</label>
            <input
              type="text"
              id="mac"
              value={mac}
              onChange={e => setMacAddress(e.target.value)}
              required
              placeholder="00:1A:2B:3C:4D:5E"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude:</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              required
              placeholder='-23.5489'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude:</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              required
              placeholder='46.6388'
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
            <select
              id="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Status</option>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;