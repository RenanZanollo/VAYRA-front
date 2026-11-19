import { formatDayLabel, tripDays } from "../data/tripDays.js";
import { DayTab } from "./DayTab.jsx";

export const DaySidebar = ({ selectedDate, onSelectDate }) => {
  return (
    <aside className="no-scrollbar flex shrink-0 flex-row gap-1 overflow-x-auto border-b border-line/60 bg-day-sidebar-bg px-2 py-2 lg:w-24 lg:flex-col lg:gap-0 lg:overflow-x-visible lg:overflow-y-auto lg:border-r lg:border-b-0 lg:px-0 lg:py-0">

      <div className="mx-2 mt-4 mb-2 hidden flex-col items-center lg:flex">
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
            <span className="text-[11px] font-semibold tracking-wide lg:text-xs">{weekday}</span>
            <span className="font-title text-xl leading-6 font-bold lg:text-2xl lg:leading-7">{day}</span>
          </DayTab>
        );
      })}
    </aside>
  );
};
