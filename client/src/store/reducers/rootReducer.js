const initialState = {
    userType: {
        admin: {
            username: 'admin',
            password: 'admin'
        },
        user: {
            username: 'user',
            password: 'user'
        }
    },
    login: {
        auth: JSON.parse(sessionStorage.getItem('auth')) || false,
        loginAs: null
    },
    header: {
        showMenu: false
    },
    rightMenu: {
        popUpView: false,
        options: null
    },
    popUp: {
        loader: false,
        isOpenCalendarSettings: false
    },
    map: {
        zoom: 7,
        center: [49.447767, 31.409793]
    },
    tileLayer: {
        layout: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'osm',
        subdomains: null
    },
    datePeriod: {
        current: null,
        startDate: null,
        endDate: null,
        temp: {
            start: null,
            end: null
        }
    },
    gpsData: null
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: {
                    auth: action.auth,
                    loginAs: action.loginAs
                }
            }
        case 'TOGGLE_MENU':
            return {
                ...state,
                header: {
                    showMenu: !state.header.showMenu
                }
            }
        case 'TOGGLE_CALENDAR_SETTINGS':
            return {
                ...state,
                popUp: {
                    ...state.popUp,
                    isOpenCalendarSettings: !state.popUp.isOpenCalendarSettings
                }
            }
        case 'QUIT':
            return {
                ...state,
                login: {
                    auth: false,
                    loginAs: null
                },
                header: {
                    showMenu: false
                }
            }
        case 'POP_UP_VIEW':
            return {
                ...state,
                rightMenu: {
                    popUpView: true,
                    options: action.payload
                }
            }
        case 'POP_UP_LOADER':
            return {
                ...state,
                popUp: {
                    loader: true
                },
                gpsData: null
            }
        case 'POP_UP_END':
            return {
                ...state,
                gpsData: action.payload,
                rightMenu: {
                    popUpView: false,
                    options: null
                },
                map: {
                    center: action.center,
                    zoom: action.zoom,
                    startPath: action.startPath,
                    endPath: action.endPath
                },
                popUp: {
                    loader: false
                }
            }
        case 'POP_UP_CLOSE':
            return {
                ...state,
                rightMenu: {
                    popUpView: false,
                    options: null
                },
                popUp: {
                    loader: false
                }
            }
        case 'ADD_DATA_GPS': {
            // 50.1153469,33.0896285
            return {
                ...state,
                gpsData: action.payload,
                map: {
                    ...state.map,
                    center: [50.1153469,33.0896285],
                    zoom: 11
                }

            }
        }
        case 'CALENDAR_CLOSE': {
            return {
                ...state,
                popUp: {
                    ...state.popUp,
                    isOpenCalendarSettings: false
                }
            }
        }
        case 'INITIAL_DATE': 
            return {
                ...state,
                datePeriod: {
                    current: action.current,
                    startDate: action.startDate,
                    endDate: action.endDate,
                    temp: {
                        start: action.startDate,
                        end: action.endDate
                    }
                }
            }
        case 'CHANGE_DATE':
            return {
                ...state,
                datePeriod: {
                    ...state.datePeriod,
                    startDate: action.startDate,
                    endDate: action.endDate,
                    temp: {
                        start: action.startDate,
                        end: action.endDate
                    }
                },
                popUp: {
                    ...state.popUp,
                    isOpenCalendarSettings: state.popUp.isOpenCalendarSettings ? false : null
                }
            }
        case 'CHANGE_DATE_TEMP':
            return {
                ...state,
                datePeriod: {
                    ...state.datePeriod,
                    temp: {
                        start: action.start,
                        end: action.end
                    }
                }
            }
        default:
            return state
    }
}

export default rootReducer