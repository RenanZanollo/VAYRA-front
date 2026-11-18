import { useEffect, useRef } from "react";
import { PinIcon } from "./icons.jsx";

const arrowClass =
  "flex size-8 cursor-pointer items-center justify-center rounded-full border border-line/70 bg-white text-lg leading-none text-ocean shadow-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90";

export const PlaceGallery = ({ place }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [place]);

  const scroll = (direction) => {
    const scroller = scrollerRef.current;
    scroller.scrollBy({ left: direction * scroller.clientWidth, behavior: "smooth" });
  };

  if (!place) {
    return (
      <div className="flex h-full p-4">
        <div className="flex flex-1 animate-fade-in flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line/70 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-brand/10">
            <PinIcon className="size-5 text-brand" />
          </span>
          <p className="font-jakarta text-sm font-semibold text-ocean">Nenhum lugar selecionado</p>
          <p className="text-xs text-nice-grey">
            Clique em um lugar da agenda ou do mapa para ver as fotos.
          </p>
        </div>
      </div>
    );
  }

  if (place.photos.length === 0) {
    return (
      <div className="flex h-full p-4">
        <div className="flex flex-1 animate-fade-in flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-line/70">
          <span className="font-jakarta font-bold text-ocean">{place.name}</span>
          <span className="text-sm text-nice-grey">Ainda sem fotos deste lugar.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3 p-3 lg:p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex min-w-0 items-center gap-2 font-jakarta text-xs font-bold tracking-wide text-ocean uppercase">
          <PinIcon className="size-3.5 shrink-0 text-brand" />
          {/* rótulo longo só aparece de md pra cima; no celular fica só o nome do lugar */}
          <span className="hidden whitespace-nowrap md:inline">Galeria do local selecionado:</span>
          <span className="truncate rounded-md bg-sand-dark px-2 py-0.5 tracking-normal normal-case">
            {place.name}
          </span>
        </h2>

        <div className="flex shrink-0 items-center gap-2 text-xs text-nice-grey">
          <span className="mr-1 whitespace-nowrap">{place.photos.length} fotos</span>
          <button type="button" onClick={() => scroll(-1)} aria-label="Fotos anteriores" className={arrowClass}>
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Próximas fotos" className={arrowClass}>
            ›
          </button>
        </div>
      </div>

      {/* key={place._id}: ao trocar de lugar, a lista é recriada e anima de novo */}
      <div
        key={place._id}
        ref={scrollerRef}
        className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto"
      >
        {place.photos.map((photo, index) => (
          <figure
            key={photo.url}
            style={{ animationDelay: `${index * 50}ms` }}
            className="group relative h-full w-44 shrink-0 lg:w-56 animate-fade-up snap-start overflow-hidden rounded-xl bg-sand-dark shadow-card"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            {/* degradê escuro embaixo: a legenda fica legível em qualquer foto */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
            <figcaption className="absolute bottom-2 left-2.5 text-xs font-semibold text-white drop-shadow">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
