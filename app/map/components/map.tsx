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
        center: { lat: 51.5074, lng: 0.1278 }, // Default position (London)
        zoom: 2,
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

  return <div style={{   height: "70vh",
    width: "100%",
    top: 0,
    left: 0}} ref={mapRef}></div>;
}