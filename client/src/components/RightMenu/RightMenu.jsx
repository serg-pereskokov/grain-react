import React from 'react'
import styles from './RightMenu.module.scss'


const RightMenu = props => {

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
                auth: false,
                userType: null,
                showMenu: false
            }
        })
    }


    return (
        <div className={styles.RightMenu}>
            <ul>
                <li>
                    <span className={`material-icons ${styles.exit}`}>directions_car</span>
                    Отследить
                </li>
            </ul>
            <div className={styles.btnExit} onClick={exitHandler}>
                <span className={`material-icons ${styles.exit}`}>exit_to_app</span>
                Выход
            </div>
        </div>
    );
}

export { RightMenu }
