import React, { useState } from "react"
import styles from "./PopUp.module.scss"
import { Loader } from '../Loader/Loader'
// import axios from 'axios'

const PopUp = props => {
    
    // Backup sql 04.01.2021 - 04.02.2021


    const date = new Date()

    const [fromState, setFromState] = useState({
        mobitelId: null,
        startDate: toInputDateFormat(date, 1),
        endDate: toInputDateFormat(date),
        loader: false
    })

    function toInputDateFormat(date, opt = 0) {
        let formatedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - opt}`
        return formatedDate
    }

    const formHandler = ({target}) => {
        if (target.name === 'mobitelId') {
            setFromState(() => {
                return {
                    ...fromState,
                    mobitelId: target.value
                }
            })
        }

        if (target.name === 'start') {
            setFromState(() => {
                return {
                    ...fromState,
                    startDate: target.value
                }
            })
        }

        if (target.name === 'end') {
            setFromState(() => {
                return {
                    ...fromState,
                    endDate: target.value
                }
            })
        }

    }

    const getDataHandler = e => {
        e.preventDefault()
        
        if (fromState.mobitelId === null || fromState.mobitelId === '') console.log('Add a mobitelId');
        else {
            
            setFromState(() => {
                return {
                    ...fromState,
                    loader: true
                }
            })

            const data = {
                mobitelId: fromState.mobitelId,
                startDate: new Date(fromState.startDate).getTime(),
                endDate: new Date(fromState.endDate).getTime()
            }

            console.log(data);


        }
    }

    return (
        <div className={styles.PopUp}>
            <div className={styles.popHeader}>
                <h2 className={styles.title}>{ props.title }</h2>
                <i className={`material-icons`} onClick={props.onClose}>close</i>
            </div>
            <div className={styles.popBody}>
                {
                    fromState.loader
                    ? <Loader />
                    : <form className={`mt-3`}>
                        <input type="text" className='form-control' placeholder='ID машины' name="mobitelId" onChange={formHandler}/>
                        <div className={`mt-2`}>
                            <span>Выбор периода</span>
                            <div className={styles.dateInputs}>
                                <input 
                                    type="date"
                                    className='form-control'
                                    placeholder='Дата'
                                    // defaultValue={fromState.startDate}
                                    name="start"
                                    onChange={formHandler} 
                                    min="2021-01-04"
                                    max="2021-02-04"
                                />
                                <i className="material-icons">swap_horiz</i>
                                <input 
                                    type="date"
                                    className='form-control'
                                    placeholder='Дата'
                                    // defaultValue={fromState.endDate}
                                    name="end"
                                    onChange={formHandler}
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

export { PopUp }