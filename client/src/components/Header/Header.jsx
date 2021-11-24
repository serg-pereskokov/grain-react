import React from 'react'
import styles from './Header.module.scss'

const Header = props => {

    const [state, setState] = props.state

    const toggleShowMenu = () => {
        setState(() => {
            return {
                ...state,
                showMenu: !state.showMenu
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
                <span className={`material-icons ${styles.menu}`} onClick={toggleShowMenu}>
                    {state.showMenu ? 'close' : 'menu'}
                </span>
            </div>
        </>
    );
}

export { Header }
