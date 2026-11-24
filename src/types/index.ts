export type UserRole = "CUSTOMER" | "SALES_EMPLOYEE" | "STOCK_MANAGER" | "DELIVERY_EMPLOYEE" | "ADMIN"
export type CustomerAccountType = "INDIVIDUAL" | "BUSINESS"

export interface Customer {
  id: string
  accountType: "INDIVIDUAL"
  firstName: string
  lastName: string
  email: string
  phone: string
  cinLastFour?: string
  billingAddress: string
}

export interface BusinessCustomer {
  id: string
  accountType: "BUSINESS"
  companyName: string
  taxRegistrationNumber: string
  contactPerson: string
  contactPersonPhone?: string
  email: string
  phone: string
  billingAddress: string
}

export type CustomerProfile = Customer | BusinessCustomer

export interface InvoiceLine {
  description: string
  quantity: number
  unit: Product["unit"]
  unitPrice: number
  total: number
}

export interface InvoicePreview {
  number?: string
  date?: string
  customer: CustomerProfile
  lines: InvoiceLine[]
  taxes?: Array<{ label: string total: number }>
  total: number
}

export interface Product {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  unit: "pièce" | "m²" | "carton" | "boîte"
  image: string
  description: string
  dimensions: string
  inStock: boolean
  badge?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  total: number
  totalPages: number
}
