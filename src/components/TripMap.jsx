import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Pin normal: cresce um pouco no hover
const pinIcon = L.divIcon({
  className: "",
  html: '<div class="size-4 rounded-full border-2 border-white bg-brand shadow-md transition-transform duration-200 hover:scale-125"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Pin selecionado: gradiente + uma "onda" pulsando atrás (animate-ping)
const selectedPinIcon = L.divIcon({
  className: "",
  html: `
    <div class="relative size-7">
      <span class="absolute inset-0 animate-ping rounded-full bg-brand/40"></span>
      <div class="relative size-7 rounded-full border-4 border-white bg-linear-to-br from-brand to-sunset shadow-lg"></div>
    </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const FlyToSelected = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (place) {
      // No celular, o mapa pode ter acabado de aparecer (estava display:none).
      // Recalcula o tamanho ANTES de voar, senão ele centraliza errado.
      map.invalidateSize();
      map.flyTo([place.lat, place.lng], 15, { duration: 1.2 });
    }
  }, [place, map]);

  return null;
};

// "Vigia" o tamanho do mapa. Quando ele muda (ex.: aba Mapa abriu no celular,
// saiu de 0x0 pra tela cheia), avisa o Leaflet pra recalcular e carregar os tiles.
const ResizeWatcher = () => {
  const map = useMap();

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());

    // limpeza: para de vigiar quando o componente sai da tela
    return () => observer.disconnect();
  }, [map]);

  return null;
};

export const TripMap = ({ places, selectedPlaceId, onSelectPlace }) => {
  const selectedPlace = places.find((place) => place._id === selectedPlaceId);

  return (
    <MapContainer center={[-23.985, -46.3]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {places.map((place) => {
        const isSelected = place._id === selectedPlaceId;

        return (
          <Marker
            key={place._id}
            position={[place.lat, place.lng]}
            icon={isSelected ? selectedPinIcon : pinIcon}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{ click: () => onSelectPlace(place._id) }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              {place.name}
            </Tooltip>
          </Marker>
        );
      })}

      <FlyToSelected place={selectedPlace} />
      <ResizeWatcher />
    </MapContainer>
  );
};
