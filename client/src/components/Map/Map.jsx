import React from "react"
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import './Map.scss'

const Map = props => (
    <MapContainer center={props.initPosition} zoom={7} scrollWheelZoom={true}>
        <TileLayer url={props.theme} />
        <Polygon pathOptions={{ color: 'purple' }} positions={props.multiPolygon} />
    </MapContainer>
)

export { Map }
