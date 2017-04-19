import { connect } from 'react-redux'

import {
  highlightLayer,
  selectArtboard,
  selectLayer,
  toggleArtboardItem,
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
    toggleArtboardItem: (projectId, artboardId) => {
      dispatch(toggleArtboardItem(projectId, artboardId))
    }
  }
}

const mapStateToProps = (state) => ({
  Projects: state.Projects
})

const EditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorView)

export default EditorContainer
