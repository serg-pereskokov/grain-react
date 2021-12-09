import { useMap, useMapEvents } from "react-leaflet"
import L from 'leaflet'
import React, { useState, useEffect, useRef } from "react"
import { timestampToHoursAndMinutes } from '../../utils/utils'

const MapFlyTo = props => {

    const map = useMap()

    // console.log(props.center);
    map.setView(props.center, props.zoom)

    // console.log('map center: ', map.getCenter());
    // console.log('map bounds: ', map.getContainer());

    return null
}

const AnimationMarkers = props => {

    const [state, setState] = useState({
        layers: [],
        isAnimate: false,
        animateInterval: null,
        animateSec: 25
    })

    const rangeDate = props.endDate - props.startDate

    console.log('date: ', rangeDate)
    console.log('data right time', timestampToHoursAndMinutes(rangeDate, 'Hours&Minutes&Seconds'));

    const range = useRef(null)
    const map = useMap()

    
    // const control = L.Control.extend({
    //     options: {
    //         position: 'bottomleft'
    //     },
    //     onAdd: (map) => {
    //         let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom')

    //         container.style = `
    //             background: #fff;
    //             width: 100px;
    //             height: 100px;            
    //         `

    //         container.onclick = () => {
    //             console.log('clicked');
    //         }

    //         container.onmouseover = () => map.dragging.disable();
    //         container.onmouseout = () => map.dragging.enable();


    //         return container
    //     }
    // })

    // map.addControl(new control())

    useEffect(() => {
        let layers = []
        sessionStorage.setItem('animateStep', 0)

        map.eachLayer(layer => { 
            if(layer.options.icon && layer.options.icon.options && layer.options.icon.options.className === "leaflet-div-icon-car") layers.push(layer)
        })

        setState(s => {
            return {
                ...s,
                layers: layers
            }
        })

    }, [map])

    const animateDrive = () => {

        let animateStep = sessionStorage.getItem('animateStep')*1

        const drive = setInterval(() => {

            if (animateStep < 86400 * 1000) {

                for (let x = 0; x < state.layers.length; x++) {

                    if (props.cars[x].latlng[animateStep]) {
                        state.layers[x].setLatLng(props.cars[x].latlng[animateStep])
                        // console.log(props.cars[x].latlng[counter])
                    }
                }
                
                sessionStorage.setItem('animateStep', animateStep)
                range.current.value = sessionStorage.getItem('animateStep')
                animateStep++

            } else clearInterval(drive)
        }, state.animateSec)

        setState(() => {
            return {
                ...state,
                isAnimate: true,
                animateInterval: drive
            }
        })

    }

    const pauseAnimateDrive = () => {
        clearInterval(state.animateInterval)

        setState(() => {
            return {
                ...state,
                isAnimate: false,
            }
        })
    }

    const stopAnimateDrive = () => {
        sessionStorage.setItem('animateStep', 0)
        pauseAnimateDrive()

        for (let x = 0; x < state.layers.length; x++) {

            if (props.cars[x].latlng[0]) {
                state.layers[x].setLatLng(props.cars[x].latlng[0])
            }
        }
    }

    const changeCarsPositionHandler = (target) => {

        if (state.animateInterval) pauseAnimateDrive()

        sessionStorage.setItem('animateStep', target.value*1)

        // console.log(range.current.value);

        for (let x = 0; x < state.layers.length; x++) {

            if (props.cars[x].latlng[target.value]) {
                state.layers[x].setLatLng(props.cars[x].latlng[target.value])
            }
        }
    }

    return (
        <div className="timeLine" onMouseOver={() => map.dragging.disable()} onMouseOut={() => map.dragging.enable()}>
            <div
                onClick={
                    state.isAnimate
                    ? () => pauseAnimateDrive()
                    : () => animateDrive()
                } 
                className="material-icons buttonStartPause"
            >
                {state.isAnimate ? `pause` : `play_arrow`}
            </div>
            <div 
                className="material-icons buttonStop"
                onClick={() => stopAnimateDrive()}
            >stop</div>
            <input type="range" 
                min={0} 
                max={8640} 
                step={1} 
                value={sessionStorage.getItem('animateStep')}
                ref={range}
                onInput={e => changeCarsPositionHandler(e.target)}
            />
            <div className="speed">
                <div className="slower material-icons">chevron_left</div>
                <span>×10</span>
                <div className="faster material-icons">chevron_right</div>
            </div>
        </div>
    )
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
    MapChangeLayout,
    AnimationMarkers
}