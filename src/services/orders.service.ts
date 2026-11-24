import { apiRequest } from "./api"
export interface OrderRequest {
  addressId: string
  deliveryMethod: string
  paymentMethod: string
}
export const ordersService = {
  list: () => apiRequest<unknown[]>("/orders"),
  get: (id: string) => apiRequest<unknown>(`/orders/${id}`),
  create: (data: OrderRequest) =>
    apiRequest<unknown>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
