import idx from 'idx'
import _ from 'lodash'

import { consoleGroup } from '../../utils/utils'
import {
  ADJUST_LAYER,
  DESELECT_LAYERS_ARTBOARD,
  HIGHLIGHT_LAYER,
  SELECT_ARTBOARD,
  SELECT_GROUP,
  SELECT_LAYER,
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

    case DESELECT_LAYERS_ARTBOARD:
      consoleGroup('DESELECT_LAYERS_ARTBOARD',[a])
      return Object.assign({},state,{
        selections: {
          ...state.selections,
          artboardId: null,
          groupId: null,
          layers: []
        }
      })

    case HIGHLIGHT_LAYER:
      consoleGroup('HIGHLIGHT_LAYER',[a])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          ...state.selections,
          artboardId: a.artboardId,
          layerId: a.layerId
        })
      })

    case SELECT_ARTBOARD:
      consoleGroup('SELECT_ARTBOARD',[a])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          ...state.selections,
          artboardId: a.artboardId,
          groupId: null,
          layers: []
        })
      })

    case SELECT_GROUP:
      consoleGroup('SELECT_GROUP',[a])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          ...state.selections,
          groupId: a.groupId
        })
      })

    case SELECT_LAYER:
      consoleGroup('SELECT_LAYER',[a])
      const selectedGroupLayers = idx(state, _ =>
        _.Layers[state.selections.groupId].layers)
      const fromSameGroup = _.includes(selectedGroupLayers,a.layerId)
      const groupId = ((fromSameGroup) ? state.selections.groupId : null)
      const { layers } = state.selections
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          ...state.selections,
          artboardId: null,
          groupId,
          layers: ((a.shiftKey) ? _.xor(layers,[a.layerId]) : [a.layerId])
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
