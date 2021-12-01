import React from 'react'
import { connect } from 'react-redux'
import Header from '../Header/Header'
import RightMenu from '../RightMenu/RightMenu'
import PopUp from '../PopUp/PopUp'
import Map from '../Map/Map'

const Content = props => {

  // const [pop, setPop] = useState({isOpen: false})

  // const multiPolygon = [
  //   [
  //     [50.381990, 31.871541],
  //     [50.382043, 31.869733],
  //     [50.382088, 31.869737],
  //     [50.382968, 31.869748],
  //     [50.382965, 31.869818],
  //     [50.383104, 31.869778],
  //     [50.383073, 31.869828],
  //     [50.382021, 31.871491],
  //     [50.382615, 31.870556]
  //   ],
  //   [
  //     [50.355042, 31.880226],
  //     [50.355169, 31.876349],
  //     [50.355214, 31.876352],
  //     [50.356378, 31.876446],
  //     [50.356423, 31.876449],
  //     [50.356250, 31.880323],
  //     [50.356295, 31.880327],
  //     [50.355423, 31.880256],
  //     [50.355087, 31.880229],
  //     [50.355420, 31.880327]
  //   ]
  // ]
  
  // const searchPopHandler = () => {
  //   setPop(() => {
  //     return {
  //       ...pop,
  //       isOpen: !pop.isOpen
  //     }
  //   })
  // }

    return (
        <>
            <Header />
            {
                props.showMenu
                ? <RightMenu />
                : null
            }
            {
              props.popUpView
              ? <PopUp />
              : null
            }
            <Map />
            {/*<Map 
                initPosition={initPosition}
                multiPolygon={multiPolygon}
                theme={theme}
                state={[pop, setPop]}
            />
            {
              pop.isOpen
              ? <PopUp 
                  title='Выбор машины для отслеживания' 
                  onClose={searchPopHandler}
                  state={[pop, setPop]}
                />
              : null
            } */}
        </>
    );
}

const mapStateToProps = (state) => {
  return {
    showMenu: state.header.showMenu,
    popUpView: state.rightMenu.popUpView
  }
}

export default connect(mapStateToProps)(Content)
