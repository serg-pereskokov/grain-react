import React, { useState } from "react"
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import './Map.scss'
import { connect } from 'react-redux'
import { layers } from './utils/layers'
import { MapFlyTo } from "./MapSettings"
import { carIcon, endPathIcon } from "./utils/icons"
import { LayersControl } from "./LayersControl"

const Map = props => {

    const [baseMap, setBaseMap] = useState({
        current: layers('osm'),
        type: 'osm',
        change: false
    })

    const changeLayoutHandler = () => {
        console.log('clicked');
        setBaseMap(() => {
            return {
                ...baseMap,
                current: layers('googleStreets'),
                type: 'googleStreets',
                change: true
            }
        })

        console.log(baseMap.change);
    }

    const driveCarAnimate = ({ target }) => {
        let counter = 0
        // console.log(target.getLatLng());
        // target.setLatLng([49.447767, 31.409793])
        // console.log(target.getLatLng());
        // console.log('click');

        const drive = setInterval(() => {
            if (counter < props.latlgn.length) {
                target.setLatLng(props.latlgn[counter])
                counter++
            } else clearInterval(drive)
        }, 1000 / 10)

    }

    return (
        <MapContainer 
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
        >   
            <LayersControl click={changeLayoutHandler}/>
            {
                baseMap.current.subdomains
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : <TileLayer url={baseMap.current.layout}  />
            }
            {
                baseMap.change
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : null
            }
            {
                props.latlgn
                ? <>
                    <Polyline pathOptions={{color: 'purple'}} positions={props.latlgn} />
                    <Marker position={props.startPath} draggable={true} eventHandlers={{
                            click: e => driveCarAnimate(e)
                        }} 
                        icon={carIcon}
                    />
                    <Marker position={props.endPath} icon={endPathIcon}/>
                    <MapFlyTo center={props.center} zoom={props.zoom} />
                  </>
                : null
            }
        </MapContainer>
    )
}


const mapStateToProps = (state) => {
    return {
        center: state.map.center,
        zoom: state.map.zoom,
        latlgn: state.gpsData,
        startPath: state.map.startPath,
        endPath: state.map.endPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
