import React from "react"
import styles from './Auth.module.scss'

const Auth = props => {
    const [state, setState] = props.state

    const loginHandleChange = e => {
        setState(() => {
            return {
                ...state,
                form: {
                    ...state.form,
                    login: e.target.value
                }
            }
        })
    }

    const passwordHandleChange = e => {
        setState(() => {
            return {
                ...state,
                form: {
                    ...state.form,
                    password: e.target.value
                }
            }
        })
    }
 
    const enterHandler = e => {
        e.preventDefault()
        const {login, password} = state.form;

        if ( login === state.login && password === state.password ) {
            setState(() => {
                return {
                    ...state,
                    auth: true,
                    userType: login
                }
            })

            localStorage.setItem('auth', true)
        }
    }

    return (
        <div className={styles.Auth}>
            <i className={styles.logo} />
            <form>
                <input type="text" className="form-control mb-2" placeholder="Имя пользователя" onChange={loginHandleChange} />
                <input type="text" className="form-control mb-2" placeholder="Пароль" onChange={passwordHandleChange} />
                <button onClick={enterHandler} className={`btn btn-primary ${styles.btnSend}`}>Войти</button>
            </form>
        </div>
    )
}

export { Auth }