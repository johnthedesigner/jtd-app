import {
  ADJUST_LAYERS,
  BUMP_LAYERS,
  DESELECT_LAYERS_ARTBOARD,
  DRAG_LAYERS,
  HIGHLIGHT_LAYER,
  RESIZE_LAYERS,
  SELECT_ARTBOARD,
  SELECT_GROUP,
  SELECT_LAYER,
  SHOW_HIDE_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

export function adjustLayers(layerIds, adjustmentGroup, propertyName, value) {
  return {
    type: ADJUST_LAYERS,
    layerIds,
    adjustmentGroup,
    propertyName,
    value
  }
}

export function bumpLayers(layerIds, axis, sign, shiftKey) {
  return {
    type: BUMP_LAYERS,
    layerIds,
    axis,
    sign,
    shiftKey
  }
}

export function deselectLayersArtboard() {
  return {
    type: DESELECT_LAYERS_ARTBOARD
  }
}

export function highlightLayer(layerId) {
  return {
    type: HIGHLIGHT_LAYER,
    layerId
  }
}

export function dragLayers(layerIds, x, y) {
  return {
    type: DRAG_LAYERS,
    layerIds,
    x,
    y
  }
}

export function resizeLayers(layerIds, delta, direction) {
  return {
    type: RESIZE_LAYERS,
    layerIds,
    delta,
    direction
  }
}

export function selectArtboard(artboardId) {
  return {
    type: SELECT_ARTBOARD,
    artboardId
  }
}

export function selectGroup(groupId) {
  return {
    type: SELECT_GROUP,
    groupId
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
