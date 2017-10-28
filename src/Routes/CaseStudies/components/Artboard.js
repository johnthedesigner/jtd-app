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
      isSelected,
      layerSelected,
      scaleFactor,
    } = this.props

    // Hard-coded artboard heights and widths
    let width = 1000
    let height = 1000

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
        </div>
      </div>
    )
  }
}

Artboard.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  layerSelected: PropTypes.bool,
}

export default Artboard