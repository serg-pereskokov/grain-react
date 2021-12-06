import React from 'react'
import styles from './Header.module.scss'
import { connect } from 'react-redux'
import { toggleMenu } from '../../store/actions/actions';
import Calendar from '../Calendar/Calendar'
import CalendarPopUp from '../PopUp/CalendarPopUp/CalendarPopUp'

const Header = props => {
    return (
        <>
            <div className={styles.Header}>
                <span className={styles.logo}>
                    <span className={styles.logoMob}></span>
                    <span>Grain Alliance</span>
                </span>
                < Calendar />
                <span className={`material-icons ${styles.menu}`} onClick={props.toggleMenu}>
                    {props.showMenu ? 'close' : 'menu'}
                </span>
            </div>
            {
                props.isOpenCalendarSettings
                ? <CalendarPopUp />
                : null
            }
        </>
    );
}

const mapStateToProps = ({ header, popUp }) => {
    return {
        showMenu: header.showMenu,
        isOpenCalendarSettings: popUp.isOpenCalendarSettings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => dispatch(toggleMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
