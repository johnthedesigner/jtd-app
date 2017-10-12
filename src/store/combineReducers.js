import { combineReducers } from 'redux'

import Editor from '../Routes/Editor/reducer'
import History from './historyReducer'

const Reducers = combineReducers({
  Editor,
  History,
})

export default Reducers