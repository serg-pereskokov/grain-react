import React, { useState } from "react"
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet'
import './Map.scss'
import { connect } from 'react-redux'
import { layers } from './utils/layers'
import { MapFlyTo, MapChangeLayout } from "./MapSettings"
import { carIcon, endPathIcon } from "./utils/icons"

const Map = props => {

    const [baseMap, setBaseMap] = useState(layers('googleSat'))

    const changeLayoutHandler = (e) => {
        console.log('clicked');
        console.log(e);
    }

    // document.addEventListener('keydown', (e) => {
    //     console.log(e);

    //     if ( e.key === 'Enter') {
    //         setBaseMap(layers('googleStreets'))
    //     }
    // })

    const LayersControl = () => {
        return (
            <div className="LayersControl">
                Change Layer
            </div>
        )
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
                // counter = (counter + 1) % 200;
            } else clearInterval(drive)
        }, 1000 / 10)

    }

    return (
        <MapContainer 
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
        >   
            {
                baseMap.subdomains
                ? <TileLayer url={baseMap.layout} subdomains={baseMap.subdomains} />
                : <TileLayer url={baseMap.layout}  />
            }
            <LayersControl eventHandlers={{
                click: e => changeLayoutHandler(e)
            }}/>
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
