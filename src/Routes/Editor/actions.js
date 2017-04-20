import {
  ARTBOARD_LAYER_SELECTION,
  HIGHLIGHT_LAYER,
  SHOW_HIDE_LAYER,
  TOGGLE_ARTBOARD_ITEM,
  UPDATE_DIMENSIONS,
} from './constants'

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

export function showHideLayer(projectId, artboardId, layerId) {
  return {
    type: SHOW_HIDE_LAYER,
    artboardId,
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

export function updateDimensions(layerId, dimensions) {
  return {
    type: UPDATE_DIMENSIONS,
    layerId,
    dimensions
  }
}
