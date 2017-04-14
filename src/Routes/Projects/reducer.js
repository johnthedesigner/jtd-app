import { consoleGroup } from '../../utils'
import {
  FETCHING_FILE,
} from './constants'

// Files Reducer
export default function Projects(state = {}, action) {
  switch (action.type) {
    case FETCHING_FILE:
      consoleGroup('FETCHING_FILE',[action])
      return Object.assign({},state,{
        isLoading: true
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
