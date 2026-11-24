import { apiRequest } from "./api"
import type { CartItem } from "../types"
export const cartService = {
  get: () => apiRequest<CartItem[]>("/cart"),
  update: (productId: string, quantity: number) =>
    apiRequest<CartItem[]>("/cart", {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    }),
}
