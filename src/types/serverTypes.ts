export type ServerStatusResponse = {
  uptime: number
  onlinePlayers: Array<{
    [key: string]: {
        characterId: string
        timeConnected: number
        name: string
        status: string
    }
  }>
}

export type ServerTimeResponse = {
  unixSeconds: number
}

export type ServerWeatherResponse = {
  precipitation: number,
  cloudiness: number,
  temperature: number,
  fog: number,
  pressure: number,
  relativeHumidity: number,
  windDirection: number,
  windForce: number
}

