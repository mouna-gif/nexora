import { apiRequest } from "./api"
export const inventoryService = {
  list: (query = "") =>
    apiRequest<unknown[]>(`/inventory?search=${encodeURIComponent(query)}`),
  get: (sku: string) => apiRequest<unknown>(`/inventory/${sku}`),
}
