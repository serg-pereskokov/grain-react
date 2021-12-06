import React, { useState } from 'react'
import styles from './RightMenu.module.scss'
import { connect } from 'react-redux'
import { quit, popUpView } from '../../store/actions/actions'
import { TrackDown } from './TrackDown/TrackDown'


const RightMenu = props => {

    const [state, setState] = useState({
        isExpanded: false,
        actions: {
            type: null,
            isActive: false
        }
    })
    
    const cls = [styles.RightMenu]

    if (state.isExpanded) cls.push(styles.expanded)

    const clickEventHandler = action => {
        setState(() => {
            return {
                ...state,
                isExpanded: !state.isExpanded,
                actions: {
                    type: action,
                    isActive: true
                }
            }
        })
    }

    return (
        <div className={cls.join(' ')}>
            <div className={styles.menu}>
                <ul>
                    <li 
                        onClick={ () => clickEventHandler('trackDown')}
                        className={state.actions.type === 'trackDown' && state.actions.isActive ? styles.active : null}
                        title="Отследить"
                    >
                        <span 
                            className={`material-icons ${styles.exit}`}
                        >directions_car</span>
                        <span className={styles.descr}>Отследить</span>
                    </li>
                    <li title='Отгрузка'>
                        <span 
                            className={`material-icons ${styles.exit}`} 
                        >local_shipping</span>
                        <span className={styles.descr}>Отгрузка</span>
                    </li>
                </ul>
                <div className={styles.btnExit} title='Выход'>
                    <span className={`material-icons ${styles.exit}`} onClick={props.quit}>exit_to_app</span>
                    <span className={styles.descr}>Выход</span>
                </div>
            </div>
            {
                state.isExpanded && state.actions.type === 'trackDown'
                ? <TrackDown />
                : null
            }
        </div>
    )
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
