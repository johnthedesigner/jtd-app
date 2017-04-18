import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class ArtboardsPalette extends React.Component {
  render() {

    const { artboards } = this.props

    return (
      <div className="artboards-palette__wrapper">

        <div className="artboards-palette__header">
          {'Artboards'}
        </div>

        <div className="artboards-palette__artboards-list">
          {_.map(artboards,(artboard,index) => { return (
            <p key={index}>{artboard.title}</p>
          )})}
        </div>
      </div>
    )
  }
}

ArtboardsPalette.propTypes = {
  artboards : PropTypes.array.isRequired
}

export default ArtboardsPalette