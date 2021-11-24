import React from 'react'
import styles from './Header.module.scss'

const Header = props => {

    const [state, setState] = props.state

    // const exitHandler = () => {
    //     localStorage.setItem('auth','false')
    //     setState(() => {
    //         return {
    //             ...state,
    //             form: {
    //                 login: null,
    //                 password: null
    //             },
    //             auth: false,
    //             userType: null
    //         }
    //     })
    // }

    const showMenu = () => {
        setState(() => {
            return {
                ...state,
                showMenu: true
            }
        })
    }

    return (
        <>
            <div className={styles.Header}>
                <span className={styles.logo}>
                    <span className={styles.logoMob}></span>
                    <span>Grain Alliance</span>
                </span>
                <span className={`material-icons ${styles.menu}`} onClick={showMenu}> menu</span>
                {/* <ul className="navbar-nav">
                    <li className="navbar-item">
                        <i className={`material-icons`} onClick={() => console.log('clicked!')}>drive_eta</i>
                    </li>
                    <li className="navbar-item">
                        <button className={`btn btn-sm btn-danger ${styles.logout}`} onClick={exitHandler}>Выход</button>
                    </li>
                </ul> */}
            </div>
        </>
    );
}

export { Header }
