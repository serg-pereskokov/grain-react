import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer)
 
ReactDOM.render(
  <React.StrictMode> 
    <Provider store={store}>
    <App className="container"/>
    </ Provider >
  </React.StrictMode>,
  document.getElementById('root')
);
