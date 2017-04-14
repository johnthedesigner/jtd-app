import { connect } from 'react-redux'

import EditorView from '../components/EditorView'

const mapStateToProps = (state) => ({
  Projects: state.Projects
})

const EditorContainer = connect(
  mapStateToProps
)(EditorView)

export default EditorContainer
