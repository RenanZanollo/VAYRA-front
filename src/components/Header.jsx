import { SunIcon, CalendarIcon } from "./icons.jsx";


const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between drop-shadow-sm bg-sand px-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-brand">
          <SunIcon className="size-6 text-white" />
        </div>

        <div>
          <h1 className="text-xl leading-6 font-bold text-ocean">Roteiro Fim de Ano</h1>
          <p className="text-xs leading-4 text-ocean/60">Santos & Guarujá • Litoral Paulista</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm font-semibold">
        <span className="flex h-7 items-center gap-2 rounded-full border border-line bg-sand-dark px-3 text-ocean">
          <CalendarIcon className="size-3" />
          <span>
            <time dateTime="2026-12-26">26 Dez</time> – <time dateTime="2027-01-01">01 Jan</time>
          </span>
        </span>

        <span className="flex h-7 items-center gap-2 rounded-full border border-sky-line bg-sky px-3 text-ink">
          <SunIcon className="size-4 text-teal" />
          Santos 30°C Ensolarado
        </span>
      </div>
    </header>
  );
};

export default Header;