import Header from "./components/Header.jsx";
import { PlaceGallery } from "./components/PlaceGallery.jsx";
import { DaySidebar } from "./components/DaySidebar.jsx";
import { useState } from "react";
import { tripDays } from "./data/tripDays.js";
import { AddItemButton } from "./components/AddItemButton.jsx";
import { AgendaPanel } from "./components/AgendaPanel.jsx";
import { TripMap } from "./components/TripMap.jsx";
import { places } from "./data/places.js";

function App() {
  const [selectedDate, setSelectedDate] = useState(tripDays[0].date);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const selectedPlace = places.find((place) => place._id === selectedPlaceId);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-sand">
      <Header />

      <main className="flex min-h-0 flex-1">
        <DaySidebar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <section className="flex w-94 shrink-0 flex-col border-r border-line/60">
          <AgendaPanel
            selectedDate={selectedDate}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
          />
          <div className="h-18 shrink-0 border-t border-line/60 bg-day-sidebar-bg/70 p-3">
            <AddItemButton />
          </div>
        </section>

        <div className="flex min-w-0 flex-1 flex-col">
          <section className="h-56 shrink-0">
            <PlaceGallery place={selectedPlace} />
          </section>

          {/*
            Borda com gradiente: o <section> de fora É o gradiente, e o padding
            de 3px dele vira a "espessura da borda". O <div> de dentro guarda o
            mapa, com raio um pouco menor (16px - 3px = 13px) pra curva casar.
          */}
          <section className="mx-4 mb-4 min-h-0 flex-1 rounded-2xl bg-linear-to-br from-brand to-sunset p-0.75 shadow-lift">
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
    </div>
  );
}

export default App;
