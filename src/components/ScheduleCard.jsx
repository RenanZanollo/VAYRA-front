import { useState } from "react";
import { PlaceChip } from "./PlaceChip.jsx";

const PencilIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const TrashIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
  </svg>
);

const iconButtonClass =
  "flex size-8 cursor-pointer items-center justify-center rounded-lg text-nice-grey/60 transition-colors";

export const ScheduleCard = ({ schedule, selectedPlaceId, onSelectPlace, onEdit, onDelete, style }) => {
  const isActive = schedule.place !== null && schedule.place === selectedPlaceId;
  // Excluir não tem "desfazer", então o primeiro clique só pede confirmação
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      // Se der certo, o App tira o card da lista e este componente desaparece.
      await onDelete();
    } catch (error) {
      // Deu errado: o card continua e mostramos o motivo
      setDeleteError(error.message);
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
    setDeleteError(null);
  };

  return (
    <article
      style={style}
      className={`group relative flex animate-fade-up flex-col overflow-hidden rounded-xl border bg-white py-3 pr-4 pl-5 font-jakarta transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-lift
        ${isActive ? "border-brand/40 shadow-lift" : "border-line/70 shadow-card"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-1 origin-top bg-linear-to-b from-brand to-sunset transition-transform duration-300 ease-smooth group-hover:scale-y-100
          ${isActive ? "scale-y-100" : "scale-y-0"}`}
      />

      {/*
        Ações no canto. Desktop: aparecem só no hover do card (ou com foco do teclado).
        Celular: sempre visíveis, porque tela de toque não tem hover.
      */}
      <div className="absolute top-2 right-2 flex gap-0.5 transition-opacity duration-200 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Editar ${schedule.title}`}
          className={`${iconButtonClass} hover:bg-sky/40 hover:text-ocean`}
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsConfirmingDelete(true)}
          aria-label={`Excluir ${schedule.title}`}
          className={`${iconButtonClass} hover:bg-brand/10 hover:text-brand`}
        >
          <TrashIcon className="size-4" />
        </button>
      </div>

      <time
        dateTime={schedule.time}
        className="mb-1.5 self-start rounded-md bg-blue-tag px-2 py-0.5 text-sm font-bold text-ocean"
      >
        {schedule.time}
      </time>

      {/* pr-16: o título não passa por baixo dos botões */}
      <h3 className="pr-16 font-bold text-ink">{schedule.title}</h3>
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

      {/* Confirmação: uma camada por cima do card, em vez de um alert() feio do navegador */}
      {isConfirmingDelete && (
        <div className="absolute inset-0 flex animate-fade-in flex-col items-center justify-center gap-2.5 bg-white/95 px-4 text-center backdrop-blur-sm">
          <p className="text-sm font-bold text-ink">Excluir "{schedule.title}"?</p>

          {deleteError && (
            <p role="alert" className="text-xs font-semibold text-brand">{deleteError}</p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-bold text-nice-grey transition-colors hover:bg-sand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              autoFocus
              className="cursor-pointer rounded-lg bg-brand px-3 py-1.5 text-sm font-bold text-white shadow-md shadow-brand/30 transition-all hover:bg-brand/90 active:scale-95 disabled:cursor-wait disabled:opacity-70"
            >
              {isDeleting ? "Excluindo…" : "Excluir"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
