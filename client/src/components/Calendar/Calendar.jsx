import React, { useEffect } from "react"
import styles from './Calendar.module.scss'
import { connect } from "react-redux"
import { initialDate, changeDate, toggleCalendarSettings } from "../../store/actions/actions"

/*
    *** 24h => 86400 * 1000ms
    *** 1h => 3600 * 1000ms
*/

// Backup sql 04.01.2021 - 04.02.2021

// const startDay = new Date().setHours(0, 0, 0)
// const day = Date.now()

const getCalendarTimeStamp = (date) => {
    return date.toLocaleString('ua-UA', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
}   

const Calendar = ( { initialDate, changeDate, startDate, endDate, current, toggleCalendarSettings } ) => {

    useEffect(() => {
        initialDate()
    }, [initialDate])

    const changeDateHandler = step => changeDate(step, startDate, endDate, current)

    return (
        <div className={styles.Calendar}>
            <div className={`material-icons ${styles.btnNav}`} onClick={() => changeDateHandler('prev')}>chevron_left</div>
            <div className={styles.calendarView} onClick={() => toggleCalendarSettings()}>
                <span className={`material-icons ${styles.iconPos}`}>date_range</span>
                <span className={styles.prevDate}>
                    { getCalendarTimeStamp(new Date(startDate)) }
                </span>
                &ensp;-&ensp;
                <span className={styles.currentDate}>
                    { getCalendarTimeStamp(new Date(endDate)) }
                </span>
            </div>
            <div className={`material-icons ${styles.btnNav} ${styles.btnNavRight}`} onClick={() => changeDateHandler('next')}>chevron_right</div>
        </div>
    )
}

const mapStateToProps = ({datePeriod}) => {
    return {
        startDate: datePeriod.startDate,
        endDate: datePeriod.endDate,
        current: datePeriod.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialDate: () => dispatch(initialDate()),
        changeDate: (step, startDate, endDate, currnt) => dispatch(changeDate(step, startDate, endDate, currnt)),
        toggleCalendarSettings: () => dispatch(toggleCalendarSettings())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar)