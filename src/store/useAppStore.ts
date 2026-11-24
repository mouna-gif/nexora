import { create } from "zustand"
import type { CartItem, CustomerProfile, Product, UserRole } from "../types"

interface AppState {
  role: UserRole
  session: "anonymous" | "guest" | "authenticated"
  customerProfile: CustomerProfile
  cart: CartItem[]
  setRole: (role: UserRole) => void
  setSession: (session: AppState["session"]) => void
  setCustomerProfile: (profile: CustomerProfile) => void
  addToCart: (product: Product, quantity: number) => void
  changeQuantity: (productId: string, delta: number) => void
  removeFromCart: (productId: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  role: "CUSTOMER",
  session: "anonymous",
  customerProfile: {
    id: "mock-customer-1",
    accountType: "INDIVIDUAL",
    firstName: "Amira",
    lastName: "Ben Salem",
    email: "amira.bensalem@email.tn",
    phone: "+216 22 345 678",
    cinLastFour: "••••",
    billingAddress: "12, rue des Jasmins, La Marsa 2070",
  },
  cart: [],
  setRole: (role) => set({ role }),
  setSession: (session) => set({ session }),
  setCustomerProfile: (customerProfile) => set({ customerProfile }),
  addToCart: (product, quantity) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id)
      return {
        cart: existing
          ? state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [...state.cart, { product, quantity }],
      }
    }),
  changeQuantity: (productId, delta) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
}))
