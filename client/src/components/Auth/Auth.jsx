import React, { useState } from "react"
import styles from './Auth.module.scss'
import { connect } from 'react-redux'
import { login } from '../../store/actions/actions'

const Auth = props => {
    const [state, setState] = useState({
        username: null,
        password: null,
        error: false
    })

    const formControlsChange = e => {
        const type = e.target.name
        setState(() => {
            return {
                ...state,
                [type]: e.target.value
            }
        })
    }
 
    const enterHandler = e => {
        e.preventDefault()

        for (let [k, v] of Object.entries(props.userType)) {
            if (v.username === state.username && v.password === state.password) {

                props.login(k)
                sessionStorage.setItem('auth', true)
                sessionStorage.setItem('loginAs', k)
            } else {
                setState(() => {
                    return {
                        ...state, 
                        error: true
                    }
                })
            }
        }
    }

    return (
        <div className={styles.Auth}>
            <i className={styles.logo} />
            {
                state.error
                ? <div className="alert alert-danger d-flex align-items-center" role="alert" id="liveAlertPlaceholder">
                        Неверное имя пользователя или пароль
                    <button 
                        onClick={() => {
                            setState(() => {
                                return {
                                    ...state,
                                    error: false
                                }})}}
                        type="button"
                        className="btn-close ms-2"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                  </div>
                : null
            }
            <form>
                <input 
                    type="text" 
                    name="username"
                    className="form-control mb-2" 
                    placeholder="Имя пользователя" 
                    onChange={formControlsChange} />
                <input 
                    type="password"
                    name="password"
                    className="form-control mb-2"
                    placeholder="Пароль" 
                    onChange={formControlsChange} />
                <button 
                    className={`btn btn-primary ${styles.btnSend}`}
                    onClick={enterHandler}
                >Войти</button>
            </form>
        </div>
    )
}

const mapStateToProps = ({ userType }) => {
    return {
        userType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: loginAs => dispatch(login(loginAs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)