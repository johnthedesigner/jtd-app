import React from 'react'
import PropTypes from 'prop-types'

import EditorWorkspace from './EditorWorkspace'

class EditorView extends React.Component {
  render() {

    const { Projects, match } = this.props
    const project = Projects[match.params.id]

    return (
      <div className="editor-view__wrapper">
        <EditorWorkspace artboards={project.artboards}/>
      </div>
    )
  }
}

EditorView.propTypes = {
  Projects : PropTypes.object.isRequired
}

export default EditorView