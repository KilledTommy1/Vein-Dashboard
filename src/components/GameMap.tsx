import React, { useState } from 'react'
import map from './map.png'

export default function GameMap(): JSX.Element {

    const [isModalOpen, setIsModalOpen] = React.useState(false)

    return (
        <div className="card vertical" style={{width: '100%'}}>
            <h1 className="card-title">Game Map</h1>
            <div className="card-body">
                <img onClick={() => setIsModalOpen(true)} src={map} style={{width: '100%'}} alt="Game Map" />
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsModalOpen(false)}>
                            &times; {/* This is the 'x' character for a close button */}
                        </span>
                        <img src={map} alt={"Game Map"} className="modal-image" />
                </div>
            </div>)}
        </div>
    )
}