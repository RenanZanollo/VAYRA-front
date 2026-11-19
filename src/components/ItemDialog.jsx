import { useEffect, useRef, useState } from "react";
import { formatLongDate } from "../data/tripDays.js";
import { PlaceAutocomplete } from "./PlaceAutocomplete.jsx";

const TITLE_MAX = 30;
const DESCRIPTION_MAX = 120;

const labelClass = "mb-1.5 block font-jakarta text-xs font-bold tracking-wide text-ocean uppercase";
const inputClass =
  "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink transition-all outline-none placeholder:text-nice-grey/50 focus:border-brand focus:ring-4 focus:ring-brand/15";

const EMPTY_FORM = { time: "", title: "", description: "", placeName: "", place: null };

/*
  Um modal só pra CRIAR e EDITAR: o formulário é o mesmo, muda o ponto de partida.
  - item = undefined -> criando: começa vazio, salva no dia selecionado
  - item = {...}     -> editando: começa com os dados do card

  O App só renderiza este componente quando o modal deve aparecer,
  então cada abertura nasce com o state novinho.
*/
export const ItemDialog = ({ item, date, places, onSave, onClose }) => {
  const dialogRef = useRef(null);
  const isEditing = item !== undefined;

  // Um único objeto de state pro formulário inteiro (campos "controlados").
  // useState só usa o valor inicial na PRIMEIRA renderização: copia o item uma vez.
  const [form, setForm] = useState(() =>
    isEditing
      ? {
          time: item.time,
          title: item.title,
          description: item.description,
          placeName: item.placeName,
          place: item.place,
        }
      : EMPTY_FORM,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Atualiza só um campo, mantendo os outros (...current copia o resto)
  const updateField = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  // showModal() é o que transforma o <dialog> em modal de verdade
  // (fundo escuro, Esc fecha, foco preso dentro dele).
  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // não recarregar a página
    setIsSaving(true);
    setError(null);

    try {
      // onSave manda pra API (POST ou PUT). O await espera o banco confirmar.
      // Editando, mandamos o _id junto pro App saber qual item atualizar.
      await onSave({
        ...(isEditing && { _id: item._id }),
        date: isEditing ? item.date : date,
        time: form.time,
        title: form.title.trim(),
        description: form.description.trim(),
        placeName: form.placeName.trim(),
        place: form.place,
      });
      dialogRef.current.close(); // só fecha se deu certo
    } catch (err) {
      // Deu erro (back recusou ou está fora do ar): mostra a mensagem e
      // mantém o modal aberto com tudo que foi digitado.
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      // Esc ou dialog.close() disparam "close": avisamos o App pra desmontar
      onClose={onClose}
      // Clique fora (no fundo escuro) fecha: o alvo do clique é o próprio <dialog>
      onClick={(event) => event.target === dialogRef.current && !isSaving && dialogRef.current.close()}
      className="m-auto w-[min(100%-2rem,28rem)] animate-fade-up rounded-2xl bg-sand p-0 shadow-lift backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div>
          <p className="font-hand text-2xl font-bold text-brand first-letter:uppercase">
            {formatLongDate(isEditing ? item.date : date)}
          </p>
          <h2 className="font-title text-xl font-bold tracking-tight text-ocean">
            {isEditing ? "Editar item" : "Novo item no roteiro"}
          </h2>
        </div>

        {/* fieldset disabled desativa TODOS os campos de uma vez enquanto salva */}
        <fieldset disabled={isSaving} className="flex flex-col gap-4 disabled:opacity-60">
          <div className="flex gap-3">
            <div className="w-28 shrink-0">
              <label htmlFor="item-time" className={labelClass}>Horário</label>
              <input id="item-time" type="time" required value={form.time} onChange={updateField("time")} className={inputClass} />
            </div>

            <div className="min-w-0 flex-1">
              <label htmlFor="item-title" className={labelClass}>Título</label>
              <input
                id="item-title"
                type="text"
                required
                maxLength={TITLE_MAX}
                value={form.title}
                onChange={updateField("title")}
                placeholder="Ex: Praia do Embaré"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="item-description" className={labelClass}>Descrição</label>
              {/* contador de caracteres: fica vermelho perto do limite */}
              <span className={`text-[11px] ${form.description.length > DESCRIPTION_MAX - 15 ? "text-brand" : "text-nice-grey/50"}`}>
                {form.description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
            <textarea
              id="item-description"
              rows={3}
              maxLength={DESCRIPTION_MAX}
              value={form.description}
              onChange={updateField("description")}
              placeholder="O que vai rolar?"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label htmlFor="item-place" className={labelClass}>Lugar</label>
            <PlaceAutocomplete
              id="item-place"
              places={places}
              value={{ placeName: form.placeName, place: form.place }}
              onChange={(next) => setForm((current) => ({ ...current, ...next }))}
            />
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="animate-fade-in rounded-lg bg-brand/10 px-3 py-2 text-sm font-semibold text-brand">
            {error}
          </p>
        )}

        <div className="mt-1 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            disabled={isSaving}
            className="cursor-pointer rounded-xl px-4 py-2.5 font-jakarta text-sm font-bold text-nice-grey transition-colors hover:bg-sand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer rounded-xl bg-linear-to-r from-brand to-sunset px-5 py-2.5 font-jakarta text-sm font-bold text-white shadow-md shadow-brand/30 transition-all hover:shadow-lg hover:shadow-brand/40 active:scale-95 disabled:cursor-wait disabled:opacity-70"
          >
            {isSaving ? "Salvando…" : isEditing ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </form>
    </dialog>
  );
};
