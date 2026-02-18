import React, { useEffect, useState } from 'react'
import { fetchServerWeather } from '../api/vein'
import { ServerWeatherResponse } from '../types/serverTypes'
import { celsiusToFahrenheit, getDirection, weatherType } from '../hooks/weatherTransformer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faCloud, faCloudShowersHeavy, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'


export default function WeatherCard(): JSX.Element {
  
    const [serverWeather, setServerWeather] = useState<ServerWeatherResponse | null>(null)
    const [serverWeatherType, setServerWeatherType] = useState<string | null>(null)
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
    fetchServerWeather()
      .then((res) => {
        if (!mounted) return
        setServerWeather(res)
        setServerWeatherType(res ? weatherType(res.precipitation, res.temperature, res.cloudiness, res.fog, res.windForce) : "None")
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
  return (
    
    <section className={`card card vertical`}>
      {<h1 className="card-title">Weather</h1>}
      {((serverWeatherType == "Rain" || serverWeatherType == "Storm") &&  <FontAwesomeIcon size='5x' icon={faCloudShowersHeavy}  />)}
      {((serverWeatherType?.includes("Fog") || serverWeatherType == "Cloudy") &&  <FontAwesomeIcon size='5x' icon={faCloud}  />)}
      {((serverWeatherType == "Snow" || serverWeatherType == "Blizzard") &&  <FontAwesomeIcon size='5x' icon={faSnowflake}  />)}
      {(serverWeatherType == "Clear" &&  <FontAwesomeIcon size='5x' icon={faSun}  />)}
 
      <div className="card-body">Weather Type: {serverWeatherType}</div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="card-body">Wind Direction: {serverWeather?.windDirection ? getDirection(serverWeather?.windDirection < 180 ? serverWeather?.windDirection+180 : serverWeather?.windDirection-180) : "N/A"}</div>
        <div style={{paddingLeft: "10px"}}><FontAwesomeIcon icon={faArrowUp} transform={{rotate: serverWeather?.windDirection ?(serverWeather?.windDirection < 180 ? serverWeather?.windDirection+180 : serverWeather?.windDirection-180) : 0}} /></div>
      </div>
      
      <div className="card-body">Fog: {serverWeather?.fog ? (serverWeather?.fog === 1 ? 1 : serverWeather?.fog.toFixed(2).toString().slice(2) ) : 0}%</div>
      <div className="card-body">Humidity: {serverWeather?.relativeHumidity ? (serverWeather?.relativeHumidity === 1 ? 1 : serverWeather?.relativeHumidity.toFixed(2).toString().slice(2) ) : 0}%</div>
      <div className="card-body">Temperature °F: {serverWeather ? celsiusToFahrenheit(serverWeather.temperature).toFixed(2) : 0}</div>
      <div className="card-body">Cloud Coverage: {serverWeather?.cloudiness ? (serverWeather?.cloudiness === 1 ? 1 : serverWeather?.cloudiness.toFixed(2).toString().slice(2) ) : 0}%</div>
    </section>
  )
}
