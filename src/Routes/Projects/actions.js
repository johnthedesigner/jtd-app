import {
  HIGHLIGHT_LAYER,
  SELECT_ARTBOARD,
  SELECT_LAYER,
  TOGGLE_ARTBOARD_ITEM,
} from './constants'

export function highlightLayer(artboardId, layerId) {
  return {
    type: HIGHLIGHT_LAYER,
    artboardId,
    layerId
  }
}

export function selectArtboard(artboardId) {
  return {
    type: SELECT_ARTBOARD,
    artboardId
  }
}

export function selectLayer(artboardId, layerId) {
  return {
    type: SELECT_LAYER,
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
