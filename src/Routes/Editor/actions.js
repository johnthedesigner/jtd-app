import {
  ADJUST_LAYER,
  ARTBOARD_LAYER_SELECTION,
  HIGHLIGHT_LAYER,
  SHOW_HIDE_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

export function adjustLayer(layerId, adjustmentGroup, propertyName, value) {
  return {
    type: ADJUST_LAYER,
    layerId,
    adjustmentGroup,
    propertyName,
    value
  }
}

export function deselectLayersArtboards() {
  return {
    type: ARTBOARD_LAYER_SELECTION,
    artboardId: null,
    layerId: null
  }
}

export function highlightLayer(artboardId, layerId) {
  return {
    type: HIGHLIGHT_LAYER,
    artboardId,
    layerId
  }
}

export function selectArtboard(artboardId) {
  return {
    type: ARTBOARD_LAYER_SELECTION,
    artboardId,
    layerId: null
  }
}

export function selectLayer(artboardId, layerId) {
  return {
    type: ARTBOARD_LAYER_SELECTION,
    artboardId,
    layerId
  }
}

export function showHideLayer(layerId) {
  return {
    type: SHOW_HIDE_LAYER,
    layerId
  }
}

export function toggleArtboardItem(projectId, artboardId) {
  return {
    type: TOGGLE_ARTBOARD_ITEM,
    projectId,
    artboardId
  }
}
