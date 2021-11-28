import React, { useState } from "react"
import styles from "./PopUp.module.scss"
import { toInputDateFormat } from "../../utils/utils"
import { connect } from 'react-redux'
import { getData } from "../../store/actions/actions"
import { Loader } from '../Loader/Loader'
// import axios from 'axios'

const PopUp = props => {

    // Backup sql 04.01.2021 - 04.02.2021

    const date = new Date()

    const [state, setState] = useState({
        titles: {
            carView: 'Выбор машины для отслеживания',
            shnakView: 'Выбор шнека для отгрузки'
        },
        formControls: {
            mobitelId: null,
            startDate: toInputDateFormat(date, 1),
            endDate: toInputDateFormat(date),
            sqlDB: 'mca_dispatcher'
        }
    })

    let title = state.titles[props.title]

    const formControlsHandler = ({target}) => {
        setState(() => {
            return {
                ...state,
                formControls: {
                    ...state.formControls,
                    [target.name]: target.value
                }
            }
        })
    }

    const getDataHandler = e => {
        e.preventDefault()
        let payload = {...state.formControls}
        if (payload.mobitelId === null || payload.mobitelId === '') 
            console.log('Add a mobitelID');
        else {
            payload = {
                mobitelId: payload.mobitelId*1,
                startDate: new Date(payload.startDate).getTime(),
                endDate: new Date(payload.endDate).getTime(),
                sqlDB: payload.sqlDB
            }

            props.getData(payload)
        }
    }

    //         try {
    //             let {data} = await axios.post('/api/getCar', payload)
    //             console.log(data);
    //             setFromState(() => {
    //                 return {
    //                     ...fromState,
    //                     loader: false
    //                 }
    //             })

    //             setContentState(() => {
    //                 return {
    //                     ...contentState, 
    //                     getCar: {
    //                         data
    //                     }
    //                 }
    //             })

    //             props.onClose()

    //         } catch(e) {
    //             console.log(e);
    //             setFromState(() => {
    //                 return {
    //                     ...fromState,
    //                     loader: false
    //                 }
    //             })
    //         }
    //     }
    // }

    return (
        <div className={styles.PopUp}>
            <div className={styles.popHeader}>
                <h2 className={styles.title}>{title}</h2>
                <i className={`material-icons`}>close</i>
            </div>
            <div className={styles.popBody}>
                {
                    props.loader
                    ? <Loader />
                    : <form className={`mt-3`}>
                        <input 
                            type="text"
                            className='form-control'
                            placeholder='ID машины'
                            name="mobitelId" 
                            onChange={formControlsHandler} />
                        <div className={`mt-2`}>
                            <div className={styles.dateInputs}>
                                <input 
                                    type="date"
                                    className='form-control'
                                    placeholder='Дата'
                                    // defaultValue={fromState.startDate}
                                    name="startDate"
                                    onChange={formControlsHandler} 
                                    min="2021-01-04"
                                    max="2021-02-04"
                                />
                                <i className="material-icons">swap_horiz</i>
                                <input 
                                    type="date"
                                    className='form-control'
                                    placeholder='Дата'
                                    // defaultValue={fromState.endDate}
                                    name="endDate"
                                    onChange={formControlsHandler}
                                    min="2021-01-04"
                                    max="2021-02-04"
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary mt-2" onClick={getDataHandler}>Найти</button>
                    </form>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        title: state.rightMenu.options,
        loader: state.popUp.loader
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getData: (payload) => dispatch(getData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)