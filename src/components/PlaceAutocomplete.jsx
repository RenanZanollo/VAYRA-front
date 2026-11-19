import { useId, useState } from "react";
import { PinIcon } from "./icons.jsx";

const normalize = (text) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const toWords = (text) => normalize(text).split(/\s+/).filter(Boolean);

const matchesQuery = (name, query) => {
  const normalizedName = normalize(name);
  return toWords(query).every((word) => normalizedName.includes(word));
};

const Highlight = ({ text, query }) => {
  const normalizedText = normalize(text);
  const marked = Array(text.length).fill(false);

  toWords(query).forEach((word) => {
    const start = normalizedText.indexOf(word);
    if (start !== -1) marked.fill(true, start, start + word.length);
  });

  const parts = [];
  [...text].forEach((char, index) => {
    const last = parts[parts.length - 1];
    if (last && last.isMatch === marked[index]) last.text += char;
    else parts.push({ text: char, isMatch: marked[index] });
  });

  return parts.map((part, index) =>
    part.isMatch ? (
      <mark key={index} className="bg-transparent font-extrabold text-brand">{part.text}</mark>
    ) : (
      part.text
    ),
  );
};

export const PlaceAutocomplete = ({ places, value, onChange, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = useId();

  const query = value.placeName;

  const matches = places.filter((place) => matchesQuery(place.name, query));

  const exactMatch = places.some((place) => normalize(place.name) === normalize(query));
  const showFreeOption = query.trim() !== "" && !exactMatch;

  const options = [
    ...matches.map((place) => ({ type: "place", place })),
    ...(showFreeOption ? [{ type: "free" }] : []),
  ];

  const selectOption = (option) => {
    if (option.type === "place") {
      onChange({ placeName: option.place.name, place: option.place._id });
    } else {
      onChange({ placeName: query.trim(), place: null });
    }
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleInput = (event) => {
    onChange({ placeName: event.target.value, place: null });
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? options.length - 1 : index - 1));
    } else if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      selectOption(options[activeIndex]);
    } else if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
    }
  };

  const isLinked = value.place !== null;

  return (
    <div className="relative">
      <div className="relative">
        <PinIcon
          className={`pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 transition-colors ${isLinked ? "text-brand" : "text-nice-grey/40"}`}
        />
        <input
          id={id}
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          placeholder="Busque ou digite um lugar"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen && options.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          className="w-full rounded-xl border border-line bg-white py-2.5 pr-3 pl-9 text-sm text-ink transition-all outline-none placeholder:text-nice-grey/50 focus:border-brand focus:ring-4 focus:ring-brand/15"
        />
      </div>

      {query.trim() !== "" && (
        <p className={`mt-1.5 text-xs ${isLinked ? "text-teal" : "text-nice-grey/70"}`}>
          {isLinked ? "✓ Lugar do catálogo: aparece no mapa e na galeria" : "Lugar livre: não aparece no mapa"}
        </p>
      )}

      {isOpen && options.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-12 z-20 max-h-56 animate-fade-in overflow-y-auto rounded-xl border border-line/70 bg-white p-1 shadow-lift"
        >
          {options.map((option, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={option.type === "place" ? option.place._id : "free"}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isActive}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-brand/10" : ""}`}
              >
                {option.type === "place" ? (
                  <>
                    <PinIcon className="size-4 shrink-0 text-brand" />
                    <span className="flex-1 text-ink">
                      <Highlight text={option.place.name} query={query} />
                    </span>
                    {option.place.photos.length > 0 && (
                      <span className="text-[10px] font-semibold text-nice-grey/60">
                        {option.place.photos.length} fotos
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="flex size-4 shrink-0 items-center justify-center text-nice-grey/60">+</span>
                    <span className="text-nice-grey">
                      Usar <strong className="text-ink">"{query.trim()}"</strong> como lugar livre
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
