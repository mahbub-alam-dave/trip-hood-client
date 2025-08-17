import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom pin icon (optional — you can swap the URL)
const pinIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

// Sample Data — replace with API fetch if needed
const spots = [
  { id: 1, name: "Sajek Valley", tagline: "Above the clouds", lat: 23.3813, lng: 92.2938 },
  { id: 2, name: "Cox's Bazar", tagline: "World's longest beach", lat: 21.4272, lng: 92.0058 },
  { id: 3, name: "St. Martin's Island", tagline: "Coral island paradise", lat: 20.6285, lng: 92.3222 },
  { id: 4, name: "Bandarban", tagline: "Hill kingdom of adventure", lat: 22.1953, lng: 92.2184 },
  { id: 5, name: "Sylhet", tagline: "Tea gardens & waterfalls", lat: 24.8949, lng: 91.8687 },
];

const DestinationsMap = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div className="space-y-4 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Explore Destinations on Map
      </h2>
          <p className='text-center md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>Find our tourist location all around the Bangladesh. We are committed to provide the safe, comfortable and enjoyable tour journey</p>
      </div>

      <MapContainer 
        center={[23.6850, 90.3563]} 
        zoom={6.5} 
        scrollWheelZoom={false} 
        className="h-[450px] w-full rounded-xl overflow-hidden shadow-lg"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {spots.map(spot => (
          <Marker position={[spot.lat, spot.lng]} icon={pinIcon} key={spot.id}>
            <Popup>
              <strong>{spot.name}</strong><br />{spot.tagline}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default DestinationsMap;
