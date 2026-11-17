import { useEffect, useRef } from "react";

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
      <div className="flex h-full items-center justify-center text-sm text-nice-grey">
        Clique em um lugar da agenda ou do mapa para ver as fotos.
      </div>
    );
  }

  if (place.photos.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 text-nice-grey">
        <span className="font-bold text-ocean">{place.name}</span>
        <span className="text-sm">Ainda sem fotos deste lugar.</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase text-ocean">
          Galeria do local selecionado: <span className="normal-case">{place.name}</span>
        </h2>

        <div className="flex items-center gap-2 text-sm text-nice-grey">
          <span>{place.photos.length} fotos</span>
          <button type="button" onClick={() => scroll(-1)} aria-label="Fotos anteriores"
            className="size-7 rounded-full border border-line hover:bg-sand-dark">‹</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Próximas fotos"
            className="size-7 rounded-full border border-line hover:bg-sand-dark">›</button>
        </div>
      </div>

      <div ref={scrollerRef} className="no-scrollbar flex min-h-0 flex-1 snap-x snap-mandatory gap-3 overflow-x-auto">
        {place.photos.map((photo) => (
          <figure key={photo.url} className="relative h-full w-56 shrink-0 snap-start overflow-hidden rounded-xl">
            <img src={photo.url} alt={photo.caption} loading="lazy" className="h-full w-full object-cover" />
            <figcaption className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-0.5 text-xs text-white">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};