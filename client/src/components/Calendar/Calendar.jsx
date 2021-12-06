import React, { useEffect } from "react"
import styles from './Calendar.module.scss'
import { connect } from "react-redux"
import { initialDate, changeDate } from "../../store/actions/actions"

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

const Calendar = ( { initialDate, changeDate, startDay, endDay, current } ) => {

    useEffect(() => {
        initialDate()
    }, [initialDate])

    const changeDateHandler = step => changeDate(step, startDay, endDay, current)

    return (
        <div className={styles.Calendar}>
            <div className={`material-icons ${styles.btnNav}`} onClick={() => changeDateHandler('prev')}>chevron_left</div>
            <div className={styles.calendarView}>
                <span className={`material-icons ${styles.iconPos}`}>date_range</span>
                <span className={styles.prevDate}>
                    { getCalendarTimeStamp(new Date(startDay)) }
                </span>
                &ensp;-&ensp;
                <span className={styles.currentDate}>
                    { getCalendarTimeStamp(new Date(endDay)) }
                </span>
            </div>
            <div className={`material-icons ${styles.btnNav} ${styles.btnNavRight}`} onClick={() => changeDateHandler('next')}>chevron_right</div>
        </div>
    )
}

const mapStateToProps = ({datePeriod}) => {
    return {
        startDay: datePeriod.startDay,
        endDay: datePeriod.endDay,
        current: datePeriod.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialDate: () => dispatch(initialDate()),
        changeDate: (step, startDay, endDay, currnt) => dispatch(changeDate(step, startDay, endDay, currnt))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Calendar)