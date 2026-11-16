import Header from "./components/Header.jsx";
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

  return (
    <div className="flex h-dvh flex-col bg-sand overflow-hidden">
      <Header />

      <main className="flex min-h-0 flex-1">
        <DaySidebar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <section className="flex flex-col w-94 shrink-0 border-r">
          <AgendaPanel
            selectedDate={selectedDate}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={setSelectedPlaceId}
          />
          <div className="shrink-0 bg-day-sidebar-bg p-3 h-18 ">
            <AddItemButton></AddItemButton>
          </div>
        </section>

        <div className="flex min-w-0 flex-1 flex-col">
          <section className="h-56 shrink-0 bg-blue-100"></section>
          <section className="min-h-0 flex-1">
            <TripMap
              places={places}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={setSelectedPlaceId}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
