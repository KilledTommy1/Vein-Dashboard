import React, { useEffect, useState } from 'react'
import { fetchServerStatus, fetchServerTime } from '../api/vein'
import { unixToHuman } from '../hooks/timeTransformer'
import { ServerStatus, transformStatus } from '../hooks/serverStatusTransformers'

export default function InfoCard(): JSX.Element {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null)
  const [serverTime, setServerTime] = useState<string | null>(null)
  const [ticking, setTicking] = useState(true)
  const [count, setCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())


  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      const timer = setTimeout(() => ticking && setCount(count+1), 1e3)
      if(count% 60 === 0) {
        setLastUpdate(new Date())
      }
  
      return () => clearTimeout(timer)
     }, [count, ticking])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchServerStatus()
      .then((res) => {
        if (!mounted) return
       
        setServerStatus( transformStatus(res))
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.message ?? String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [lastUpdate])

    useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchServerTime()
      .then((res) => {
        if (!mounted) return

        setServerTime(unixToHuman((res.unixSeconds + 18000)))
      })
      .catch((err) => {
        if (!mounted) return
        setError(err?.message ?? String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [lastUpdate])



  const playersCount = serverStatus?.numberOfPlayersOnline ?? 0

  return (
    <section className={`card card vertical`}>
      <div style={{display: "flex", flexDirection: "column", justifyItems:"left"}}>
      {<h1 className="card-title">Server Info</h1>}
      <span style={{fontSize: "0.8rem", color: "gray"}}>Last Updated: {lastUpdate.toLocaleTimeString()}</span>
      </div>
      
      <div className="card-body">Server Status: {serverStatus ? 'Online' : 'Offline'}</div>
      <div className="card-body">
        {loading
          ? 'Loading server status...'
          : error
          ? `Error: ${error}`
          : serverStatus
          ? `Uptime: ${serverStatus.uptime.human}`
          : 'No data'}
      </div>
      <div className="card-body">Server Time: {serverTime}</div>
      <div className="card-body">Players Online: {playersCount}</div>
    </section>
  )
}