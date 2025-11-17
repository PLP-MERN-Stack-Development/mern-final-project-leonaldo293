import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("foodshare_token")

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    // Token expired or invalid, redirect to login
    localStorage.removeItem("foodshare_token")
    window.location.href = "/login"
    throw new Error("Sessão expirada. Faça login novamente.")
  }

  return response
}
