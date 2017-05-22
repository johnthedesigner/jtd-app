import idx from 'idx'
import _ from 'lodash'

import { consoleGroup } from '../../utils/utils'
import { getNestedLayers } from '../../utils/projectUtils'
import {
  ADJUST_LAYERS,
  BUMP_LAYERS,
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
    case ADJUST_LAYERS:
      consoleGroup('ADJUST_LAYERS',[a])

      let adjustedLayers = Object.assign({},state.Layers)
      _.each(a.layerIds, (layerId) => {
        adjustedLayers[layerId]
          .adjustments[a.adjustmentGroup][a.propertyName] = a.value
      })

      return Object.assign({},state,{ Layers: adjustedLayers })

    case BUMP_LAYERS:
      consoleGroup('BUMP_LAYERS',[a])
      const { layerIds, axis, sign, shiftKey } = a
      var distance = (shiftKey) ? 10 : 1
      let bumpedLayers = Object.assign({},state.Layers)
      _.each(layerIds, (layerId) => {
        if (bumpedLayers[layerId].adjustments) bumpedLayers[layerId]
          .adjustments['dimensions'][axis] += (distance * sign)
      })
      return Object.assign({},state,{ Layers: bumpedLayers })

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
      const nestedLayers = getNestedLayers(state.Layers, a.layerId)
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
          layers: ((a.shiftKey) ? _.xor(layers,nestedLayers) : nestedLayers)
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
