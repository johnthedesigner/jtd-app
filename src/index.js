import React from 'react'
import ReactDOM from 'react-dom'
// import injectTapEventPlugin from 'react-tap-event-plugin'

import createStore from './store/createStore'
import App from './App'
import './styles/styles.css'

// injectTapEventPlugin()

// Instatiate Store
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
)
