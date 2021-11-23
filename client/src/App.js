import { useState } from 'react'
import { Auth } from './components/Auth/Auth';
import { Content } from './components/Content/Content'
import './App.css';

function App() {

  const [state, setState] = useState({
    login: 'admin',
    password: 'admin',
    auth: localStorage.getItem('auth') || false,
    form: {
      login: null,
      password: null
    }
  })

  return (
    <div className='App'>
      { state.auth
        ? <Content state={[state, setState]} />
        : <Auth state={[state, setState]} />
      }
      
    </div>
  );
}

export default App;
