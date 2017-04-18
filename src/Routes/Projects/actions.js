import {
  SELECT_ARTBOARD,
  SELECT_LAYER,
} from './constants'

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
