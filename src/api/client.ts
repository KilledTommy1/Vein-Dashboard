import axios, { AxiosRequestConfig } from 'axios'

/**
 * Lightweight HTTP client helpers for GET requests using axios.
 * Uses Vite env `VITE_VEIN_BASE_URL` or falls back to `VEIN_BASE_URL`.
 */
type Params = Record<string, string | number | boolean>

function buildUrl(path: string): string {
  if (path.includes('/api/')) return path

  const base = import.meta.env.VITE_VEIN_BASE_URL ?? import.meta.env.VEIN_BASE_URL ?? ''
  try {
    return base ? new URL(path, base).toString() : new URL(path, window.location.origin).toString()
  } catch (err) {
    try {
      return new URL(path).toString()
    } catch (err2) {
      return new URL(path, window.location.origin).toString()
    }
  }
}

function buildConfig(params?: Params, options?: { timeoutMs?: number; headers?: Record<string, string> }): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    headers: { Accept: 'application/json', ...(options?.headers ?? {}) },
    timeout: options?.timeoutMs ?? 10000,
    params: params ?? {},
    responseType: 'json',
  }
  return config
}

export async function get<T>(path: string, params?: Params, options?: { timeoutMs?: number; headers?: Record<string, string> }): Promise<T> {
  const url = buildUrl(path)
  const config = buildConfig(params, options)
  const res = await axios.get<T>(url, config)
  return res.data
}

export async function getJSON<T>(path: string, params?: Params): Promise<T> {
  return get<T>(path, params)
}

export const client = { get }
