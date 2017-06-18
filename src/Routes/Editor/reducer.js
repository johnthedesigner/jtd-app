import _ from 'lodash'
import uuid from 'uuid'

import { consoleGroup } from '../../utils/utils'
import { newLayers } from '../../store/newLayers'
import {
  ADD_LAYER,
  ADJUST_LAYERS,
  BUMP_LAYERS,
  COPY_LAYERS,
  DELETE_LAYERS,
  DESELECT_LAYERS_ARTBOARD,
  DRAG_LAYERS,
  HIGHLIGHT_LAYER,
  PASTE_LAYERS,
  RESIZE_LAYERS,
  ROTATE_LAYERS,
  SELECT_ARTBOARD,
  SELECT_LAYER,
  SHOW_HIDE_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

// Files Reducer
export default function Projects(state = {}, a) {
  switch (a.type) {
    case ADD_LAYER:
      consoleGroup('ADD_LAYER',[a])
      let newLayer = newLayers[a.layerType]()
      newLayer.id = uuid.v1()
      let newLayerObj = _.keyBy([newLayer], 'id')
      let newLayerArtboard = state.selections.artboardId ?
        state.selections.artboardId : state.Projects[a.projectId].artboards[0]
      return Object.assign({},state,{
        Layers: {...state.Layers, ...newLayerObj},
        Artboards: _.keyBy([
          ...state.Artboards,
          Object.assign({},state.Artboards,{
            ...state.Artboards[newLayerArtboard],
            layers: [
              ...state.Artboards[newLayerArtboard].layers,
              newLayer.id
            ]
          })
        ], 'id'),
        selections: Object.assign({},state.selections,{
          layers: [newLayer.id]
        })
      })

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
      const { axis, distance } = a
      let bumpedLayers = Object.assign({},state.Layers)
      _.each(state.selections.layers, (layerId) => {
        if (bumpedLayers[layerId].adjustments) bumpedLayers[layerId]
          .adjustments['dimensions'][axis] += (distance)
      })
      return Object.assign({},state,{ Layers: bumpedLayers })

    case COPY_LAYERS:
      consoleGroup('COPY_LAYERS',[a])
      let copiedLayers = _.map(state.selections.layers, layerId => {
        return Object.assign({},state.Layers[layerId])
      })
      return Object.assign({},state,{
        pasteBuffer: _.cloneDeep(copiedLayers)
      })

    case DELETE_LAYERS:
      consoleGroup('DELETE_LAYERS',[a])
      let culledLayers = _.omitBy(state.Layers, layer => {
        return _.includes(state.selections.layers, layer.id)
      })
      return Object.assign({},state,{
        Layers: culledLayers,
        selections: Object.assign({},state.selections,{
          layers: []
        })
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

    case DRAG_LAYERS:
      consoleGroup('DRAG_LAYERS',[a])
      let draggedLayers = _.cloneDeep(state.Layers)
      let affectedLayers = _.clone(state.selections.layers)
      let xOffset = a.x - state.Layers[a.layerId].adjustments.dimensions.x
      let yOffset = a.y - state.Layers[a.layerId].adjustments.dimensions.y
      _.each(affectedLayers, (layerId) => {
        draggedLayers[layerId].adjustments.dimensions.x += xOffset
        draggedLayers[layerId].adjustments.dimensions.y += yOffset
      })
      return Object.assign({},state,{ Layers: draggedLayers })

    case HIGHLIGHT_LAYER:
      consoleGroup('HIGHLIGHT_LAYER',[a])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          ...state.selections,
          artboardId: a.artboardId,
          layerId: a.layerId
        })
      })

    case PASTE_LAYERS:
      consoleGroup('PASTE_LAYERS',[a])
      let pastedLayers = _.map(state.pasteBuffer, layer => {
        let pastedLayer = _.cloneDeep(layer)
        pastedLayer.id = uuid.v4()
        return pastedLayer
      })
      pastedLayers = _.keyBy(pastedLayers, 'id')
      let targetArtboard = Object.assign({},
        state.Artboards[state.selections.artboardId])
      targetArtboard.layers = [
        ...targetArtboard.layers,
        ..._.keys(pastedLayers)
      ]
      let updatedArtboards = _.keyBy([
        ...state.Artboards,
        targetArtboard
      ],'id')
      return Object.assign({},state,{
        Layers: {
          ...state.Layers,
          ...pastedLayers
        },
        Artboards: updatedArtboards,
        selections: Object.assign({},state.selections,{
          layers: _.keys(pastedLayers)
        })
      })

    case RESIZE_LAYERS:
      consoleGroup('RESIZE_LAYERS',[a])
      let resizedLayers = _.cloneDeep(state.Layers)
      _.each(state.selections.layers, (layerId) => {
        resizedLayers[layerId].adjustments.dimensions.width += a.delta.width
        resizedLayers[layerId].adjustments.dimensions.height += a.delta.height
      })
      return Object.assign({},state,{ Layers: resizedLayers })

    case SELECT_ARTBOARD:
      consoleGroup('SELECT_ARTBOARD',[a])
      return Object.assign({},state,{
        selections: Object.assign({},state.selections,{
          ...state.selections,
          artboardId: a.artboardId,
          layers: []
        })
      })

    case SELECT_LAYER:
      consoleGroup('SELECT_LAYER',[a])
      const { layers } = state.selections
      if (_.includes(layers,a.layerId) && !a.shiftKey) {
        return state
      } else {
        let parentArtboard = _.find(state.Artboards, artboard => {
          return _.includes(artboard.layers,a.layerId)
        })
        return Object.assign({},state,{
          selections: Object.assign({},state.selections,{
            ...state.selections,
            artboardId: parentArtboard.id,
            layers: ((a.shiftKey) ? _.xor(layers,[a.layerId]) : [a.layerId])
          })
        })
      }

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
