import { combineReducers } from 'redux'

import CaseStudies from '../Routes/CaseStudies/reducer'
import History from './historyReducer'

const Reducers = combineReducers({
  CaseStudies,
  History,
})

export default Reducers