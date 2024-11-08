'use client';

import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';
import { SelectESP32 } from '@/lib/db';

interface MapProps {
  esp: SelectESP32[];
}

export function Map({ esp }: MapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const google = await loader.load();
      const { Map } = google.maps;
      const { Marker } = google.maps;

      // Map options object
      const mapOptions: google.maps.MapOptions = {
        center: { lat: -23.5505, lng: -46.6333 }, // São Paulo coordinates
        zoom: 3,
        mapId: 'MY_NEXTJS_MAPID',
      };

      // Setup map
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      // Add markers for each ESP32 device
      esp.forEach((device) => {
        new Marker({
          position: {
            lat: parseFloat(device.latitude as string),
            lng: parseFloat(device.longitude as string),
          },
          map: map,
          title: device.mac,
        });
      });
    };

    initMap();
  }, [esp]);

  return     <div
      ref={mapRef}
      style={{
        height: '80vh', // Increased height for more space
        width: '100%',
        borderRadius: '12px', // Rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        overflow: 'hidden', // Prevents content overflow
        transition: 'all 0.3s ease', // Smooth transition
      }}
    />
}