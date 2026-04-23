import { useEffect } from 'react';

function Map({ onBack }) {
  useEffect(() => {
    if (document.getElementById('map').innerHTML !== '') return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = window.L;
      const map = L.map('map').setView([28.6139, 77.2090], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap'
      }).addTo(map);

      const restaurants = [
        { name: 'Burger King', lat: 28.6139, lng: 77.2090, dish: 'Whopper Burger', price: 199 },
        { name: 'Pizza Hut', lat: 28.6200, lng: 77.2150, dish: 'Margherita Pizza', price: 299 },
        { name: 'KFC', lat: 28.6100, lng: 77.2050, dish: 'Crispy Chicken', price: 249 },
        { name: 'Dominos', lat: 28.6250, lng: 77.2200, dish: 'Pasta Italiana', price: 179 },
        { name: 'Subway', lat: 28.6080, lng: 77.2100, dish: 'Veggie Sandwich', price: 149 },
      ];

      restaurants.forEach(r => {
        L.marker([r.lat, r.lng])
          .addTo(map)
          .bindPopup(`
            <div style="font-family: sans-serif; padding: 8px;">
              <strong style="font-size: 14px;">${r.name}</strong><br/>
              <span style="color: #666; font-size: 12px;">${r.dish}</span><br/>
              <span style="color: #e85d04; font-weight: bold;">Rs. ${r.price}</span>
            </div>
          `);
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#0a0a0a',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1a1a1a',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #2a2a2a',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Back</button>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px' }}>Nearby Restaurants</h2>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
          Tap on a marker to see restaurant details!
        </p>
        <div
          id="map"
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #2a2a2a'
          }}
        ></div>
      </div>
    </div>
  );
}

export default Map;