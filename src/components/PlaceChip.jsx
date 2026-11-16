import { PinIcon } from "./icons.jsx";

export const PlaceChip = ({ name, placeId, isSelected, onSelect }) => {
  if (!placeId) {
    return (
      <span className="flex items-center gap-1 self-start text-sm text-nice-grey">
        <PinIcon className="size-4.5 opacity-40" />
        {name}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(placeId)}
      aria-pressed={isSelected}
      className={`flex cursor-pointer items-center gap-1 self-start rounded-full border px-2 py-0.5 text-sm font-bold transition
        ${
          isSelected
            ? "border-brand bg-brand text-white"
            : "border-line text-ocean hover:border-brand"
        }`}
    >
      <PinIcon className={`size-4.5 ${isSelected ? "text-white" : "text-brand"}`} />
      {name}
    </button>
  );
};
