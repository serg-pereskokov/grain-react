import React, { useState } from "react"
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import allCars from '../../../../assets/trackDownSettings.json'
import styles from './TrackDownTree.module.scss'

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
    ],
}];

const TrackDownTree = () => {
    const [state, setState] = useState({
        checked: [],
        expanded: []
    })


    console.log('state', state);



    return (
        <CheckboxTree 
            nodes={allCars}
            checked={state.checked}
            expanded={state.expanded}
            onCheck={checked => setState({checked})}
            onExpand={expanded => setState({expanded})}
            icons={{
                check: <span className="material-icons">check_circle</span>,
                uncheck: <span className="material-icons">radio_button_unchecked</span>,
                halfCheck: <span className="rct-icon rct-icon-half-check" />,
                expandClose: <span className="rct-icon rct-icon-expand-close" />,
                expandOpen: <span className="rct-icon rct-icon-expand-open" />,
                expandAll: <span className="rct-icon rct-icon-expand-all" />,
                collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                parentClose: <span className="rct-icon rct-icon-parent-close" />,
                parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                leaf: <span className="rct-icon rct-icon-leaf" />,
            }}
        />
    )
}

export { TrackDownTree }