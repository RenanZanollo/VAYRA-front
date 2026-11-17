export const AddItemButton = () => {
  return (
    <button
      type="button"
      className="group flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-add-button-border/40 font-jakarta text-sm font-bold text-nice-grey transition-all duration-200 hover:border-brand hover:bg-brand/5 hover:text-brand active:scale-[0.98]"
    >
      <span className="flex size-5 items-center justify-center rounded-full border-2 border-current text-xs leading-none transition-transform duration-300 ease-smooth group-hover:rotate-90">
        +
      </span>
      Adicionar item
    </button>
  );
};
