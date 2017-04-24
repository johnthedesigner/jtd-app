import { connect } from 'react-redux'

import {
  highlightLayer,
  selectArtboard,
  selectLayer,
  showHideLayer,
  toggleArtboardItem,
  adjustLayer,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const getSelectedLayer = (Editor) => {
  if (Editor.selections.layerId !== null) {
    return Editor.Layers[Editor.selections.layerId]
  } else {
    return {}
  }
}

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
    showHideLayer: (layerId) => {
      dispatch(showHideLayer(layerId))
    },
    toggleArtboardItem: (projectId, artboardId) => {
      dispatch(toggleArtboardItem(projectId, artboardId))
    },
    adjustLayer: (layerId, adjustmentGroup, key, value) => {
      dispatch(adjustLayer(layerId, adjustmentGroup, key, value))
    }
  }
}

const mapStateToProps = (state) => ({
  Artboards: state.Editor.Artboards,
  highlights: state.Editor.highlights,
  Layers: state.Editor.Layers,
  Projects: state.Editor.Projects,
  selectedLayer: getSelectedLayer(state.Editor),
  selections: state.Editor.selections,
})

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView)

export default EditorContainer
