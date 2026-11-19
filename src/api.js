const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => null);

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

export const deleteSchedule = (id) => request(`/schedules/${id}`, { method: "DELETE" });
