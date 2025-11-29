import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon in React Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const markers = [
  { position: [-12.0681, -75.2106], name: "Sara Huamán", role: "Lideresa Cultural" },
  { position: [-12.0720, -75.2050], name: "Julia Quispe", role: "Ingeniera" },
  { position: [-12.0650, -75.2150], name: "Elena Ccahuana", role: "Educadora" },
  { position: [-12.0690, -75.2080], name: "Rosa Vilcapoma", role: "Emprendedora" },
];

export default function MapSection() {
  return (
    <section className="py-20 px-6" id="mapa">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl font-semibold text-center mb-4" data-testid="text-map-title">
          Mapa de mentoras
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubre la distribución geográfica de nuestras líderes en la región de Huancayo
        </p>

        <div className="rounded-lg overflow-hidden border border-border h-[500px] w-full z-0 relative">
          <MapContainer
            center={[-12.0686, -75.2103]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position as [number, number]}>
                <Popup>
                  <div className="font-semibold">{marker.name}</div>
                  <div className="text-sm text-gray-600">{marker.role}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Mapa interactivo de la Provincia de Huancayo, región Junín, Perú
        </p>
      </div>
    </section>
  );
}
