const arrEq = (arrCurrent, arrNext) => {

    const [currentLat, currentLgn] = arrCurrent
    const [nextLat, nextLgn] = arrNext


    if (currentLat === nextLat && currentLgn === nextLgn) return true
    else return false

}

export { arrEq }