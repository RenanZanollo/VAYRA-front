import { PlaceChip } from "./PlaceChip.jsx";

export const ScheduleCard = ({ schedule, selectedPlaceId, onSelectPlace, style }) => {
  const isActive = schedule.place !== null && schedule.place === selectedPlaceId;

  return (
    <article
      style={style}
      className={`group relative flex animate-fade-up flex-col overflow-hidden rounded-xl border bg-white py-3 pr-4 pl-5 font-jakarta transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift
        ${isActive ? "border-brand/40 shadow-lift" : "border-line/70 shadow-card"}`}
    >
      {/*
        Faixa lateral com gradiente. Em vez de mudar a borda no hover
        (border-l-4 empurra o conteúdo e "pula"), ela fica por cima do card
        e só cresce de 0% a 100% na vertical.
      */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 origin-top bg-linear-to-b from-brand to-sunset transition-transform duration-300 ease-smooth group-hover:scale-y-100
          ${isActive ? "scale-y-100" : "scale-y-0"}`}
      />

      <time
        dateTime={schedule.time}
        className="mb-1.5 self-start rounded-md bg-blue-tag px-2 py-0.5 text-sm font-bold text-ocean"
      >
        {schedule.time}
      </time>

      <h3 className="font-bold text-ink">{schedule.title}</h3>
      <p className="mt-0.5 text-sm leading-snug text-nice-grey">{schedule.description}</p>

      {schedule.placeName && (
        <div className="mt-2.5 flex">
          <PlaceChip
            name={schedule.placeName}
            placeId={schedule.place}
            isSelected={isActive}
            onSelect={onSelectPlace}
          />
        </div>
      )}
    </article>
  );
};
