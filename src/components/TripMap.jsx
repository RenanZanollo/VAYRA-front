import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  className: "",
  html: '<div class="size-4 rounded-full border-2 border-white bg-brand shadow-md"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const selectedPinIcon = L.divIcon({
  className: "",
  html: '<div class="size-7 rounded-full border-4 border-white bg-brand shadow-lg ring-4 ring-brand/30"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const FlyToSelected = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (place) {
      map.flyTo([place.lat, place.lng], 15, { duration: 1.2 });
    }
  }, [place, map]);

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
    </MapContainer>
  );
};
