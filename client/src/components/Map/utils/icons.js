import iconCar from '../../../assets/icon-marker-car.svg'
import iconEndPath from '../../../assets/icon-marker-finish-path.svg'
import L from 'leaflet'

const carIcon = new L.Icon({
    iconUrl: iconCar,
    iconRetinaUrl: null,
    iconAnchor: [30, 75],
    popupAnchor: [30, 75],
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon-car'
})

const endPathIcon = new L.Icon({
    iconUrl: iconEndPath,
    iconRetinaUrl: null,
    iconAnchor: [30, 75],
    popupAnchor: [0, -75],
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon-finish'
})

export {
    carIcon,
    endPathIcon
}