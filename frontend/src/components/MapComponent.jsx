
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [mapReady, setMapReady] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = L.map(mapContainer.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      setMapReady(true); 

   
      return () => map.remove();
    }
  }, []);

  return (
    <div>
      {!mapReady ? (
        <p>Loading Map...</p>
      ) : (
        <div id='map' ref={mapContainer} style={{ height: '400px', width: '100%' }}></div>
      )}
    </div>
  );
};

export default MapComponent;
