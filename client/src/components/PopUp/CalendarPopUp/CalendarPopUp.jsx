import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './CalendarPopUp.scss'
import LayoutPopUp from '../LayoutPopUp'
import { connect } from 'react-redux'
import { changeDate } from '../../../store/actions/actions'


const getTime = (date) => {
    return date.toLocaleString('ua-UA', {hour: 'numeric', minute: 'numeric'})
} 

const timeToTimestamp = (time) => {

    const [hour, minutes] = time.split(':')
    const timestamp = ((hour * 3600) + (minutes * 60)) * 1000
    return timestamp
}
 
const CalendarPopUp = ({ startDay, endDay, current, changeDate }) => {

    const [state, setState] = useState({
        prevTime: 0,
        nextTime: (86400 * 1000) - 1000 // 23:59
    })

    useEffect()

    const changeDateAndTime = (type, timestamp) => {
        switch(type) {
            case 'prevDate':
                changeDate(null, timestamp + state.prevTime, endDay)
                break
            case 'prevTime':
                setState(() => {
                    return {
                        ...state,
                        prevTime: timeToTimestamp(timestamp)
                    }
                })

                console.log(state);
                // changeDate(null, timestamp + state.prevTime, endDay)
                break
            case 'nextDate':
                changeDate(null, startDay, timestamp + state.nextTime)
                break
            case 'nextTime':
                setState(() => {
                    return {
                        ...state,
                        nextTime: timeToTimestamp(timestamp)
                    }
                })
                // changeDate(null, startDay, timestamp + state.nextTime)
                break
            default:
                return state
        }
    }


    return (
        <LayoutPopUp title={'Выбор периода для просмотра'} position={'top'} width={'bigger'}>
            <div className="calendar">
                <div className="calendarStart">
                    Начало периода:
                    <Calendar 
                        maxDate={new Date(current)}
                        value={new Date(startDay)}
                        onChange={e => changeDateAndTime('prevDate', new Date(e).getTime())}
                    />
                    <input 
                        type="time"
                        min="00:00"
                        max="23:59"
                        value={getTime(new Date(startDay))}
                        onChange={e => changeDateAndTime('prevTime', e.target.value)}
                    />
                </div>
                <div className="calendarEnd">
                    Окончание периода:
                    <Calendar 
                        maxDate={new Date(current)}
                        value={new Date(endDay)}
                        onChange={e => changeDateAndTime('nextDate', new Date(e).getTime())}
                    />
                    <input 
                        type="time"
                        min="00:00"
                        max="23:59"
                        value={getTime(new Date(endDay))}
                        onChange={e => changeDateAndTime('nextTime', e.target.value)}
                    />
                </div>
                <div className="actionButtons">
                    <button className="apply btn btn-primary">Применить</button>
                    <button className="cancel btn btn-light">Отменить</button>
                </div>
            </div>
        </LayoutPopUp>
    )
}

const mapStateToProps = ({datePeriod}) => {
    return {
        startDay: datePeriod.temp.start,
        endDay: datePeriod.temp.end,
        current: datePeriod.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDate: (step, startDay, endDay) => dispatch(changeDate(step, startDay, endDay))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPopUp)