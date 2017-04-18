import { connect } from 'react-redux'

import {
  selectArtboard,
  selectLayer,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    selectArtboard: (projectId, artboardId) => {
      dispatch(selectArtboard(projectId, artboardId))
    },
    selectLayer: (projectId, artboardId, layerId) => {
      dispatch(selectLayer(projectId, artboardId, layerId))
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
