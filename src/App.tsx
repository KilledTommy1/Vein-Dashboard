import React from 'react'
import WeatherCard from './components/WeatherCard'
import InfoCard from './components/InfoCard'
import GameMap from './components/GameMap'

export default function App(): JSX.Element {
  return (
    <div className="app-root">
      <header>
        <h1>Vein Dashboard</h1>
        </header>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', width: '100%' }}>
          <div className='flex-none'>
            <div className="spacer" > <InfoCard /> </div>
            <div className="spacer" > <WeatherCard /></div>
          </div>
          <GameMap />
        </div>
        
        
       
      
    </div>
  )
}
