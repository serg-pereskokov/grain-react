import React, { useState } from "react"
import styles from './Calendar.module.scss'

/*
    *** 24h => 86400 * 1000ms
    *** 1h => 3600 * 1000ms
*/

// Backup sql 04.01.2021 - 04.02.2021

const startDay = new Date().setHours(0, 0, 0)
const day = Date.now()

const getCalendarTimeStamp = (date) => {
    return date.toLocaleString('ua-UA', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'})
}   

const Calendar = props => {

    const [dateState, setDateState] = useState({
        startDay,
        endDay : day,
        current: day
    })

    const changeDateHandler = step => {

        if (step === 'prev') {
            setDateState(() => {
                return {
                    ...dateState,
                    startDay: dateState.startDay - (86400 * 1000),
                    endDay: dateState.startDay - 1000
                }
            })
        } else {

            setDateState(() => {
                return {
                    ...dateState,
                    startDay: dateState.startDay + (86400 * 1000) < dateState.current ? dateState.startDay + (86400 * 1000) : dateState.startDay,
                    endDay: dateState.endDay + (86400 * 1000)  < dateState.current ? dateState.endDay + (86400 * 1000) : dateState.current
                }
            })
        }
    }

    return (
        <div className={styles.Calendar}>
            <div className={`material-icons ${styles.btnNav}`} onClick={() => changeDateHandler('prev')}>chevron_left</div>
            <div className={styles.calendarView}>
                <span className={`material-icons ${styles.iconPos}`}>date_range</span>
                <span className={styles.prevDate}>
                    { getCalendarTimeStamp(new Date(dateState.startDay)) }
                </span>
                &ensp;-&ensp;
                <span className={styles.currentDate}>
                    { getCalendarTimeStamp(new Date(dateState.endDay)) }
                </span>
            </div>
            <div className={`material-icons ${styles.btnNav} ${styles.btnNavRight}`} onClick={() => changeDateHandler('next')}>chevron_right</div>
        </div>
    )
}


export default Calendar