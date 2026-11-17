import { schedules } from "../data/schedules.js";
import { formatLongDate, tripDays } from "../data/tripDays.js";

import { UmbrelaIcon } from "./icons.jsx";
import { ScheduleCard } from "./ScheduleCard.jsx";

export const AgendaPanel = ({ selectedDate, selectedPlaceId, onSelectPlace }) => {
  const day = tripDays.find((tripDay) => tripDay.date === selectedDate);

  const daySchedules = schedules.filter((item) => item.date === selectedDate);

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

      <div className="flex flex-col gap-3">
        {daySchedules.map((item, index) => (
          <ScheduleCard
            key={item._id}
            schedule={item}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={onSelectPlace}
            // efeito "cascata": cada card entra 60ms depois do anterior
            style={{ animationDelay: `${(index + 1) * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
