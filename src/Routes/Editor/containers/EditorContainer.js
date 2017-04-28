import { connect } from 'react-redux'
import _ from 'lodash'

import {
  adjustLayer,
  deselectLayersArtboard,
  highlightLayer,
  selectArtboard,
  selectGroup,
  selectLayer,
  showHideLayer,
  toggleArtboardItem,
} from '../actions'

import EditorView from '../components/EditorView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    adjustLayer: (layerId, adjustmentGroup, key, value) => {
      dispatch(adjustLayer(layerId, adjustmentGroup, key, value))
    },
    deselectLayersArtboard: () => {
      dispatch(deselectLayersArtboard())
    },
    highlightLayer: (layerId) => {
      dispatch(highlightLayer(layerId))
    },
    selectArtboard: (artboardId) => {
      dispatch(selectArtboard(artboardId))
    },
    selectGroup: (groupId) => {
      dispatch(selectGroup(groupId))
    },
    selectLayer: (layerId, shiftKey) => {
      dispatch(selectLayer(layerId, shiftKey))
    },
    showHideLayer: (layerId) => {
      dispatch(showHideLayer(layerId))
    },
    toggleArtboardItem: (artboardId) => {
      dispatch(toggleArtboardItem(artboardId))
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
