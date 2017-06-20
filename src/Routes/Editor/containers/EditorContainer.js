import { connect } from 'react-redux'
import _ from 'lodash'

import {
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
  showHideLayer,
  toggleArtboardItem,
  updateText,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    addLayer: (layerType, projectId, artboardId, layerId) => {
      dispatch(addLayer(layerType, projectId, artboardId, layerId))
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
    showHideLayer: (layerId) => {
      dispatch(showHideLayer(layerId))
    },
    toggleArtboardItem: (artboardId) => {
      dispatch(toggleArtboardItem(artboardId))
    },
    updateText: (layerId, text) => {
      dispatch(updateText(layerId, text))
    }
  }
}

const mapStateToProps = (state) => ({
  Artboards: state.Editor.Artboards,
  highlights: state.Editor.highlights,
  Layers: state.Editor.Layers,
  Projects: state.Editor.Projects,
  selections: state.Editor.selections,
})

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView)

export default EditorContainer
