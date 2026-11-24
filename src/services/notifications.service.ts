import { apiRequest } from "./api"
export const notificationsService = {
  list: () => apiRequest<unknown[]>("/notifications"),
  markRead: (id: string) =>
    apiRequest<void>(`/notifications/${id}/read`, { method: "PATCH" }),
}
