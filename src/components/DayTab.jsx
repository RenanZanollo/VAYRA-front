import { CalendarIcon } from "./icons.jsx";

export const DayTab = ({ children, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      // Celular: botão estreito (min-w-14) e baixo, lado a lado.
      // Desktop (lg:): as margens e o padding de antes.
      className={`flex min-w-14 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl px-2 py-2 transition-all duration-300 ease-smooth active:scale-95 lg:mx-2.5 lg:my-1.5 lg:px-0 lg:py-2.5
        ${
          isSelected
            ? "bg-linear-to-b from-brand to-sunset text-white shadow-lg shadow-brand/30"
            : "text-ocean hover:bg-white/70 hover:shadow-soft lg:hover:-translate-y-0.5"
        }`}
    >
      {/* Ícone e divisor são enfeite: somem no celular pra economizar altura */}
      <CalendarIcon className={`mb-1.5 hidden size-4 lg:block ${isSelected ? "opacity-90" : "opacity-50"}`} />
      {children}
      <div className="mt-2 hidden h-px w-8 bg-current opacity-20 lg:block" />
    </button>
  );
};
