import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Layer from './layers/Layer'

class Artboard extends React.Component {
  render() {

    const {
      artboardColor,
      id,
      title,
      height,
      width,
      layers,
      selections,
      highlights,
      selectArtboard,
      selectLayer,
      highlightLayer
    } = this.props

    const toggleSelected = () => {
      if (id === selections.artboardId) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    const toggleHighlighted = () => {
      if (id === highlights.artboardId) {
        return ' is-highlighted'
      } else {
        return ' not-highlighted'
      }
    }

    const wrapperStyles = {
      width: width
    }

    const frameStyles = {
      width: width,
      height: height
    }

    return (
      <div className='artboard__wrapper' style={wrapperStyles}>
        <div
          className='artboard__header'
          onClick={(e) => {
            e.stopPropagation()
            selectArtboard(id)
          }}>
            {title}
          </div>
        <div
          className={'artboard__frame' + toggleSelected() + toggleHighlighted()}
          style={frameStyles}
          onClick={(e) => {
            e.stopPropagation()
            selectArtboard(id)
          }}>
          {_.map(layers,(layer,index) => { return (
            <Layer
              artboardColor={artboardColor}
              artboardId={id}
              key={index}
              layer={layer}
              selections={selections}
              highlights={highlights}
              selectLayer={selectLayer}
              highlightLayer={highlightLayer}/>
          )})}
          <div className='artboard__selection-indicator'></div>
        </div>
      </div>
    )
  }
}

Artboard.propTypes = {
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  layers : PropTypes.array.isRequired,
  selections: PropTypes.object.isRequired,
  highlights: PropTypes.object.isRequired
}

export default Artboard