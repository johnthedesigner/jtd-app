import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { artboardColors } from '../artboardColors'
import ArtboardListItem from './ArtboardListItem'

class ArtboardsPalette extends React.Component {
  render() {

    const {
      match,
      artboards,
      selections,
      selectArtboard,
      selectLayer,
      showHideLayer,
      highlightLayer,
      toggleArtboardItem,
    } = this.props

    return (
      <div className="artboards-palette__wrapper">

        <div className="artboards-palette__header">
          {'Artboards'}
        </div>

        <div className="artboards-palette__artboards-list">
          {_.map(artboards,(artboard,index) => { return (
            <ArtboardListItem
              artboardColor={artboardColors[index]}
              match={match}
              key={index}
              {...artboard}
              selections={selections}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              showHideLayer={showHideLayer}
              highlightLayer={highlightLayer}
              toggleArtboardItem={toggleArtboardItem}/>
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