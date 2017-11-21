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
  ROTATE_LAYER,
  SCALE_LAYER,
  SELECT_LAYER,
  TOGGLE_FLYOUT,
} from './constants'

export function addArtboard(width, height) {
  return {
    type: ADD_ARTBOARD,
    width,
    height
  }
}

export function addLayer(caseStudyId, layerType) {
  return {
    type: ADD_LAYER,
    caseStudyId,
    layerType
  }
}

export function adjustLayers(caseStudyId, adjustmentGroup, propertyName, value) {
  return {
    type: ADJUST_LAYERS,
    caseStudyId,
    adjustmentGroup,
    propertyName,
    value
  }
}

export function bumpLayers(caseStudyId, axis, distance) {
  return {
    type: BUMP_LAYERS,
    caseStudyId,
    axis,
    distance,
  }
}

export function copyLayers() {
  return {
    type: COPY_LAYERS
  }
}

export function deleteLayers() {
  return {
    type: DELETE_LAYERS
  }
}

export function deselectLayersArtboard(caseStudyId) {
  return {
    type: DESELECT_LAYERS_ARTBOARD,
    caseStudyId
  }
}

export function dragLayers(caseStudyId, layerId, x, y) {
  return {
    type: DRAG_LAYERS,
    caseStudyId,
    layerId,
    x,
    y
  }
}

export function highlightLayer(layerId) {
  return {
    type: HIGHLIGHT_LAYER,
    layerId
  }
}

export function moveLayers(caseStudyId, direction) {
  return {
    type: MOVE_LAYERS,
    caseStudyId,
    direction
  }
}
export function pasteLayers() {
  return {
    type: PASTE_LAYERS
  }
}

export function rotateLayer(caseStudyId, degrees) {
  return {
    type: ROTATE_LAYER,
    caseStudyId,
    degrees
  }
}

export function scaleLayer(caseStudyId, scaleDirectives, previewOnly) {
  return{
    type: SCALE_LAYER,
    caseStudyId,
    scaleDirectives,
    previewOnly
  }
}

export function selectLayer(caseStudyId, layerId, shiftKey) {
  return {
    type: SELECT_LAYER,
    caseStudyId,
    layerId,
    shiftKey
  }
}

export function toggleFlyout(caseStudyId, flyoutId) {
  return {
    type: TOGGLE_FLYOUT,
    caseStudyId,
    flyoutId
  }
}
