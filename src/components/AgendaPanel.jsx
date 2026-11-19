import { formatLongDate, tripDays } from "../data/tripDays.js";

import { UmbrelaIcon } from "./icons.jsx";
import { ScheduleCard } from "./ScheduleCard.jsx";

// "Esqueleto" que aparece enquanto os dados carregam (no lugar dos cards)
const CardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-2 rounded-xl border border-line/50 bg-white p-4">
    <div className="h-5 w-14 rounded-md bg-sand-dark" />
    <div className="h-4 w-2/3 rounded bg-sand-dark" />
    <div className="h-3 w-full rounded bg-sand-dark" />
  </div>
);

export const AgendaPanel = ({
  status,
  onRetry,
  schedules,
  selectedDate,
  selectedPlaceId,
  onSelectPlace,
  onEditItem,
  onDeleteItem,
}) => {
  const day = tripDays.find((tripDay) => tripDay.date === selectedDate);

  // Filtra o dia e ordena por horário ("08:30" < "12:00" funciona comparando texto,
  // porque o formato HH:mm sempre tem 2 dígitos). Um item novo entra no lugar certo.
  const daySchedules = schedules
    .filter((item) => item.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    // key={selectedDate}: quando o dia muda, o React recria este bloco
    // e as animações de entrada rodam de novo.
    <div key={selectedDate} className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
      <div className="animate-fade-up pt-6">
        <p className="font-hand text-3xl font-bold text-brand first-letter:uppercase">
          {formatLongDate(selectedDate)}
        </p>
        <h2 className="my-1 font-title text-2xl font-bold tracking-tight text-ocean">
          {day.title}
        </h2>
        <span className="flex items-center gap-1.5">
          <UmbrelaIcon className="size-4 shrink-0 text-teal" />
          <p className="text-sm text-nice-grey">{day.summary}</p>
        </span>
        <div className="my-4 border-b border-dashed border-line" />
      </div>

      {status === "loading" && (
        <div className="flex flex-col gap-3" aria-label="Carregando roteiro">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {status === "error" && (
        <div className="flex animate-fade-in flex-col items-center gap-3 rounded-xl border-2 border-dashed border-brand/30 bg-brand/5 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-ink">Não foi possível carregar o roteiro.</p>
          <p className="text-xs text-nice-grey">Confira se o servidor (back-end) está rodando.</p>
          <button
            type="button"
            onClick={onRetry}
            className="cursor-pointer rounded-lg bg-brand px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand/90 active:scale-95"
          >
            Tentar de novo
          </button>
        </div>
      )}

      {status === "ready" && daySchedules.length === 0 && (
        <p className="animate-fade-in rounded-xl border-2 border-dashed border-line/70 px-4 py-8 text-center text-sm text-nice-grey">
          Nada planejado pra este dia ainda.
        </p>
      )}

      {status === "ready" && (
        <div className="flex flex-col gap-3">
          {daySchedules.map((item, index) => (
            <ScheduleCard
              key={item._id}
              schedule={item}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={onSelectPlace}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item._id)}
              // efeito "cascata": cada card entra 60ms depois do anterior
              style={{ animationDelay: `${(index + 1) * 60}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
