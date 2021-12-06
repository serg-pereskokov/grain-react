import React from "react"
import styles from './TrackDown.module.scss'
import allCars from '../../../assets/trackDownSettings.json'

const TrackDown = () => {
    
    const {agricultural_machinery, cars} = allCars

    const Explorer = () => {
        return (
            <ul className={styles.mainFolder}>
                <li>
                    <span className={styles.explorerMainDescr}>Все машины</span>
                    <ul>
                        <li>
                            <span className={styles.explorerDescr}>СХ техника</span>
                            <ul>
                                {
                                    agricultural_machinery.map((item, index) => {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li>
                            <span className={styles.explorerDescr}>Машины</span>
                            <ul>
                                {
                                    cars.map((item, index) => {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }

    return (
        <div className={styles.TrackDown}>
            <div className={styles.header}>Выбор техники</div>
            <div className={styles.searchBlock}>
                <input type="text" placeholder='Поиск' className={styles.search}/>
                <i className='material-icons'>search</i>
            </div>
            <div className={styles.explorer}>
                <Explorer />
            </div>
        </div>
    )
}

export { TrackDown }