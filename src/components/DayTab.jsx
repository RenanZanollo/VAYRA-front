import { CalendarIcon } from "./icons.jsx";

export const DayTab = ({ children, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`m-2.5 py-2.5 flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-colors
        ${
          isSelected
            ? " bg-brand text-white drop-shadow-xl"
            : " text-ocean hover:bg-sand-dark active:scale-95"
        }`}
    >
      <CalendarIcon className="size-4 mb-2" />
      {children}
      <div className="w-10 border border-b-white opacity-20 mt-2"></div>
    </button>
  );
};
