import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Polygon, Polyline } from 'react-leaflet'
import './Map.scss'

const Map = props => {
    const [stateMap, setStateMap] = useState({
        zoom: 7,
        carPolyline: null
    })


    const [contentState] = props.state;

    // useEffect(() => {
        
    // })

    if (contentState.getCar) {
        // const data = [...contentState.getCar.data]
        // let carPolyline = data.map( item => {
        //    return item.coords
        // })

        // setStateMap(() => {
        //     return {
        //         ...setStateMap,
        //         carPolyline
        //     }
        // })
        setStateMap(() => {
            return {
                ...stateMap,
                zoom: 10
            }
        })
    }

    return (
        <MapContainer center={props.initPosition} zoom={stateMap.zoom} scrollWheelZoom={true}>
            <TileLayer url={props.theme} />
            {
                // stateMap.carPolyline
                // ? <Polyline pathOptions={{color: 'purple'}} positions={stateMap.carPolyline} />
                // : null
            }
            <Polygon pathOptions={{ color: 'purple'  }} positions={props.multiPolygon} />
        </MapContainer>
    )
}

export { Map }
