import _ from 'lodash'
import uuid from 'uuid'

import { consoleGroup } from '../../utils/utils'
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
  ENABLE_TEXT_EDITOR,
  HIGHLIGHT_LAYER,
  MOVE_LAYERS,
  PASTE_LAYERS,
  ROTATE_LAYER,
  SCALE_LAYER,
  SELECT_LAYER,
  TOGGLE_FLYOUT,
  UPDATE_TEXT,
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
      _.each(bumpedLayers, (layerId) => {
        let bumpedLayer = _.find(bumpedArtboard.layers, {id: layerId})
        bumpedLayer.dimensions[axis] += (distance)
      })
      console.log(bumpedCaseStudies)
      return Object.assign({},state,{ caseStudies: bumpedCaseStudies })

    case COPY_LAYERS:
      consoleGroup(a.type,[a])
      let copiedCaseStudies = _.cloneDeep(state.caseStudies)
      let copiedArtboard = copiedCaseStudies[a.caseStudyId]
      let copiedLayers = _.map(copiedArtboard.selections, layerId => {
        return Object.assign({}, _.find(copiedArtboard.layers, (layer) => {
          return layer.id === layerId
        }))
      })
      return Object.assign({},state,{
        pasteBuffer: _.cloneDeep(copiedLayers)
      })

    case DELETE_LAYERS:
      consoleGroup(a.type,[a])
      let culledCaseStudies = _.cloneDeep(state.caseStudies)
      let culledArtboard = culledCaseStudies[a.caseStudyId]
      culledArtboard.layers = _.remove(culledArtboard.layers, (layer) => {
        return (layer.id !== culledArtboard.selections[0])
      })
      culledArtboard.selections = []
      return Object.assign({}, state, { caseStudies: culledCaseStudies })

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
      // For each selected layer apply offset to all points
      _.each(affectedLayers, (layerId) => {
        let nextDraggedLayer = _.find(draggedArtboard.layers, {id: layerId})
        let draggedDimensions = _.cloneDeep(nextDraggedLayer.dimensions)
        draggedDimensions.x += Math.round(a.x)
        draggedDimensions.y += Math.round(a.y)
        if (a.previewOnly) {
          nextDraggedLayer.tempDimensions = draggedDimensions
        } else {
          nextDraggedLayer.dimensions = draggedDimensions
          nextDraggedLayer.tempDimensions = undefined
        }
      })
      return Object.assign({}, state, { caseStudies: draggedCaseStudies })

    case ENABLE_TEXT_EDITOR:
      consoleGroup(a.type,[a])
      let editTextCaseStudies = _.cloneDeep(state.caseStudies)
      let editTextArtboard = editTextCaseStudies[a.caseStudyId]
      editTextArtboard.editableTextLayer = a.layerId
      return Object.assign({}, state, { caseStudies: editTextCaseStudies })

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
      return Object.assign({}, state, { caseStudies: movedCaseStudies })

    case PASTE_LAYERS:
      consoleGroup(a.type,[a])
      let pastedCaseStudies = _.cloneDeep(state.caseStudies)
      let pastedArtboard = pastedCaseStudies[a.caseStudyId]
      let pastedLayers = _.map(state.pasteBuffer, layer => {
        let pastedLayer = _.cloneDeep(layer)
        pastedLayer.id = uuid.v4()
        return pastedLayer
      })
      let pastedLayerIds = _.map(pastedLayers, (layer) => { return layer.id })
      pastedArtboard.layers = [
        ...pastedArtboard.layers,
        ...pastedLayers
      ]
      pastedArtboard.selections = pastedLayerIds
      return Object.assign({}, state, { caseStudies: pastedCaseStudies })

    case ROTATE_LAYER:
      consoleGroup(a.type,[a])
      const { degrees, caseStudyId } = a
      let rotatedCaseStudies = _.cloneDeep(state.caseStudies)
      let rotatedArtboard = rotatedCaseStudies[caseStudyId]
      let rotatedLayerId = rotatedArtboard.selections[0]
      let rotatedLayer = _.find(rotatedArtboard.layers, {id: rotatedLayerId})
      rotatedLayer.dimensions.rotation = degrees
      return Object.assign({}, state, { caseStudies: rotatedCaseStudies })

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
        })
        // Apply new dimensions temporarily (on drag) or permanently (on drop)
        if (a.previewOnly) {
          scaledLayer.tempDimensions = newDimensions
        } else {
          scaledLayer.dimensions = newDimensions
          scaledLayer.tempDimensions = undefined
        }
      }
      return Object.assign({}, state, { caseStudies: scaledCaseStudies })

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

    case UPDATE_TEXT:
      consoleGroup(a.type,[a])
      let newTextCaseStudies = _.cloneDeep(state.caseStudies)
      let newTextArtboard = newTextCaseStudies[a.caseStudyId]
      let newTextLayer = _.filter(newTextArtboard.layers, (layer) => {
        return layer.id === newTextArtboard.editableTextLayer
      })[0]
      newTextLayer.text = a.text
      return Object.assign({}, state, {
        caseStudies: newTextCaseStudies,
      })

    default:
      return state
  }
}
