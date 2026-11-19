import Header from "./components/Header.jsx";
import { PlaceGallery } from "./components/PlaceGallery.jsx";
import { DaySidebar } from "./components/DaySidebar.jsx";
import { useEffect, useState } from "react";
import { tripDays } from "./data/tripDays.js";
import { AddItemButton } from "./components/AddItemButton.jsx";
import { AgendaPanel } from "./components/AgendaPanel.jsx";
import { TripMap } from "./components/TripMap.jsx";
import { BottomNav } from "./components/BottomNav.jsx";
import { ItemDialog } from "./components/ItemDialog.jsx";
import { createSchedule, deleteSchedule, getPlaces, getSchedules, updateSchedule } from "./api.js";

function App() {
  const [selectedDate, setSelectedDate] = useState(tripDays[0].date);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const [places, setPlaces] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [status, setStatus] = useState("loading");

  const [dialog, setDialog] = useState(null);
  const [mobileView, setMobileView] = useState("agenda");

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    Promise.all([getPlaces(), getSchedules()])
      .then(([placesData, schedulesData]) => {
        if (ignore) return;
        setPlaces(placesData);
        setSchedules(schedulesData);
        setStatus("ready");
      })
      .catch((error) => {
        if (ignore) return;
        console.error(error);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  };

  const handleSaveItem = async ({ _id, ...fields }) => {
    if (_id) {
      const updated = await updateSchedule(_id, fields);
      setSchedules((current) => current.map((s) => (s._id === _id ? updated : s)));
    } else {
      const created = await createSchedule(fields);
      setSchedules((current) => [...current, created]);
    }
  };

  const handleDeleteItem = async (itemId) => {
    await deleteSchedule(itemId);
    setSchedules((current) => current.filter((s) => s._id !== itemId));
  };

  const selectedPlace = places.find((place) => place._id === selectedPlaceId);

  const handleSelectPlace = (placeId) => {
    setSelectedPlaceId(placeId);
    setMobileView("map");
  };

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-sand">
      <Header />

      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <DaySidebar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        <section
          className={`${mobileView === "agenda" ? "flex" : "hidden"} min-h-0 flex-1 flex-col lg:flex lg:w-94 lg:flex-none lg:shrink-0 lg:border-r lg:border-line/60`}
        >
          <AgendaPanel
            status={status}
            onRetry={handleRetry}
            schedules={schedules}
            selectedDate={selectedDate}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={handleSelectPlace}
            onEditItem={(item) => setDialog({ item })}
            onDeleteItem={handleDeleteItem}
          />
          <div className="h-16 shrink-0 border-t border-line/60 bg-day-sidebar-bg/70 p-3 lg:h-18">
            <AddItemButton onClick={() => setDialog({ item: undefined })} disabled={status !== "ready"} />
          </div>
        </section>

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

      {dialog && (
        <ItemDialog
          item={dialog.item}
          date={selectedDate}
          places={places}
          onSave={handleSaveItem}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}

export default App;
