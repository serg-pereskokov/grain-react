import React, { useState } from "react"

const LayersControl = props => {

    const [state, setState] = useState({show: false})

    const Controls = () => {
        const types = ['osm', 'googleSat', 'googleStreets', 'googleHybrid', 'googleTerran']

        return (
            <ul className="Controls">
                {
                    types.map((type, index) => {
                        return <li key={`${type}_${index}`} onClick={ () => {props.click(type)} }>{type}</li>
                    })
                }
            </ul>
        )
    }

    const showHandler = () => {
        setState({
            show: !state.show
        })
    }

    return (
        <>
            <div className="LayersControl material-icons" onClick={showHandler}>
                {state.show ? 'layers_clear' : 'layers'}
            </div>
            {
                state.show
                ? <Controls />
                : null
            }
        </>
    )
}

export { LayersControl }