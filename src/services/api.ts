const API_URL =
  import.meta.env.VITE_API_URL || import.meta.env.EXPO_PUBLIC_API_URL || ""

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

let accessToken: string | null = null
export const tokenStore = {
  get: () => accessToken,
  set: (token: string | null) => {
    accessToken = token
  },
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!API_URL)
    throw new ApiError(
      0,
      "API non configurée — utilisation des données de démonstration",
    )
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...init.headers,
    },
  })
  if (!response.ok)
    throw new ApiError(response.status, "Une erreur est survenue")
  return response.json() as Promise<T>
}
