import React from "react"
import styles from './TrackDown.module.scss'
import allCars from '../../../assets/trackDownSettings.json'

const TrackDown = () => {

    console.log(allCars);

    return (
        <div className={styles.TrackDown}>
            <div className={styles.header}>Выбор техники</div>
            <div className={styles.searchBlock}>
                <input type="search" placeholder='Поиск'/>
                <i className='material-icons'>search</i>
            </div>
            <div className={styles.explorer}>
                1
            </div>
        </div>
    )
}

export { TrackDown }