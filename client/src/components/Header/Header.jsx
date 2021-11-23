import React from 'react'
import styles from './Header.module.scss'

const Header = props => {

    const [state, setState] = props.state

    const exitHandler = () => {
        localStorage.setItem('auth','false')
        setState(() => {
            return {
                ...state,
                form: {
                    login: null,
                    password: null
                },
                auth: false
            }
        })
    }

    return (
        <div className={`navbar ps-2 pe-2 ${styles.Header}`}>
            <span className={styles.logo}>Grain Alliance</span>
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <button className={`btn btn-sm btn-danger ${styles.logout}`} onClick={exitHandler}>Выход</button>
                </li>
            </ul>
        </div>
    );
}

export { Header }
