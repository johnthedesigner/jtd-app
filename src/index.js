import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './store/createStore'
import { createRoutes } from './Routes'
import App from './App'
import './index.css'

// Instatiate Store
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const routes = createRoutes(store)

ReactDOM.render(
  <App store={store}  routes={routes}/>,
  document.getElementById('root')
)
