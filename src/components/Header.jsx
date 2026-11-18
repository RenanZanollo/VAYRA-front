import { SunIcon, CalendarIcon } from "./icons.jsx";

const Header = () => {
  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line/50 bg-sand/90 px-4 shadow-soft backdrop-blur lg:h-16 lg:px-6">
      <div className="flex min-w-0 items-center gap-2.5 lg:gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-brand to-sunset shadow-md shadow-brand/30 lg:size-10">
          <SunIcon className="size-5 text-white lg:size-6" />
        </div>

        {/* min-w-0 + truncate: se não couber, corta com "..." em vez de quebrar linha */}
        <div className="min-w-0">
          <h1 className="truncate font-title text-lg leading-6 font-bold tracking-tight text-ocean lg:text-xl">
            Roteiro Fim de Ano
          </h1>
          <p className="truncate text-xs leading-4 text-ocean/60">Santos & Guarujá • Litoral Paulista</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 font-jakarta text-sm font-semibold">
        {/* Chip de datas: só a partir de md (tablet). No celular, o próprio dia selecionado já mostra a data */}
        <span className="hidden h-8 items-center gap-2 rounded-full border border-line/70 bg-white/70 px-3 text-ocean shadow-soft md:flex">
          <CalendarIcon className="size-3.5 text-brand" />
          <span>
            <time dateTime="2026-12-28">28 Dez</time> – <time dateTime="2027-01-02">02 Jan</time>
          </span>
        </span>

        {/* Clima: no celular vira só "30°C"; o texto completo aparece de md pra cima */}
        <span className="flex h-8 items-center gap-1.5 rounded-full border border-sky-line/70 bg-sky/60 px-2.5 text-ink shadow-soft lg:gap-2 lg:px-3">
          <SunIcon className="size-4 text-teal" />
          30°C
          <span className="hidden md:inline">· Santos Ensolarado</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
