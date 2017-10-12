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
  showHideLayer,
  toggleArtboardItem,
  toggleArtboardOptions,
  updateText,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    addArtboard: (width, height, x, y) => {
      dispatch(addArtboard(width, height, x, y))
    },
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
    toggleArtboardOptions: () => {
      dispatch(toggleArtboardOptions())
    },
    updateText: (layerId, text) => {
      dispatch(updateText(layerId, text))
    },
    historyPlayback: (actions) => {
      // Recursively trigger history actions with delays
      function nextDispatch(increment, actionsList) {
        console.log('dispatching next action')
        dispatch(actionsList[increment])
        if (actionsList[increment + 1] !== undefined) {
          setTimeout(
            function(){
              nextDispatch(increment + 1, actionsList)
            },
            actionsList[increment + 1].delay
          )
        }
      }
      if (actions[0] !== undefined) nextDispatch(0, actions)
    }
  }
}

const mapStateToProps = (state) => ({
  Artboards: state.Editor.Artboards,
  highlights: state.Editor.highlights,
  Layers: state.Editor.Layers,
  Projects: state.Editor.Projects,
  selections: state.Editor.selections,
  editorModes: state.Editor.editorModes,
  History: state.History,
})

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView)

export default EditorContainer
