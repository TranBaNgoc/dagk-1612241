import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
// import thunk from 'redux-thunk'
// import { logger } from 'redux-logger'
import rootReducer from './reducers/indexReducers'
import './css/index.css';
import Game from './Game'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const loggerMiddleware = createLogger()

const store = createStore(rootReducer,
  applyMiddleware(thunkMiddleware,
     loggerMiddleware))

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
)