import React, { useState} from "react"
import styles from './TrackDownExplorer.module.scss'
import allCars from '../../../../assets/trackDownSettings.json'

const TrackDownExplorer = props => {

    const [state, setState] = useState({
        data: allCars,
        explorerMainFolder: false,
        explorerAgriculture: false,
        explorerCars: false,
        mainFolderChecked: false,
        agricultureChecked: false,
        carsChecked: false,
        carsSelected: []
    })

    const toggleFolder = name => {

        setState(() => {
            return {
                ...state,
                [name]: !state[name]
            }
        })
    }

    const toggleChange = (name, target = null) => {

        if (name !== 'item') {
            setState(() => {
                return {
                    ...state,
                    mainFolderChecked: false,
                    agricultureChecked: false,
                    carsChecked: false,
                    carsSelected: [],
                    [name]: !state[name]
                }
            })
        } else {

            const value = target.value*1

            let carsSelected = [...state.carsSelected]

            if (carsSelected.includes(value)) {
                carsSelected = carsSelected.filter(item => item !== value)
                target.checked = null

            } else {
                carsSelected.push(value)
            }

            setState(() => {
                return {
                    ...state,
                    mainFolderChecked: false,
                    agricultureChecked: false,
                    carsChecked: false,
                    carsSelected
                }
            })

        }   
    }

    const preparationDataHandler = () => {

        let dataArray = null;

        if (state.mainFolderChecked) dataArray = [...state.data.agriculture, ...state.data.cars]
        else if (state.agricultureChecked) dataArray = [...state.data.agriculture]
        else if (state.carsChecked) dataArray = [...state.data.cars]
        else if (state.carsSelected.length > 0) dataArray = [...state.carsSelected]

        props.getDataState(dataArray)
    }

    return (
        <>
            <div className={styles.TrackDownExplorer}>
                <div className={styles.explorerMainFolder}>
                    <h3 onClick={() => toggleFolder('explorerMainFolder')}>
                        <i className="material-icons">{ state.explorerMainFolder ? 'folder_open' : 'folder'}</i>
                        Вся техника
                    </h3>
                    <input type="checkbox" name="all" onChange={() => toggleChange('mainFolderChecked')} checked={state.mainFolderChecked ? 'checked': null}/>
                </div>
                {
                    state.explorerMainFolder || state.mainFolderChecked
                    ?   <>
                            <div className={styles.explorerFolder}>
                                <h3 onClick={() => toggleFolder('explorerAgriculture')}>
                                    <i className="material-icons">{ state.explorerAgriculture ? 'folder_open' : 'folder'}</i>
                                    СХ техника
                                </h3>
                                <input type="checkbox" name="agriculture" checked={state.mainFolderChecked ? 'checked' : null} onChange={() => toggleChange('agricultureChecked')} />
                            </div>
                            {
                                state.explorerAgriculture || state.mainFolderChecked || state.agricultureChecked
                                ? state.data.agriculture.map((item, index) => {
                                    return (
                                        <div className={styles.item} key={index}>
                                            <h3>
                                                <i className="material-icons">agriculture</i>
                                                {item}
                                            </h3>
                                            <input 
                                                type="checkbox" 
                                                defaultValue={item} 
                                                checked={state.mainFolderChecked || state.agricultureChecked ? 'checked' : null}
                                                onChange={(e) => toggleChange('item', e.target)}
                                            />
                                        </div>
                                    )
                                })
                                : null
                            }
                            <div className={styles.explorerFolder}>
                                <h3 onClick={() => toggleFolder('explorerCars')}>
                                    <i className="material-icons">{ state.explorerCars ? 'folder_open' : 'folder'}</i>
                                    Автомобили
                                </h3>
                                <input type="checkbox" name="cars" checked={state.mainFolderChecked ? 'checked' : null} onChange={() => toggleChange('carsChecked')} />
                            </div>
                            {
                                state.explorerCars || state.mainFolderChecked || state.carsChecked
                                ? state.data.cars.map((item, index) => {
                                    return (
                                        <div className={styles.item} key={index}>
                                            <h3>
                                                <i className="material-icons">directions_car</i>
                                                {item}
                                            </h3>
                                            <input 
                                                type="checkbox"
                                                defaultValue={item}
                                                checked={state.mainFolderChecked  || state.carsChecked ? 'checked' : null}
                                                onChange={(e) => toggleChange('item', e.target)}
                                            />
                                        </div>
                                    )
                                })
                                : null
                            }
                        </>
                    : null
                }
            </div>
            <button className={`btn btn-primary ${styles.btnApply}`} onClick={() => preparationDataHandler()}>Применить</button>
        </>
    )
}

export { TrackDownExplorer }