import React from "react"
import styles from './TrackDown.module.scss'
import { TrackDownExplorer } from "./TrackDownExplorer/TrackDownExplorer"
import { connect } from 'react-redux'
import { getDataGPS } from "../../../store/actions/actions"

const TrackDown = ({ getDataGPS, startDay, endDay }) => {

    console.log(startDay, endDay);
    const dataState = (data) => {
        console.log('TrackDown state' , data);
        getDataGPS({
            mobitelIds: data,
            startDay,
            endDay,
            sqlDB: 'mca_dispatcher'
        })
    }


    return (
        <div className={styles.TrackDown}>
            <div className={styles.header}>Выбор техники</div>
            <div className={styles.searchBlock}>
                <input type="text" placeholder='Поиск' className={styles.search}/>
                <i className='material-icons'>search</i>
            </div>
            <div className={styles.explorer}>
                <TrackDownExplorer getDataState={dataState}/>
            </div>
        </div>
    )
}

const mapStateToProps = ({ datePeriod }) => {
    return {
        startDay: datePeriod.startDay,
        endDay: datePeriod.endDay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataGPS: (payload) => dispatch(getDataGPS(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDown)