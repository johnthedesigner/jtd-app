import { applyMiddleware, compose, createStore } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import thunk from 'redux-thunk'

import Reducers from './combineReducers'
import initialState from './initialState'

export default () => {
  let composeEnhancers = compose

  const store = createStore(
    Reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  )
  persistStore(store)

  return store
}