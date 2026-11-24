import { apiRequest } from "./api"
import type { PaginatedResponse, Product } from "../types"
export const productsService = {
  list: (query = "") =>
    apiRequest<PaginatedResponse<Product>>(`/products?${query}`),
  get: (id: string) => apiRequest<Product>(`/products/${id}`),
}
