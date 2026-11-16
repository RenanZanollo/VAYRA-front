import { schedules } from "../data/schedules.js";
import { formatLongDate, tripDays } from "../data/tripDays.js";

import { UmbrelaIcon } from "./icons.jsx";
import { ScheduleCard } from "./ScheduleCard.jsx";

export const AgendaPanel = ({ selectedDate, selectedPlaceId, onSelectPlace }) => {
  const day = tripDays.find((tripDay) => tripDay.date === selectedDate);

  const daySchedules = schedules.filter((item) => item.date === selectedDate);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col justify-center items-start">
        <p className="mt-6 ml-3 font-hand font-bold text-3xl text-brand first-letter:uppercase">
          {formatLongDate(selectedDate)}
        </p>
        <h2 className="font-title my-1 ml-3 font-bold text-ocean text-2xl">
          {day.title}
        </h2>
        <span className="flex justify-center items-center ml-3">
          <UmbrelaIcon className="size-4 text-teal mr-1" />
          <p className="text-nice-grey font-">{day.summary}</p>
        </span>
        <div className="border-b border-dashed border-line my-4 ml-7 w-80"></div>
      </div>

      <div className="flex flex-col justify-center items-center">
        {daySchedules.map((item) => (
          <ScheduleCard
            key={item._id}
            schedule={item}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={onSelectPlace}
          />
        ))}
      </div>
    </div>
  );
};
