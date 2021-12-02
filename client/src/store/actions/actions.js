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

const changeTileLayer = payload => {
    return {
        type: 'CHANGE_TILE_LAYER',
        payload
    }
}

export {
    login,
    toggleMenu,
    quit,
    popUpView,
    getData,
    closeHandler,
    changeTileLayer
}