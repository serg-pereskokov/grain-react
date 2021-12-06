import axios from 'axios'

const login = (loginAs) => {
    return {
        type: 'LOGIN',
        loginAs,
        auth: true
    }
}

const toggleMenu = () => {
    return {
        type: 'TOGGLE_MENU'
    }
}

const quit = () => {
    
    sessionStorage.setItem('auth', false)
    sessionStorage.setItem('loginAs', null)

    return {
        type: 'QUIT'
    }
}

const popUpView = payload =>{
    return {
        type: 'POP_UP_VIEW',
        payload
    }
}

const popUpLoader = () => {
    return {
        type: "POP_UP_LOADER"
    }
}

const popUpEnd = data => {
    let center = data[0]
    let startPath = data[0]
    let endPath = data[data.length - 1]
    return {
        type: "POP_UP_END",
        payload: data,
        center,
        zoom: 10,
        startPath,
        endPath
    }
}

const getData = (payload) => {
    return async dispatch => {
        dispatch(popUpLoader())
        try {
            const {data} = await axios.post('/api/getCar', payload)
            const latlgn = data.map(item => item.coords)
            console.log(data);
            dispatch(popUpEnd(latlgn))
        } catch (e) {
            console.log(e)
        }
    }
}

const closeHandler = () => {
    return {
        type: 'POP_UP_CLOSE'
    }
}

const initialDate = () => {

    const startDay = new Date().setHours(0, 0, 0)
    const day = Date.now()
    
    return {
        type: 'INITIAL_DATE',
        current: day,
        startDay,
        endDay: day
    }
}

const changeDate = (step = null, startDay, endDay, current = null) => {

    if (step === 'prev') {
        return {
            type: 'CHANGE_DATE',
            startDay: startDay - (86400 * 1000),
            endDay: startDay - 1000
        }
    } else if (step === 'next'){
        return {
            type: 'CHANGE_DATE',
            startDay: startDay + (86400 * 1000) < current ? startDay + (86400 * 1000) : startDay,
            endDay: endDay + (86400 * 1000)  < current ? endDay + (86400 * 1000) : current
        }
    } else {
        return {
            type: 'CHANGE_DATE_TEMP',
            start: startDay,
            end: endDay
        }
    }
}

export {
    login,
    toggleMenu,
    quit,
    popUpView,
    getData,
    closeHandler,
    initialDate,
    changeDate
}