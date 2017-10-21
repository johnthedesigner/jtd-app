import _ from 'lodash'
import uuid from 'uuid'

import { consoleGroup } from '../../utils/utils'
import { getDimensions } from '../../utils/projectUtils'
import { newLayers } from '../../store/newLayers'
import {
  ADD_ARTBOARD,
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
  SELECT_LAYER,
} from './constants'

export default function Artboards(state = {}, a) {
  switch (a.type) {
    case ADD_ARTBOARD:
      consoleGroup(a.type,[a])
      let newArtboard =   {
        id: uuid.v1(),
        title: 'New Artboard',
        width: a.width ? a.width : 1000,
        height: a.height ? a.height : 1000,
        layers: []
      }
      return Object.assign({},state,{
        Artboards: {
          ...state.Artboards,
          ..._.keyBy([newArtboard],'id')
        }
      })

    case ADD_LAYER:
      consoleGroup(a.type,[a])
      let newLayer = newLayers[a.layerType]()
      newLayer.id = uuid.v1()
      let newLayerObj = _.keyBy([newLayer], 'id')
      let newLayerArtboardId = state.selections.artboardId ?
        state.selections.artboardId : _.find(state.Artboards,(a)=>{
          return typeof a !== undefined
        }).id
      newLayer.order = state.Artboards[newLayerArtboardId].layers.length
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
      consoleGroup(a.type,[a])
      let adjustedLayers = Object.assign({},state.Layers)
      _.each(a.layerIds, (layerId) => {
        adjustedLayers[layerId]
          .adjustments[a.adjustmentGroup][a.propertyName] = a.value
      })
      return Object.assign({},state,{ Layers: adjustedLayers })

    case BUMP_LAYERS:
      consoleGroup(a.type,[a])
      const { axis, distance } = a
      let bumpedLayers = Object.assign({},state.Layers)
      _.each(state.selections.layers, (layerId) => {
        if (bumpedLayers[layerId].adjustments) bumpedLayers[layerId]
          .adjustments['dimensions'][axis] += (distance)
      })
      return Object.assign({},state,{ Layers: bumpedLayers })

    case COPY_LAYERS:
      consoleGroup(a.type,[a])
      let copiedLayers = _.map(state.selections.layers, layerId => {
        return Object.assign({},state.Layers[layerId])
      })
      return Object.assign({},state,{
        pasteBuffer: _.cloneDeep(copiedLayers)
      })

    case DELETE_LAYERS:
      consoleGroup(a.type,[a])
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
      consoleGroup(a.type,[a])
      let caseStudiesDeselected = _.cloneDeep(state.caseStudies)
      caseStudiesDeselected[a.caseStudyId].selections = []
      return Object.assign({},state,{
        caseStudies: caseStudiesDeselected
      })

    case DRAG_LAYERS:
      consoleGroup(a.type,[a])
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
      consoleGroup(a.type,[a])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          layerId: a.layerId
        })
      })

    case PASTE_LAYERS:
      consoleGroup(a.type,[a])
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
      consoleGroup(a.type,[a])
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

    case SELECT_LAYER:
      consoleGroup(a.type,[a])
      let updatedCaseStudies = _.cloneDeep(state.caseStudies)
      updatedCaseStudies[a.caseStudyId].selections = ((a.shiftKey) ? _.xor(updatedCaseStudies[a.caseStudyId].selections,[a.layerId]) : [a.layerId])
      return Object.assign({}, state, {
        caseStudies: updatedCaseStudies,
      })

    default:
      return state
  }
}