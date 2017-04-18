import { consoleGroup } from '../../utils'
import {
  SELECT_ARTBOARD,
  SELECT_LAYER,
} from './constants'

// Files Reducer
export default function Projects(state = {}, action) {
  switch (action.type) {
    case SELECT_ARTBOARD:
      consoleGroup('SELECT_ARTBOARD',[action])
      let newState = Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: action.artboardId,
          layerId: null
        })
      })
      console.log(newState)
      return newState

    case SELECT_LAYER:
      consoleGroup('SELECT_LAYER',[action])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: action.artboardId,
          layerId: action.layerId
        })
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
