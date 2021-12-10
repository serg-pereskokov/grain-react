import React from "react"
import styles from './TrackDown.module.scss'
import { TrackDownExplorer } from "./TrackDownExplorer/TrackDownExplorer"
import { TrackDownTree } from "./TrackDownTree/TrackDownTree"
import { connect } from 'react-redux'
import { getDataGPS } from "../../../store/actions/actions"

const TrackDown = ({ getDataGPS, startDate, endDate }) => {

    console.log(startDate, endDate);
    const dataState = (data) => {
        console.log('TrackDown state' , data);
        getDataGPS({
            mobitelIds: data,
            startDate,
            endDate,
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
                <TrackDownTree />
                <TrackDownExplorer getDataState={dataState}/>
            </div>
        </div>
    )
}

const mapStateToProps = ({ datePeriod }) => {
    return {
        startDate: datePeriod.startDate,
        endDate: datePeriod.endDate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDataGPS: (payload) => dispatch(getDataGPS(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDown)