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
  SELECT_ARTBOARD,
  SELECT_LAYER,
} from './constants'

export function addArtboard(width, height) {
  return {
    type: ADD_ARTBOARD,
    width,
    height
  }
}

export function addLayer(layerType) {
  return {
    type: ADD_LAYER,
    layerType
  }
}

export function adjustLayers(layerIds, adjustmentGroup, propertyName, value) {
  return {
    type: ADJUST_LAYERS,
    layerIds,
    adjustmentGroup,
    propertyName,
    value
  }
}

export function bumpLayers(axis, distance) {
  return {
    type: BUMP_LAYERS,
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

export function deselectLayersArtboard() {
  return {
    type: DESELECT_LAYERS_ARTBOARD
  }
}

export function dragLayers(layerId, x, y) {
  return {
    type: DRAG_LAYERS,
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

export function pasteLayers() {
  return {
    type: PASTE_LAYERS
  }
}

export function resizeLayers(layerIds, delta, xOffset, yOffset) {
  return {
    type: RESIZE_LAYERS,
    layerIds,
    delta,
    xOffset,
    yOffset
  }
}

export function selectArtboard(artboardId) {
  return {
    type: SELECT_ARTBOARD,
    artboardId
  }
}

export function selectLayer(layerId, shiftKey) {
  return {
    type: SELECT_LAYER,
    layerId,
    shiftKey
  }
}
