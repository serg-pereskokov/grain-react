import React from "react"
import './Loader.scss'

const Loader = () => (
    <div className="Loader">
        <div className="lds-ripple">
            <div />
            <div />
        </div>
        Идёт обработка запроса...
    </div>
)

export { Loader }