import _ from 'lodash'

import { consoleGroup } from '../../utils'
import {
  ADJUST_LAYER,
  ARTBOARD_LAYER_SELECTION,
  HIGHLIGHT_LAYER,
  SHOW_HIDE_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

// Files Reducer
export default function Projects(state = {}, a) {
  switch (a.type) {
    case ADJUST_LAYER:
      consoleGroup('ADJUST_LAYER',[a])
      let updatedLayer = state.Layers[a.layerId]
        .adjustments[a.adjustmentGroup][a.propertyName] = a.value
      return Object.assign({},state,{
        Layers: {
          ...state.Layers,
          updatedLayer
        }
      })

    case ARTBOARD_LAYER_SELECTION:
      consoleGroup('ARTBOARD_LAYER_SELECTION',[a])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          artboardId: a.artboardId,
          layerId: a.layerId
        })
      })

    case HIGHLIGHT_LAYER:
      consoleGroup('HIGHLIGHT_LAYER',[a])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          artboardId: a.artboardId,
          layerId: a.layerId
        })
      })

    case SHOW_HIDE_LAYER:
      consoleGroup('SHOW_HIDE_LAYER',[a])
      let layerId = a.layerId
      let hiddenLayer = state.Layers[layerId].hide = !state.Layers[layerId].hide
      return Object.assign({},state,{
        Layers: {
          ...state.Layers,
          hiddenLayer
        }
      })

    case TOGGLE_ARTBOARD_ITEM:
      consoleGroup('TOGGLE_ARTBOARD_ITEM',[a])
      let toggledProject = _.find(state.items, {id: a.projectId})
      let toggledValue = !_.find(toggledProject.artboards, {
        id: a.artboardId
      }).isCollapsed
      toggledProject.artboards[a.artboardId].isCollapsed = toggledValue
      return Object.assign({},state,{
        items: _.unionBy(state.items, [toggledProject], 'id')
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
