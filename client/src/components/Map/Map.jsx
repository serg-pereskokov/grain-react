import React, { useState } from "react"
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import './Map.scss'
import { connect } from 'react-redux'
import { layers } from './utils/layers'
import { MapFlyTo } from "./MapSettings"
import { carIcon, endPathIcon } from "./utils/icons"
import { LayersControl } from "./LayersControl"
import { changeTileLayer } from "../../store/actions/actions"


let prevTile = null

const Map = props => {

    const changeLayoutHandler = (type) => {
        console.log('clicked');
        console.log(type);
        prevTile = props.tileLayer.layout.concat()
        props.changeTileLayer(layers(type))
    }

    console.log(prevTile);

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

    console.log(props.tileLayer);

    return (
        <MapContainer 
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
        >   
            <LayersControl click={changeLayoutHandler}/>
            {
                props.tileLayer.subdomains
                ? <TileLayer url={props.tileLayer.layout} subdomains={props.tileLayer.subdomains} />
                : <TileLayer url={props.tileLayer.layout}  />
            }
            {
                props.tileLayer.layout !== prevTile
                ? <TileLayer url={props.tileLayer.layout} subdomains={props.tileLayer.subdomains} />
                : null
            }
            {/* {
                baseMap.type === 'googleSat'
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : baseMap.type === 'googleStreets'
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : baseMap.type === 'googleHybrid'
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : baseMap.type === 'googleTerran'
                ? <TileLayer url={baseMap.current.layout} subdomains={baseMap.current.subdomains} />
                : baseMap.type === 'osm'
                ? <TileLayer url={baseMap.current.layout} />
                : null
            } */}
            {
                props.latlgn
                ? <>
                    <Polyline pathOptions={{color: 'rgba(252, 115, 3, .7)', weight: 2}} positions={props.latlgn} />
                    <Marker position={props.endPath} icon={endPathIcon}/>
                    <Marker position={props.startPath} draggable={true} eventHandlers={{
                            click: e => driveCarAnimate(e)
                        }} 
                        icon={carIcon}
                    />
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
        endPath: state.map.endPath,
        tileLayer: state.tileLayer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTileLayer: (payload) => dispatch(changeTileLayer(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
