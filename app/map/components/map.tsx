'use client';

import {Loader} from '@googlemaps/js-api-loader';
import { number } from 'prop-types';
import React, { useEffect } from 'react';
import { getEspByStatus} from './getEspByStatus';
import { get } from 'http';


export function Map(){

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly"
            });
            
            const {Map} = await loader.importLibrary('maps');
            // init marker
            const {Marker} = await loader.importLibrary('marker') as google.maps.MarkerLibrary

            //getBrokenEsp
            const {esps} = await getEspByStatus("OFF");
            
            const position = {lat: 51.5074, lng: 0.1278};

            //map options

            const mapOptions : google.maps.MapOptions = {
                center: position,
                zoom: 15,
                mapId: 'MY_NEXTJS_MAPID'
            };

            //seteup map
            
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
            //positions test


            // Iterate over esp32 array if it exists and has elements
            
        }

        initMap();
    }, []);

    return (
        <div style={{height: '600px', width: '100%'}} ref={mapRef}></div>
        
    );
}