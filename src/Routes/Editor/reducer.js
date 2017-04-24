import _ from 'lodash'

import { consoleGroup } from '../../utils'
import {
  ADJUST_LAYER,
  ARTBOARD_LAYER_SELECTION,
  HIGHLIGHT_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

// Files Reducer
export default function Projects(state = {}, action) {
  switch (action.type) {
    case ADJUST_LAYER:
      consoleGroup('ADJUST_LAYER',[action])
      const { layerId, adjustmentGroup, propertyName, value } = action
      let updatedLayer = state.Layers[layerId]
        .adjustments[adjustmentGroup][propertyName] = value
      return Object.assign({},state,{
        Layers: {
          ...state.Layers,
          updatedLayer
        }
      })

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

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
