const toInputDateFormat = (date, opt = 1) => {
    let formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - opt}`
    return formatedDate
}

export {
    toInputDateFormat
}