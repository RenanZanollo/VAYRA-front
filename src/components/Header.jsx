import { SunIcon, CalendarIcon } from "./icons.jsx";

const Header = () => {
  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-line/50 bg-sand/90 px-6 shadow-soft backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand to-sunset shadow-md shadow-brand/30">
          <SunIcon className="size-6 text-white" />
        </div>

        <div>
          <h1 className="font-title text-xl leading-6 font-bold tracking-tight text-ocean">
            Roteiro Fim de Ano
          </h1>
          <p className="text-xs leading-4 text-ocean/60">Santos & Guarujá • Litoral Paulista</p>
        </div>
      </div>

      <div className="flex items-center gap-3 font-jakarta text-sm font-semibold">
        <span className="flex h-8 items-center gap-2 rounded-full border border-line/70 bg-white/70 px-3 text-ocean shadow-soft">
          <CalendarIcon className="size-3.5 text-brand" />
          <span>
            <time dateTime="2026-12-28">28 Dez</time> – <time dateTime="2027-01-02">02 Jan</time>
          </span>
        </span>

        <span className="flex h-8 items-center gap-2 rounded-full border border-sky-line/70 bg-sky/60 px-3 text-ink shadow-soft">
          <SunIcon className="size-4 text-teal" />
          Santos 30°C Ensolarado
        </span>
      </div>
    </header>
  );
};

export default Header;
