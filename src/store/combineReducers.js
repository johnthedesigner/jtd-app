import { combineReducers } from 'redux'

import Artboards from '../Routes/Artboards/reducer'
import History from './historyReducer'

const Reducers = combineReducers({
  Artboards,
  History,
})

export default Reducers