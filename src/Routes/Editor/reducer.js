import _ from 'lodash'
import uuid from 'uuid'

import { consoleGroup } from '../../utils/utils'
import { getDimensions } from '../../utils/projectUtils'
import { newLayers } from '../../store/newLayers'
import {
  ADD_LAYER,
  ADD_ARTBOARD,
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
  TOGGLE_ARTBOARD_OPTIONS,
  UPDATE_TEXT,
} from './constants'

// Files Reducer
export default function Projects(state = {}, a) {
  switch (a.type) {
    case ADD_ARTBOARD:
      consoleGroup('ADD_LAYER',[a])
      let artboardsLowerExtent = _.last(_.orderBy(_.map(
        state.Projects[state.selections.projectId].artboards,
        artboardId => {
          return state.Artboards[artboardId].x +
            state.Artboards[artboardId].height
        }
      )))
      let newArtboard =   {
        id: uuid.v1(),
        title: 'New Artboard',
        width: a.width ? a.width : 100,
        height: a.height ? a.height : 100,
        x: a.x ? a.x : 0,
        y: a.y ? a.y : artboardsLowerExtent + 100,
        layers: []
      }
      let projectsNewArtboard = _.cloneDeep(state.Projects)
      projectsNewArtboard[state.selections.projectId].artboards
        .push(newArtboard.id)
      return Object.assign({},state,{
        Artboards: {
          ...state.Artboards,
          ..._.keyBy([newArtboard],'id')
        },
        Projects: projectsNewArtboard,
        editorModes: {
          ...state.editorModes,
          viewArtboardOptions: false
        }

      })


    case ADD_LAYER:
      consoleGroup('ADD_LAYER',[a])
      let newLayer = newLayers[a.layerType]()
      newLayer.id = uuid.v1()
      let newLayerObj = _.keyBy([newLayer], 'id')
      let newLayerArtboardId = state.selections.artboardId ?
        state.selections.artboardId : state.Projects[a.projectId].artboards[0]
      let newLayerArtboard = _.keyBy([{
        ...state.Artboards[newLayerArtboardId],
        layers: [
          ...state.Artboards[newLayerArtboardId].layers,
          newLayer.id
        ]
      }], 'id')
      return Object.assign({},state,{
        Layers: {...state.Layers, ...newLayerObj},
        Artboards: Object.assign({}, state.Artboards, newLayerArtboard),
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
      let xDragOffset = a.x - state.Layers[a.layerId].adjustments.dimensions.x
      let yDragOffset = a.y - state.Layers[a.layerId].adjustments.dimensions.y
      _.each(affectedLayers, (layerId) => {
        draggedLayers[layerId].adjustments.dimensions.x += xDragOffset
        draggedLayers[layerId].adjustments.dimensions.y += yDragOffset
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
      const { x, y, width, height } = getDimensions(_.map(
        state.selections.layers,
        layerId => {return state.Layers[layerId]}
      ))
      const { delta, xOffset, yOffset } = a
      let wScaleFactor = (width + delta.width) / width
      let hScaleFactor = (height + delta.height) / height
      let scaledLayers = _.cloneDeep(state.Layers)
      _.each(state.selections.layers, (layerId) => {
        let layerDimensions = scaledLayers[layerId].adjustments.dimensions
        let relativeX = ((layerDimensions.x - x) * wScaleFactor) + x + xOffset
        let relativeY = ((layerDimensions.y - y) * hScaleFactor) + y + yOffset
        scaledLayers[layerId].adjustments.dimensions.width *= wScaleFactor
        scaledLayers[layerId].adjustments.dimensions.height *= hScaleFactor
        scaledLayers[layerId].adjustments.dimensions.x = Math.round(relativeX)
        scaledLayers[layerId].adjustments.dimensions.y = Math.round(relativeY)
      })
      return Object.assign({},state,{ Layers: scaledLayers })

    case ROTATE_LAYERS:
      consoleGroup('ROTATE_LAYERS',[a])
      let rotatedLayers = _.cloneDeep(state.Layers)
      _.each(state.selections.layers, (layerId) => {
        rotatedLayers[layerId].adjustments.dimensions.rotation += a.degrees
      })
      return Object.assign({},state,{ Layers: rotatedLayers })

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

    case TOGGLE_ARTBOARD_OPTIONS:
      consoleGroup('TOGGLE_ARTBOARD_OPTIONS',[a])
      return Object.assign({},state,{
        editorModes: {
          ...state.editorModes,
          viewArtboardOptions: !state.editorModes.viewArtboardOptions
        }
      })

    case UPDATE_TEXT:
      consoleGroup('UPDATE_TEXT',[a])
      let textEditedLayers = _.cloneDeep(state.Layers)
      textEditedLayers[a.layerId].text = a.text
      return Object.assign({},state,{ Layers: adjustedLayers })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
