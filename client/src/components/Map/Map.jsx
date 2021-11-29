import React from "react"
import { MapContainer, TileLayer, Polyline, useMap, Marker } from 'react-leaflet'
import './Map.scss'
import { connect } from 'react-redux'
import L from 'leaflet'
import iconCar from '../../assets/icon-marker-car.svg'

const Map = props => {

    const Test = () => {
        const map = useMap()

        console.log(props.center);
        map.flyTo( props.center, props.zoom)

        console.log('map center: ', map.getCenter());
        return null
    }

    const carIcon = new L.Icon({
        iconUrl: iconCar,
        iconRetinaUrl: null,
        iconAnchor: [30, 75],
        popupAnchor: null,
        iconSize: new L.Point(60, 75),
        className: 'leaflet-div-icon'
    })

    console.log(props.latlgn);

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
        }, 1000 / 60)

    }

    return (
        <MapContainer 
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
        >   
            <TileLayer url={props.theme} />
            {
                props.latlgn
                ? <>
                    <Polyline pathOptions={{color: 'purple'}} positions={props.latlgn} />
                    <Marker position={props.startPath} draggable={true} eventHandlers={{
                            click: e => driveCarAnimate(e)
                        }} 
                        icon={carIcon}
                    />
                    <Marker position={props.endPath} />
                    <Test />
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
