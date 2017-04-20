import _ from 'lodash'

import { consoleGroup } from '../../utils'
import {
  ARTBOARD_LAYER_SELECTION,
  HIGHLIGHT_LAYER,
  TOGGLE_ARTBOARD_ITEM,
  UPDATE_DIMENSIONS,
} from './constants'

// Files Reducer
export default function Projects(state = {}, action) {
  switch (action.type) {
    case ARTBOARD_LAYER_SELECTION:
      consoleGroup('ARTBOARD_LAYER_SELECTION',[action])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: action.artboardId,
          layerId: action.layerId
        })
      })

    case HIGHLIGHT_LAYER:
      consoleGroup('HIGHLIGHT_LAYER',[action])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
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

    case UPDATE_DIMENSIONS:
      consoleGroup('UPDATE_DIMENSIONS',[action])
      let updatedLayer = state.Layers[action.layerId]
      updatedLayer.dimensions = action.dimensions
      return Object.assign({},state,{
        Layers: {
          ...state.Layers,
          updatedLayer
        }
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
