const ListIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" />
  </svg>
);

const MapIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4Z" />
    <path d="M9 4v13.5M15 6.5V20" />
  </svg>
);

const tabs = [
  { id: "agenda", label: "Roteiro", Icon: ListIcon },
  { id: "map", label: "Mapa", Icon: MapIcon },
];

export const BottomNav = ({ view, onChangeView }) => {
  return (
    <nav
      aria-label="Navegação principal"
      className="flex shrink-0 border-t border-line/60 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_14px_rgb(0_53_74/0.06)] backdrop-blur lg:hidden"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = view === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChangeView(id)}
            aria-pressed={isActive}
            className={`relative flex flex-1 cursor-pointer flex-col items-center gap-0.5 py-2 font-jakarta text-xs font-bold transition-colors duration-200
              ${isActive ? "text-brand" : "text-nice-grey/70"}`}
          >
            <span
              className={`absolute top-0 h-0.75 w-10 rounded-b-full bg-linear-to-r from-brand to-sunset transition-transform duration-300 ease-smooth
                ${isActive ? "scale-x-100" : "scale-x-0"}`}
            />
            <Icon className={`size-6 transition-transform duration-300 ease-smooth ${isActive ? "scale-110" : ""}`} />
            {label}
          </button>
        );
      })}
    </nav>
  );
};
