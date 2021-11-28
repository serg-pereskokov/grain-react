import React from 'react'
import styles from './Header.module.scss'
import { connect } from 'react-redux'
import { toggleMenu } from '../../store/actions/actions';

const Header = props => {
    return (
        <>
            <div className={styles.Header}>
                <span className={styles.logo}>
                    <span className={styles.logoMob}></span>
                    <span>Grain Alliance</span>
                </span>
                <span className={`material-icons ${styles.menu}`} onClick={props.toggleMenu}>
                    {props.showMenu ? 'close' : 'menu'}
                </span>
            </div>
        </>
    );
}

const mapStateToProps = ({ header }) => {
    return {
        showMenu: header.showMenu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => dispatch(toggleMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
