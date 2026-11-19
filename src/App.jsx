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

  // Dados que vêm da API. Começam vazios e são preenchidos quando o fetch termina.
  const [places, setPlaces] = useState([]);
  const [schedules, setSchedules] = useState([]);
  // "loading" enquanto busca, "error" se falhou, "ready" quando chegou
  const [status, setStatus] = useState("loading");

  // O que o modal está fazendo:
  //   null                -> fechado
  //   { item: undefined } -> criando
  //   { item: card }      -> editando aquele card
  const [dialog, setDialog] = useState(null);
  // Qual aba aparece no celular: "agenda" ou "map". No desktop é ignorado (as duas aparecem).
  const [mobileView, setMobileView] = useState("agenda");

  // Contador que, quando muda, faz o useEffect buscar os dados de novo ("Tentar de novo")
  const [reloadKey, setReloadKey] = useState(0);

  // Busca lugares e roteiro AO MESMO TEMPO (Promise.all), mais rápido que um depois do outro.
  // Roda quando o App aparece e toda vez que reloadKey muda.
  useEffect(() => {
    // "Trava": se o efeito for desmontado/refeito antes da resposta chegar,
    // ignoramos a resposta velha em vez de colocar dado desatualizado na tela.
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

    // Função de limpeza: o React chama antes de rodar o efeito de novo
    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // Botão "Tentar de novo": volta pro loading e muda o reloadKey (dispara o efeito)
  const handleRetry = () => {
    setStatus("loading");
    setReloadKey((key) => key + 1);
  };

  // Regra das 3 funções: fala com o banco PRIMEIRO; só depois que ele confirmou,
  // muda a tela. Se der erro, o await joga a exceção pra quem chamou mostrar a mensagem.
  // E nunca altera o array do state: sempre cria um array NOVO.

  // CRIAR e EDITAR chegam aqui. Quem decide é ter ou não _id.
  const handleSaveItem = async ({ _id, ...fields }) => {
    if (_id) {
      // EDITAR: PUT, e troca na lista só o item com o mesmo _id (map)
      const updated = await updateSchedule(_id, fields);
      setSchedules((current) => current.map((s) => (s._id === _id ? updated : s)));
    } else {
      // CRIAR: POST, e o item volta com o _id de verdade do Mongo
      const created = await createSchedule(fields);
      setSchedules((current) => [...current, created]);
    }
  };

  // EXCLUIR: DELETE, e tira da lista o item daquele _id (filter)
  const handleDeleteItem = async (itemId) => {
    await deleteSchedule(itemId);
    setSchedules((current) => current.filter((s) => s._id !== itemId));
  };

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

      {/* Só existe enquanto está aberto: ao fechar, desmonta e o formulário zera */}
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
