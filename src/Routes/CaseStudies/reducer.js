import _ from 'lodash'
import uuid from 'uuid'

import { consoleGroup } from '../../utils/utils'
import { getLayerDimensions } from './artboardUtils'
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
  MOVE_LAYERS,
  PASTE_LAYERS,
  SCALE_LAYER,
  SELECT_LAYER,
  TOGGLE_FLYOUT,
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
      let newLayerCaseStudies = _.cloneDeep(state.caseStudies)
      let newLayerArtboard = newLayerCaseStudies[a.caseStudyId]
      newLayerArtboard.layers.push(newLayer)
      newLayerArtboard.selections = [newLayer.id]
      console.log(newLayerArtboard)
      return Object.assign({},state,{ caseStudies: newLayerCaseStudies })

    case ADJUST_LAYERS:
      consoleGroup(a.type,[a])
      let adjustedCaseStudies = _.cloneDeep(state.caseStudies)
      let adjustedArtboard = adjustedCaseStudies[a.caseStudyId]
      let adjustedLayers = adjustedArtboard.selections
      _.each(adjustedLayers, (layerId) => {
        _.find(adjustedArtboard.layers,{id: layerId})
          .adjustments[a.adjustmentGroup][a.propertyName] = a.value
      })
      return Object.assign({},state,{ caseStudies: adjustedCaseStudies })

    case BUMP_LAYERS:
      consoleGroup(a.type,[a])
      const { axis, distance } = a
      let bumpedCaseStudies = _.cloneDeep(state.caseStudies)
      let bumpedArtboard = bumpedCaseStudies[a.caseStudyId]
      let bumpedLayers = bumpedArtboard.selections
      console.log(bumpedArtboard.layers)
      console.log(bumpedLayers)
      _.each(bumpedLayers, (layerId) => {
        let bumpedLayer = _.find(bumpedArtboard.layers, {id: layerId})
        bumpedLayer.dimensions[axis] += (distance)
      })
      return Object.assign({},state,{ caseStudies: bumpedCaseStudies })

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
      let draggedCaseStudies = _.cloneDeep(state.caseStudies)
      let draggedArtboard = draggedCaseStudies[a.caseStudyId]
      let affectedLayers = draggedArtboard.selections
      let draggedLayer = _.find(draggedArtboard.layers, {id: a.layerId})
      // Get bounding box of the layer being dragged to calculate offset
      let draggedLayerDimensions = getLayerDimensions([draggedLayer])
      let xDragOffset = a.x - draggedLayerDimensions.x
      let yDragOffset = a.y - draggedLayerDimensions.y
      // For each selected layer apply offset to all points
      _.each(affectedLayers, (layerId) => {
        let nextDraggedLayer = _.find(draggedArtboard.layers, {id: layerId})
        let d = nextDraggedLayer.dimensions
        nextDraggedLayer.dimensions = {
          x: Math.round(d.x + xDragOffset),
          y: Math.round(d.y + yDragOffset),
          width: d.width,
          height: d.height,
          rotation: d.rotation,
          scaleX: d.scaleX,
          scaleY: d.scaleY
        }
      })
      return Object.assign({},state,{ caseStudies: draggedCaseStudies })

    case HIGHLIGHT_LAYER:
      consoleGroup(a.type,[a])
      return Object.assign({},state,{
        highlights: Object.assign({},state.highlights,{
          layerId: a.layerId
        })
      })

    case MOVE_LAYERS:
      consoleGroup(a.type,[a])
      let movedCaseStudies = _.cloneDeep(state.caseStudies)
      let movedArtboard = movedCaseStudies[a.caseStudyId]
      let movedLayers = _.orderBy(_.map(movedArtboard.selections, (layerId) => {
        return _.find(movedArtboard.layers, {id: layerId})
      }), 'order')
      _.each(_.orderBy(movedLayers, 'order'), (layer) => {
        // Remove each selected layer
        _.remove(movedArtboard.layers, (checkLayer) => {
          return (checkLayer.id === layer.id)
        })
      })
      // Add selected layer back to the front or back of the list
      movedArtboard.layers = (a.direction === 'front') ?
        [...movedArtboard.layers, ...movedLayers] :
        [...movedLayers, ...movedArtboard.layers]
      _.each(movedArtboard.layers, (layer, index) => {
        layer.order = index
      })
      return Object.assign({},state,{ caseStudies: movedCaseStudies })

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

    case SCALE_LAYER:
      consoleGroup(a.type,[a])
      let scaledCaseStudies = _.cloneDeep(state.caseStudies)
      let scaledArtboard = scaledCaseStudies[a.caseStudyId]
      let scaledSelections = scaledArtboard.selections
      // Only attempt to apply new adjustments if a single layer is selected
      if (scaledSelections.length === 1) {
        // Get the affected layer and its dimensions
        let scaledLayer = _.find(
          scaledArtboard.layers,
          {'id': scaledSelections[0]}
        )
        let newDimensions = _.cloneDeep(scaledLayer.dimensions)

        // Calculate how much additional offset is needed for rotated layers
        const getRotationOffset = (axis, distance) => {
          return {
            x: distance * Math.cos((axis % 360) * (Math.PI / 180)),
            y: distance * Math.sin((axis % 360) * (Math.PI / 180))
          }
        }

        // For each resize direction apply scale and position offsets
        _.each(a.scaleDirectives, (directive) => {
          let { direction, distance } = directive
          console.log(distance)

          // First, apply position and scale offsets based on unrotated layer
          let resizeAxis = newDimensions.rotation
          switch(direction) {
            case 'right':
              newDimensions.width += distance
              newDimensions.x -= distance / 2
              break
            case 'bottom':
              resizeAxis += 90
              newDimensions.height += distance
              newDimensions.y -= distance / 2
              break
            case 'left':
              resizeAxis += 180
              newDimensions.width += distance
              newDimensions.x -= distance / 2
              break
            case 'top':
              resizeAxis += 270
              newDimensions.height += distance
              newDimensions.y -= distance / 2
              break
            default:
              // Do nothing
          }

          // Then apply additional offset for rotated layers
          newDimensions.x += getRotationOffset(resizeAxis, (distance / 2)).x
          newDimensions.y += getRotationOffset(resizeAxis, (distance / 2)).y
          console.log(newDimensions)
        })
        // Apply new dimensions temporarily (on drag) or permanently (on drop)
        if (a.previewOnly) {
          scaledLayer.tempDimensions = newDimensions
        } else {
          scaledLayer.dimensions = newDimensions
          scaledLayer.tempDimensions = undefined
        }
      }
      return Object.assign({}, state, {
        caseStudies: scaledCaseStudies,
      })

    case SELECT_LAYER:
      consoleGroup(a.type,[a])
      let selectedCaseStudies = _.cloneDeep(state.caseStudies)
      let selectedArtboard = selectedCaseStudies[a.caseStudyId]
      if (_.includes(selectedArtboard.selections,a.layerId) && !a.shiftKey) {
        return state
      } else {
        selectedCaseStudies[a.caseStudyId].selections = ((a.shiftKey) ?
          _.xor(selectedCaseStudies[a.caseStudyId].selections,[a.layerId]) :
          [a.layerId])
        return Object.assign({}, state, {
          caseStudies: selectedCaseStudies,
        })
      }

    case TOGGLE_FLYOUT:
      consoleGroup(a.type,[a])
      let caseStudiesWithFlyout = _.cloneDeep(state.caseStudies)
      let activeFlyout = caseStudiesWithFlyout[a.caseStudyId].activeFlyout
      caseStudiesWithFlyout[a.caseStudyId].activeFlyout =
        (activeFlyout === a.flyoutId) ? undefined : a.flyoutId
      return Object.assign({}, state, {
        caseStudies: caseStudiesWithFlyout,
      })

    default:
      return state
  }
}
