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

const getData = payload => {
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

const addDataGps = payload => {
    return {
        type: 'ADD_DATA_GPS',
        payload
    }
}

const getDataGPS = payload => {
    // let dt = [
    //     105,
    //     109,
    //     113,
    //     115,
    //     126,
    //     135,
    //     138,
    //     143,
    //     146,
    //     147,
    //     149,
    //     151,
    //     156,
    //     158,
    //     159,
    //     164,
    //     165,
    //     168,
    //     179,
    //     181,
    //     182,
    //     197,
    //     200,
    //     201,
    //     204,
    //     210,
    //     211,
    //     212,
    //     213,
    //     214,
    //     215,
    //     222,
    //     231,
    //     232,
    //     236,
    //     238,
    //     249,
    //     251,
    //     252,
    //     253,
    //     258,
    //     259,
    //     271,
    //     297,
    //     298,
    //     301,
    //     311,
    //     314,
    //     325,
    //     327,
    //     330,
    //     334,
    //     335,
    //     339,
    //     340,
    //     341,
    //     344,
    //     345,
    //     346,
    //     348,
    //     352,
    //     353,
    //     354,
    //     355,
    //     356,
    //     358,
    //     371,
    //     372,
    //     378,
    //     392,
    //     394,
    //     396,
    //     398,
    //     401,
    //     402,
    //     406,
    //     407,
    //     420,
    //     422,
    //     429,
    //     430,
    //     431,
    //     433,
    //     436,
    //     437,
    //     440,
    //     462,
    //     464,
    //     468,
    //     469,
    //     475,
    //     482,
    //     485,
    //     491,
    //     493,
    //     498,
    //     504,
    //     514,
    //     516,
    //     518,
    //     525,
    //     527,
    //     529,
    //     533,
    //     534,
    //     535,
    //     537,
    //     540,
    //     542,
    //     543,
    //     544,
    //     546,
    //     549,
    //     553,
    //     554,
    //     555,
    //     560,
    //     561,
    //     562,
    //     566,
    //     567,
    //     570,
    //     575,
    //     577,
    //     581,
    //     585,
    //     586,
    //     588,
    //     589,
    //     590,
    //     591,
    //     592,
    //     593,
    //     594,
    //     597,
    //     599,
    //     600,
    //     601,
    //     606,
    //     609,
    //     611,
    //     612,
    //     613,
    //     614,
    //     615,
    //     618,
    //     619,
    //     621,
    //     622,
    //     623,
    //     625,
    //     627,
    //     629,
    //     630,
    //     631,
    //     632,
    //     633,
    //     634,
    //     652,
    //     654,
    //     657,
    //     659,
    //     661,
    //     663,
    //     665,
    //     668,
    //     670,
    //     672,
    //     673,
    //     675,
    //     679,
    //     684,
    //     685,
    //     687,
    //     688,
    //     690,
    //     693,
    //     695,
    //     702,
    //     706,
    //     707,
    //     711,
    //     713,
    //     717,
    //     720,
    //     722,
    //     723,
    //     727,
    //     728,
    //     729,
    //     730,
    //     741,
    //     745,
    //     746,
    //     749,
    //     755,
    //     756,
    //     758,
    //     759,
    //     760,
    //     761,
    //     762,
    //     763,
    //     766,
    //     767,
    //     769,
    //     770,
    //     771,
    //     773,
    //     774,
    //     775,
    //     777,
    //     778,
    //     780,
    //     782,
    //     806,
    //     809,
    //     812,
    //     815,
    //     816,
    //     817,
    //     819,
    //     820,
    //     821,
    //     822,
    //     824,
    //     825,
    //     831,
    //     835,
    //     838,
    //     839,
    //     849,
    //     850,
    //     852,
    //     853,
    //     854,
    //     855,
    //     856,
    //     858,
    //     859,
    //     860,
    //     861,
    //     862,
    //     863,
    //     864,
    //     866,
    //     919,
    //     942,
    //     946,
    //     967,
    //     974,
    //     982
    // ]

    // payload = {...payload,
    //     mobitelIds: dt
    // }
    return async dispatch => {
        try {
            const {data} = await axios.post('/api/getDataGps', payload)
            console.log(data);
            dispatch(addDataGps(data))
        } catch (e) {
            console.log(e);
        }
    }
}

const closeHandler = () => {
    return {
        type: 'POP_UP_CLOSE'
    }
}

const initialDate = () => {

    const startDate = new Date().setHours(0, 0, 0)
    const day = Date.now()
    
    return {
        type: 'INITIAL_DATE',
        current: day,
        startDate,
        endDate: day
    }
}

const changeDate = (step = null, startDate, endDate, current = null) => {

    if (step === 'prev') {
        return {
            type: 'CHANGE_DATE',
            startDate: startDate - (86400 * 1000),
            endDate: startDate - 1000
        }
    } else if (step === 'next'){
        return {
            type: 'CHANGE_DATE',
            startDate: startDate + (86400 * 1000) < current ? startDate + (86400 * 1000) : startDate,
            endDate: endDate + (86400 * 1000)  < current ? endDate + (86400 * 1000) : current
        }
    } else {
        return {
            type: 'CHANGE_DATE_TEMP',
            start: startDate,
            end: endDate
        }
    }
}

const toggleCalendarSettings = () => {
    return {
        type: 'TOGGLE_CALENDAR_SETTINGS'
    }
}

const applyDateHandler = (node, startDate, endDate) => {
    node.preventDefault()
    return {
        type: 'CHANGE_DATE',
        startDate, endDate
    }
}
const closeDateHandler = (node) => {
    
    node.preventDefault()

    return {
        type: 'CALENDAR_CLOSE'
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
    changeDate,
    applyDateHandler,
    closeDateHandler,
    toggleCalendarSettings,
    getDataGPS
}