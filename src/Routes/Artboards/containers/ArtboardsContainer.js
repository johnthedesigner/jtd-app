import { connect } from 'react-redux'
import _ from 'lodash'

import {
  addArtboard,
  addLayer,
  adjustLayers,
  bumpLayers,
  copyLayers,
  deleteLayers,
  deselectLayersArtboard,
  dragLayers,
  highlightLayer,
  pasteLayers,
  resizeLayers,
  selectArtboard,
  selectLayer,
} from '../actions'

import ArtboardsView from '../components/ArtboardsView'

const mapDispatchToProps = (dispatch) => {
  return {
    addArtboard: (width, height, x, y) => {
      dispatch(addArtboard(width, height, x, y))
    },
    addLayer: (layerType) => {
      dispatch(addLayer(layerType))
    },
    adjustLayers: (layerIds, adjustmentGroup, key, value) => {
      dispatch(adjustLayers(layerIds, adjustmentGroup, key, value))
    },
    bumpLayers: (layerIds, axis, sign, shiftKey) => {
      dispatch(bumpLayers(layerIds, axis, sign, shiftKey))
    },
    copyLayers: () => {
      dispatch(copyLayers())
    },
    deleteLayers: (layerIds) => {
      dispatch(deleteLayers(layerIds))
    },
    deselectLayersArtboard: () => {
      dispatch(deselectLayersArtboard())
    },
    dragLayers: (layerId, x, y) => {
      dispatch(dragLayers(layerId, x, y))
    },
    highlightLayer: (layerId) => {
      dispatch(highlightLayer(layerId))
    },
    pasteLayers: () => {
      dispatch(pasteLayers())
    },
    resizeLayers: (layerIds, delta, xOffset, yOffset) => {
      dispatch(resizeLayers(layerIds, delta, xOffset, yOffset))
    },
    selectArtboard: (artboardId) => {
      dispatch(selectArtboard(artboardId))
    },
    selectLayer: (layerId, shiftKey) => {
      dispatch(selectLayer(layerId, shiftKey))
    },
  }
}

const mapStateToProps = (state) => ({
  Artboards: state.Artboards.Artboards,
  highlights: state.Artboards.highlights,
  Layers: state.Artboards.Layers,
  selections: state.Artboards.selections,
})

const ArtboardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtboardsView)

export default ArtboardsContainer
