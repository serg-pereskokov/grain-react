import React from 'react'
import styles from './RightMenu.module.scss'
import { connect } from 'react-redux'
import { quit, popUpView } from '../../store/actions/actions'


const RightMenu = props => {
    return (
        <div className={styles.RightMenu}>
        <ul>
            <li onClick={() => props.popUpView('carView')}>
                <span 
                    className={`material-icons ${styles.exit}`}
                >directions_car</span>
                Отследить
            </li>
            <li className={`mt-3`} onClick={() => props.popUpView('shnakView')}>
                <span 
                    className={`material-icons ${styles.exit}`} 
                >local_shipping</span>
                Отгрузка
            </li>
        </ul>
        <div className={styles.btnExit}>
            <span className={`material-icons ${styles.exit}`} onClick={props.quit}>exit_to_app</span>
            Выход
        </div>
    </div>
    );
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        quit: () => dispatch(quit()),
        popUpView: type => dispatch(popUpView(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu) 
