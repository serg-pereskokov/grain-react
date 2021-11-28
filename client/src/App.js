import Auth from './components/Auth/Auth'
import Content from './components/Content/Content'
import './App.css';
import { connect } from 'react-redux'

const App = ({auth}) => {

  // const [state, setState] = useState({
  //   login: 'admin',
  //   password: 'admin',
  //   auth: JSON.parse(localStorage.getItem('auth')) || false,
  //   form: {
  //     login: null,
  //     password: null
  //   },
  //   userType: null,
  //   showMenu: false
  // })

  return (
    <div className='App'>
      { auth
        ? <Content />
        : <Auth />
      }
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.login.auth
  }
}

export default connect(mapStateToProps)(App);
