import React from "react"
import { MapContainer, TileLayer, Polyline, useMap, useMapEvents, Marker } from 'react-leaflet'
import './Map.scss'
import { connect } from 'react-redux'

const Map = props => {
    // const [stateMap, setStateMap] = useState({
    //     zoom: 7,
    //     carPolyline: null
    // })


    // const [contentState] = props.state;

    // useEffect(() => {
        
    // })

    // if (contentState.getCar) {
    //     // const data = [...contentState.getCar.data]
    //     // let carPolyline = data.map( item => {
    //     //    return item.coords
    //     // })

    //     // setStateMap(() => {
    //     //     return {
    //     //         ...setStateMap,
    //     //         carPolyline
    //     //     }
    //     // })
    //     setStateMap(() => {
    //         return {
    //             ...stateMap,
    //             zoom: 10
    //         }
    //     })
    // }

    const Test = () => {
        const map = useMap()
        // const events = useMapEvents({
        //     baselayerchange() {
        //         events.flyTo(props.latlng[0], events.getZoom())
        //     }
        // })

        console.log(props.center);
        map.flyTo( props.center, props.zoom)

        console.log('map center: ', map.getCenter());
        return null
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
                    <Marker position={props.startPath} />
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
