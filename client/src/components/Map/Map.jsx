import React from "react"
import { MapContainer, Polyline, Marker, Popup, Tooltip} from 'react-leaflet'
import { LayersChange } from "./LayersChange"
import './Map.scss'
import { connect} from 'react-redux'
import { MapFlyTo, AnimationMarkers } from "./MapSettings"
import { carIcon, endPathIcon } from "./utils/icons"

const Map = props => {

    // console.log(props.gpsData);


    const cars = []
    const colors = ['#7cf700','#33a9f4','#e40102', '#33a9f4', '#7cf700']

    if (props.gpsData) {
        for (let car of props.gpsData) {
            let arr = car.array.map(item => {
                return item.coords
            })

            if (arr.length !== 0)
                cars.push({id: car.id, latlng: arr})
        }
    }

    return (
        <MapContainer 
            center={props.center}
            zoom={props.zoom}
            scrollWheelZoom={true}
        >   
            <LayersChange />
            {
                cars.length !== 0
                ? <>
                    {
                        cars.map((item, index) => {
                            return(
                                <React.Fragment key={index}>
                                    <Polyline 
                                        pathOptions={{
                                            color: `${colors[index]}`,
                                            weight: 2}} 
                                        positions={item.latlng} 
                                    >
                                        <Popup>Car id {item.id} path</Popup>
                                    </Polyline>
                                    <Marker position={item.latlng[0]} icon={carIcon}>
                                    <Tooltip direction="top" offset={[0, -75]} opacity={1} permanent>
                                        Car id {item.id}
                                    </Tooltip>
                                    </Marker>
                                    {/* <Marker position={item.latlng[item.latlng.length - 1]} icon={endPathIcon}>
                                        <Popup>
                                            Car id {item.id}
                                        </Popup>
                                    </Marker> */}
                                </ React.Fragment>
                            )
                        })
                    }
                    <AnimationMarkers cars={cars} startDate={props.startDate} endDate={props.endDate}/>
                    <MapFlyTo center={props.center} zoom={props.zoom} />
                </>
                : null
            }
            {/* {
                props.latlgn
                ? <>
                    <Polyline pathOptions={{color: 'rgba(252, 115, 3, .7)', weight: 2}} positions={props.latlgn} />
                    <Marker position={props.endPath} icon={endPathIcon}/>
                    <Marker position={props.startPath} draggable={true} eventHandlers={{
                            // click: e => driveCarAnimate(e)
                        }} 
                        icon={carIcon}
                    />
                    <MapFlyTo center={props.center} zoom={props.zoom} />
                  </>
                : null
            } */}
        </MapContainer>
    )
}


const mapStateToProps = (state) => {
    return {
        center: state.map.center,
        zoom: state.map.zoom,
        gpsData: state.gpsData,
        startPath: state.map.startPath,
        endPath: state.map.endPath,
        startDate: state.datePeriod.startDate,
        endDate: state.datePeriod.endDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
