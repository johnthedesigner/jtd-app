import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Artboard extends React.Component {
  render() {

    const {
      height,
      id,
      isSelected,
      layerSelected,
      selectArtboard,
      title,
      width,
    } = this.props

    const toggleSelected = () => {
      return (isSelected || layerSelected) ? ' is-selected' : ''
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
          className={'artboard__frame' + toggleSelected()}
          style={frameStyles}
          onClick={(e) => {
            e.stopPropagation()
            // selectArtboard(id)
          }}>
          {this.props.children}
          <div className='artboard__selection-indicator'></div>
        </div>
      </div>
    )
  }
}

Artboard.propTypes = {
  artboardColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  layers: PropTypes.array.isRequired,
  selectArtboard: PropTypes.func.isRequired,
}

export default Artboard