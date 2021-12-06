import React from 'react'
import styles from './LayoutPopUp.module.scss'

const LayoutPopUp = ({title, children, position, width}) => {

    const cls = [styles.LayoutPopUp, styles[width], styles[position]]

    const closeHandler = () => {
        
    }

    return (
        <div className={cls.join(' ')}>
            <div className={styles.popHeader}>
                <h2 className={styles.title}>{ title }</h2>
                <i className={`material-icons`} onClick={() => closeHandler()}>close</i>
            </div>
            <div className={styles.popBody}>
               { children }
            </div>
        </div>
    )
}

export default LayoutPopUp