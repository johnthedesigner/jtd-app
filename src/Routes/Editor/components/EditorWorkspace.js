import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Artboard from './Artboard'

class EditorWorkspace extends React.Component {
  render() {

    const {
      artboards,
      bumpLayers,
      highlightLayer,
      selectArtboard,
      selectGroup,
      selectLayer,
      selections,
      shiftSelectLayer,
    } = this.props

    return (
      <div className="editor-workspace__artboard-List">
        {_.map(artboards,(artboard,index) => { return (
          <Artboard
            {...artboard}
            key={index}
            bumpLayers={bumpLayers}
            selectArtboard={selectArtboard}
            selectGroup={selectGroup}
            selectLayer={selectLayer}
            selections={selections}
            shiftSelectLayer={shiftSelectLayer}
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