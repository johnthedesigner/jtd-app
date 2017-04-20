import { connect } from 'react-redux'

import {
  highlightLayer,
  selectArtboard,
  selectLayer,
  showHideLayer,
  toggleArtboardItem,
  updateDimensions,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    selectArtboard: (artboardId) => {
      dispatch(selectArtboard(artboardId))
    },
    selectLayer: (artboardId, layerId) => {
      dispatch(selectLayer(artboardId, layerId))
    },
    highlightLayer: (artboardId, layerId) => {
      dispatch(highlightLayer(artboardId, layerId))
    },
    showHideLayer: (projectId, artboardId, layerId) => {
      dispatch(showHideLayer(projectId, artboardId, layerId))
    },
    toggleArtboardItem: (projectId, artboardId) => {
      dispatch(toggleArtboardItem(projectId, artboardId))
    },
    updateDimensions: (layerId, dimensions) => {
      dispatch(updateDimensions(layerId, dimensions))
    }
  }
}

const mapStateToProps = (state) => ({
  Artboards: state.Editor.Artboards,
  highlights: state.Editor.highlights,
  Layers: state.Editor.Layers,
  Projects: state.Editor.Projects,
  selectedLayer: state.Editor.Layers[state.Editor.selections.layerId],
  selections: state.Editor.selections,
})

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView)

export default EditorContainer
