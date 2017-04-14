import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Artboard from './Artboard'

class EditorWorkspace extends React.Component {
  render() {

    const { artboards } = this.props

    return (
      <div className="editor-workspace__artboard-List">
        {_.map(artboards,(artboard,index) => { return (
          <Artboard key={index} {...artboard}/>
        )})}
      </div>
    )
  }
}

EditorWorkspace.propTypes = {
  artboards : PropTypes.object.isRequired
}

export default EditorWorkspace