import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { artboardColors } from './artboardColors'
import Artboard from './Artboard'

class EditorWorkspace extends React.Component {
  render() {

    const {
      artboards,
      selections,
      highlights,
      selectArtboard,
      selectLayer,
      highlightLayer
    } = this.props

    return (
      <div className="editor-workspace__artboard-List">
        {_.map(artboards,(artboard,index) => { return (
          <Artboard
            artboardColor={artboardColors[index]}
            key={index}
            {...artboard}
            selections={selections}
            highlights={highlights}
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