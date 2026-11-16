import { formatDayLabel, tripDays } from "../data/tripDays.js";
import { DayTab } from "./DayTab.jsx";

export const DaySidebar = ({selectedDate, onSelectDate}) => {
  return (
    <aside className="flex w-24 shrink-0 flex-col border-r border-line bg-day-sidebar-bg">
      <div className="flex flex-col items-center m-2">
        <h1 className="font-semibold text-ocean">Dias</h1>
        <p className="text-xs">Santos/Guaruja</p>
      </div>
      {tripDays.map((tripDay) => {
        const { weekday, day } = formatDayLabel(tripDay.date);

        return (
          <DayTab key={tripDay.date} isSelected={tripDay.date === selectedDate} onSelect={() => onSelectDate(tripDay.date)}>
            <span className="text-sm">{weekday}</span>
            <span className="font-bold text-xl">{day}</span>
          </DayTab>
        );
      })}
    </aside>
  );
};
