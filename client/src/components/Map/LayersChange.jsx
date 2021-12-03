import React from "react"
import { LayersControl, TileLayer } from 'react-leaflet'
import { layers } from './utils/layers'

const LayersChange = () => (
    <LayersControl position='topleft'>
        <LayersControl.BaseLayer checked name="Стандартная OpenStreetMap карта">
            <TileLayer url={layers('osm').layout} />
        </ LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google карта">
            <TileLayer url={layers('googleStreets').layout} subdomains={layers('googleStreets').subdomains} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google с рельефом">
            <TileLayer url={layers('googleTerran').layout} subdomains={layers('googleTerran').subdomains}  />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google спутник">
            <TileLayer url={layers('googleHybrid').layout} subdomains={layers('googleHybrid').subdomains} />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google спутник без ярлыков">
            <TileLayer url={layers('googleSat').layout} subdomains={layers('googleSat').subdomains}/>
        </ LayersControl.BaseLayer>
    </ LayersControl>
)

export { LayersChange }