import { getJSON } from './client'
import type { ServerStatusResponse, ServerTimeResponse, ServerWeatherResponse } from '../types/serverTypes'


export async function fetchServerStatus(): Promise<ServerStatusResponse> {
  return getJSON<ServerStatusResponse>('/api/status')
}

export async function fetchServerTime(): Promise<ServerTimeResponse> {
  return getJSON<ServerTimeResponse>('/api/time')
}

export async function fetchServerWeather(): Promise<ServerWeatherResponse> {
  return getJSON<ServerWeatherResponse>('/api/weather')
}