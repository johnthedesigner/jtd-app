import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { scaleDimension } from '../artboardUtils'

class Artboard extends React.Component {
  constructor(props) {
    super(props)
    this.artboardClick = this.artboardClick.bind(this)
  }

  artboardClick(e) {
    e.stopPropagation()
    this.props.deselectLayersArtboard(this.props.id)
  }

  render() {
    const {
      height,
      isSelected,
      layerSelected,
      width,
      scaleFactor,
    } = this.props

    const toggleSelected = () => {
      return (isSelected || layerSelected) ? ' is-selected' : ''
    }

    const wrapperStyles = {
      width: scaleDimension(width,scaleFactor)
    }

    const frameStyles = {
      width: scaleDimension(width,scaleFactor),
      height: scaleDimension(height,scaleFactor)
    }

    return (
      <div
        className='artboard__wrapper'
        onClick={this.artboardClick}
        style={wrapperStyles}>
        <div
          className={'artboard__frame' + toggleSelected()}
          style={frameStyles}>
          {this.props.children}
          <div className='artboard__selection-indicator'></div>
        </div>
      </div>
    )
  }
}

Artboard.propTypes = {
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  layers: PropTypes.array.isRequired,
  layerSelected: PropTypes.bool,
  width: PropTypes.number.isRequired,
}

export default Artboard