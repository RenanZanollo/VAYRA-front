import Header from "./components/Header.jsx";
import { PlaceGallery } from "./components/PlaceGallery.jsx";
import { DaySidebar } from "./components/DaySidebar.jsx";
import { useState } from "react";
import { tripDays } from "./data/tripDays.js";
import { AddItemButton } from "./components/AddItemButton.jsx";
import { AgendaPanel } from "./components/AgendaPanel.jsx";
import { TripMap } from "./components/TripMap.jsx";
import { BottomNav } from "./components/BottomNav.jsx";
import { places } from "./data/places.js";

function App() {
  const [selectedDate, setSelectedDate] = useState(tripDays[0].date);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  // Qual aba aparece no celular: "agenda" ou "map". No desktop é ignorado (as duas aparecem).
  const [mobileView, setMobileView] = useState("agenda");
  const selectedPlace = places.find((place) => place._id === selectedPlaceId);

  // Clicar num lugar da agenda seleciona E leva pra aba do mapa.
  // No desktop trocar mobileView não muda nada na tela (o lg:flex sempre mostra o mapa).
  const handleSelectPlace = (placeId) => {
    setSelectedPlaceId(placeId);
    setMobileView("map");
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-sand">
      <Header />

      {/* Celular: tudo empilhado (coluna). Desktop: lado a lado (linha). */}
      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <DaySidebar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        {/* Agenda: no celular só aparece na aba "agenda"; no desktop sempre (lg:flex) */}
        <section
          className={`${mobileView === "agenda" ? "flex" : "hidden"} min-h-0 flex-1 flex-col lg:flex lg:w-94 lg:flex-none lg:shrink-0 lg:border-r lg:border-line/60`}
        >
          <AgendaPanel
            selectedDate={selectedDate}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={handleSelectPlace}
          />
          <div className="h-16 shrink-0 border-t border-line/60 bg-day-sidebar-bg/70 p-3 lg:h-18">
            <AddItemButton />
          </div>
        </section>

        {/* Galeria + mapa: no celular só na aba "map"; no desktop sempre */}
        <div
          className={`${mobileView === "map" ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col lg:flex`}
        >
          <section className="h-44 shrink-0 lg:h-56">
            <PlaceGallery place={selectedPlace} />
          </section>
          <section className="mx-3 mb-3 min-h-0 flex-1 rounded-2xl bg-linear-to-br from-brand to-sunset p-0.75 shadow-lift lg:mx-4 lg:mb-4">
            <div className="h-full overflow-hidden rounded-[13px]">
              <TripMap
                places={places}
                selectedPlaceId={selectedPlaceId}
                onSelectPlace={setSelectedPlaceId}
              />
            </div>
          </section>
        </div>
      </main>

      <BottomNav view={mobileView} onChangeView={setMobileView} />
    </div>
  );
}

export default App;
