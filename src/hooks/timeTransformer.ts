export function secondsToHuman(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return 'unknown'
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export function unixToHuman(timestamp: number, locale: string | undefined = undefined): string {
  if (!Number.isFinite(timestamp)) return 'Unknown'
  const d = new Date(timestamp * 1000)
  return d.toLocaleString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

