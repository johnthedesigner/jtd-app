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
  UPDATE_TEXT,
} from './constants'

export function addLayer(layerType, projectId) {
  return {
    type: ADD_LAYER,
    layerType,
    projectId
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

export function rotateLayers(degrees) {
  return {
    type: ROTATE_LAYERS,
    degrees
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

export function showHideLayer(layerId) {
  return {
    type: SHOW_HIDE_LAYER,
    layerId
  }
}

export function toggleArtboardItem(artboardId) {
  return {
    type: TOGGLE_ARTBOARD_ITEM,
    artboardId
  }
}

export function updateText(layerId, text) {
  return {
    type: UPDATE_TEXT,
    layerId,
    text
  }
}
