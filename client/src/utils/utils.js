const toInputDateFormat = (date, opt = 1) => {
    let formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - opt}`
    return formatedDate
}

const timestampToHoursAndMinutes = (timestamp, getType = null) => {
    const minute = 1 / 60 // 0,0166666666666667
    const hour = 1 / 60 // 0,0166666666666667
    const secondsInHour = 3600
    const secondsInTimestamp = timestamp / 1000

    const hours = Math.floor(secondsInTimestamp / secondsInHour)
    const minutes = Math.floor(((secondsInTimestamp / secondsInHour) - Math.floor(secondsInTimestamp / secondsInHour)) / hour)
    const seconds = Math.floor(((((secondsInTimestamp / secondsInHour) - (secondsInTimestamp / secondsInHour)) / minute) - (((secondsInTimestamp / secondsInHour) - (secondsInTimestamp / secondsInHour)) / hour) ) / minute)

    switch (getType) {
        case 'Hours':
            return hours
        case 'Minutes':
            return minutes
        case 'Seconds':
            return seconds
        case 'Hours&Minutes&Seconds':
            return `${hours}:${minutes}:${seconds}`
        default:
            return `${hours}:${minutes}`
    }
} 

export {
    toInputDateFormat,
    timestampToHoursAndMinutes
}