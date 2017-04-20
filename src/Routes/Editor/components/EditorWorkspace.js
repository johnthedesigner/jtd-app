import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Artboard from './Artboard'

class EditorWorkspace extends React.Component {
  render() {

    const {
      artboards,
      selectArtboard,
      selectLayer,
      highlightLayer
    } = this.props

    return (
      <div className="editor-workspace__artboard-List">
        {_.map(artboards,(artboard,index) => { return (
          <Artboard
            {...artboard}
            key={index}
            selectArtboard={selectArtboard}
            selectLayer={selectLayer}
            highlightLayer={highlightLayer}/>
        )})}
      </div>
    )
  }
}

EditorWorkspace.propTypes = {
  artboards : PropTypes.array.isRequired
}

export default EditorWorkspace