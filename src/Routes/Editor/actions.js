import {
  ADJUST_LAYERS,
  DESELECT_LAYERS_ARTBOARD,
  HIGHLIGHT_LAYER,
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
