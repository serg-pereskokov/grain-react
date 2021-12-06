import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './CalendarPopUp.scss'
import LayoutPopUp from '../LayoutPopUp'
import { connect } from 'react-redux'
import { changeDate, applyDateHandler, closeDateHandler } from '../../../store/actions/actions'


const getTime = (date) => {
    return date.toLocaleString('ua-UA', {hour: 'numeric', minute: 'numeric'})
} 

const timeToTimestamp = (time, date) => {

    const [hour, minutes] = time.split(':')
    const timestamp = new Date(date).setHours(hour*1, minutes*1)

    return timestamp

}
 
const CalendarPopUp = ({ startDay, endDay, current, changeDate, applyDateHandler, closeDateHandler }) => {

    const changeDateAndTime = (type, timestamp) => {
        switch(type) {
            case 'prevDate':
                changeDate(null, timestamp, endDay)
                break
            case 'prevTime':
                changeDate(null, timeToTimestamp(timestamp, startDay), endDay)
                break
            case 'nextDate':
                changeDate(null, startDay, timestamp + 86399000)
                break
            case 'nextTime':
                changeDate(null, startDay, timeToTimestamp(timestamp, endDay))
                break
            default:
                return
        }
    }
 
    return (
        <LayoutPopUp title={'Выбор периода для просмотра'} position={'top'} width={'bigger'} closeHandler={closeDateHandler}>
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
                    <button className="apply btn btn-primary" onClick={e => applyDateHandler(e, startDay, endDay)}>Применить</button>
                    <button className="cancel btn btn-light" onClick={e => closeDateHandler(e)}>Отменить</button>
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
        changeDate: (step, startDay, endDay) => dispatch(changeDate(step, startDay, endDay)),
        applyDateHandler: (node, startDay, endDay) => dispatch(applyDateHandler(node, startDay, endDay)),
        closeDateHandler: node => dispatch(closeDateHandler(node))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPopUp)