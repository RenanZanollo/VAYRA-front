import { CalendarIcon } from "./icons.jsx";

export const DayTab = ({ children, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`mx-2.5 my-1.5 flex shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl py-2.5 transition-all duration-300 ease-smooth active:scale-95
        ${
          isSelected
            ? "bg-linear-to-b from-brand to-sunset text-white shadow-lg shadow-brand/30"
            : "text-ocean hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-soft"
        }`}
    >
      <CalendarIcon className={`mb-1.5 size-4 ${isSelected ? "opacity-90" : "opacity-50"}`} />
      {children}
      <div className="mt-2 h-px w-8 bg-current opacity-20" />
    </button>
  );
};
