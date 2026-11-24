import { apiRequest } from "./api"
export const deliveryService = {
  assigned: () => apiRequest<unknown[]>("/deliveries/assigned"),
  updateStatus: (id: string, status: string) =>
    apiRequest<unknown>(`/deliveries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
}
