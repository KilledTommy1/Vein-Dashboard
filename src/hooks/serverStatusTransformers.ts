import { ServerStatusResponse } from '../types/serverTypes'
import { secondsToHuman } from './timeTransformer'

export type ServerStatus = {
  uptime: { seconds: number; human: string }
  numberOfPlayersOnline?: number
}

export function transformStatus(raw: ServerStatusResponse): ServerStatus {
  const seconds = Number(raw?.uptime ?? -1)
  const online = raw?.onlinePlayers
  const numberOfPlayersOnline = Object.keys(online ?? {}).length

  return {
    uptime: { seconds: seconds || 0, human: seconds ? secondsToHuman(seconds) : 'unknown' },
    numberOfPlayersOnline,
  }
}

