import { PinIcon } from "./icons.jsx";

export const PlaceChip = ({ name, placeId, isSelected, onSelect }) => {
  if (!placeId) {
    return (
      <span className="flex items-center gap-1 self-start rounded-full bg-sand-dark px-2 py-0.5 text-xs font-semibold text-nice-grey">
        <PinIcon className="size-3.5 opacity-40" />
        {name}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(placeId)}
      aria-pressed={isSelected}
      className={`flex cursor-pointer items-center gap-1 self-start rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all duration-200 active:scale-95
        ${
          isSelected
            ? "border-transparent bg-linear-to-r from-brand to-sunset text-white shadow-md shadow-brand/30"
            : "border-brand/25 bg-brand/5 text-ocean hover:border-brand hover:bg-brand/10"
        }`}
    >
      <PinIcon className={`size-3.5 ${isSelected ? "text-white" : "text-brand"}`} />
      {name}
    </button>
  );
};
