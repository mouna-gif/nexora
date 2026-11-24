import { apiRequest, tokenStore } from "./api"
import type { UserRole } from "../types"
export interface LoginPayload {
  email: string
  password: string
}
export interface RegisterCustomerPayload {
  accountType: "INDIVIDUAL" | "BUSINESS"
  firstName?: string
  lastName?: string
  companyName?: string
  taxRegistrationNumber?: string
  contactPerson?: string
  contactPersonPhone?: string
  email: string
  phone: string
  password: string
  cinLastFour?: string
  billingAddress: string
}
export interface AuthSession {
  accessToken: string
  refreshToken: string
  user: { id: string name: string role: UserRole }
}
export const authService = {
  login: async (payload: LoginPayload) => {
    const session = await apiRequest<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    })
    tokenStore.set(session.accessToken)
    return session
  },
  refresh: (refreshToken: string) =>
    apiRequest<AuthSession>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
  registerCustomer: (payload: RegisterCustomerPayload) =>
    apiRequest<{ id: string verificationRequired: boolean }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...payload, role: "CUSTOMER" }),
    }),
  logout: () => tokenStore.set(null),
}
