import { formatDayLabel, tripDays } from "../data/tripDays.js";
import { DayTab } from "./DayTab.jsx";

export const DaySidebar = ({ selectedDate, onSelectDate }) => {
  return (
    <aside className="no-scrollbar flex w-24 shrink-0 flex-col overflow-y-auto border-r border-line/60 bg-day-sidebar-bg">
      <div className="mx-2 mt-4 mb-2 flex flex-col items-center">
        <h2 className="font-jakarta text-xs font-bold tracking-widest text-ocean uppercase">Dias</h2>
        <p className="text-[11px] text-nice-grey/70">Santos/Guarujá</p>
      </div>

      {tripDays.map((tripDay) => {
        const { weekday, day } = formatDayLabel(tripDay.date);

        return (
          <DayTab
            key={tripDay.date}
            isSelected={tripDay.date === selectedDate}
            onSelect={() => onSelectDate(tripDay.date)}
          >
            <span className="text-xs font-semibold tracking-wide">{weekday}</span>
            <span className="font-title text-2xl leading-7 font-bold">{day}</span>
          </DayTab>
        );
      })}
    </aside>
  );
};
