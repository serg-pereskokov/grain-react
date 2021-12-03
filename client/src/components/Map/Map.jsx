import React from "react"
import { MapContainer, Polyline, Marker} from 'react-leaflet'
import { LayersChange } from "./LayersChange"
import './Map.scss'
import { connect } from 'react-redux'
import { MapFlyTo } from "./MapSettings"
import { carIcon, endPathIcon } from "./utils/icons"

const Map = props => {

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
            <LayersChange />
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
        endPath: state.map.endPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
