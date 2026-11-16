export const tripDays = [
  { date: "2026-12-28", title: "Chegada & Praias Selvagens", summary: "Descida da serra, check-in e primeira praia." },
  { date: "2026-12-29", title: "titulo aqui", summary: "Esse é o resumo" },
  { date: "2026-12-30", title: "titulo aqui", summary: "Esse é o resumo" },
  { date: "2026-12-31", title: "titulo aqui", summary: "Esse é o resumo" },
  { date: "2027-01-01", title: "titulo aqui", summary: "Esse é o resumo" },
  { date: "2027-01-02", title: "Réveillon", summary: "Esse é o resumo" },
];

export const formatDayLabel = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const weekday = date
    .toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" })
    .replace(".", "")
    .toUpperCase();
  const day = date.getUTCDate();

  return { weekday, day };
};

export const formatLongDate = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00Z`);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
};
