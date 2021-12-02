import { useMap, useMapEvents } from "react-leaflet"

const MapFlyTo = props => {

    const map = useMap()

    console.log(props.center);
    map.setView( props.center, props.zoom)

    console.log('map center: ', map.getCenter());

    return null
}

const MapChangeLayout = () => {

    useMapEvents({
        baselayerchange() {
            console.log('changed!');
        }
    })

    return null
}

export { 
    MapFlyTo,
    MapChangeLayout
}