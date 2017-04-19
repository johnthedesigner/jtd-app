import _ from 'lodash'

import { consoleGroup } from '../../utils'
import {
  HIGHLIGHT_LAYER,
  SELECT_ARTBOARD,
  SELECT_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

// Files Reducer
export default function Projects(state = {}, action) {
  switch (action.type) {
    case HIGHLIGHT_LAYER:
      consoleGroup('HIGHLIGHT_LAYER',[action])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          artboardId: action.artboardId,
          layerId: action.layerId
        })
      })

    case SELECT_ARTBOARD:
      consoleGroup('SELECT_ARTBOARD',[action])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: action.artboardId,
          layerId: null
        })
      })

    case SELECT_LAYER:
      consoleGroup('SELECT_LAYER',[action])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: action.artboardId,
          layerId: action.layerId
        })
      })

    case TOGGLE_ARTBOARD_ITEM:
      consoleGroup('TOGGLE_ARTBOARD_ITEM',[action])
      let toggledProject = _.find(state.items, {id: action.projectId})
      let toggledValue = !_.find(toggledProject.artboards, {
        id: action.artboardId
      }).isCollapsed
      toggledProject.artboards[action.artboardId].isCollapsed = toggledValue
      return Object.assign({},state,{
        items: _.unionBy(state.items, [toggledProject], 'id')
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
