import { PlaceChip } from "./PlaceChip.jsx";

export const ScheduleCard = ({ schedule, selectedPlaceId, onSelectPlace }) => {
  return (
    <div className="w-82 h-35 flex-col border border-line rounded-xl my-2 flex bg-white hover:shadow-md transition-all duration-75 hover:border-l-4 hover:border-brand">
      <div className="flex justify-center mt-3 mb-1 items-center ml-4 w-14 h-6 rounded-md bg-blue-tag text-ocean">
        <span className="text-sm font-bold font-jakarta">
          {schedule.time}
        </span>
      </div>
        <h3 className="pl-4 pb-1 font-jakarta font-bold">{schedule.title}</h3>
        <p className="pl-4 font-jakarta text-sm">{schedule.description}</p>

      {schedule.placeName && (
        <div className="ml-4 pb-1 mt-1 flex font-jakarta">
          <PlaceChip
            name={schedule.placeName}
            placeId={schedule.place}
            isSelected={schedule.place === selectedPlaceId}
            onSelect={onSelectPlace}
          />
        </div>
      )}
    </div>
  );
};
