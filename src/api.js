// Endereço da API. Em desenvolvimento usa o back local (porta 3000).
// No Vercel, configure a variável de ambiente VITE_API_URL com o endereço do back no Render.
// (Variáveis do Vite precisam começar com VITE_ pra chegar no navegador.)
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// Função base: faz o fetch, transforma em JSON e, se deu erro, joga um Error
// com a mensagem que o back mandou ("O título é obrigatório", etc.).
const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => null);

  // fetch NÃO dá erro sozinho em 400/500 — só em falha de rede.
  // Por isso a gente confere response.ok na mão.
  if (!response.ok) {
    throw new Error(data?.message ?? "Erro ao falar com o servidor");
  }

  return data;
};

export const getPlaces = () => request("/places");

export const getSchedules = () => request("/schedules");

export const createSchedule = (schedule) =>
  request("/schedules", { method: "POST", body: JSON.stringify(schedule) });

export const updateSchedule = (id, schedule) =>
  request(`/schedules/${id}`, { method: "PUT", body: JSON.stringify(schedule) });

// O back responde 204 (sem corpo); o request lida com isso devolvendo null
export const deleteSchedule = (id) => request(`/schedules/${id}`, { method: "DELETE" });
