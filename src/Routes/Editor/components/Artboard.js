import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import idx from 'idx'

import SelectionControl from './layers/SelectionControl'

class Artboard extends React.Component {
  render() {

    const {
      height,
      id,
      isSelected,
      layerSelected,
      selectArtboard,
      selection,
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

    const selectionControlStyles = {
      marginLeft: idx(selection, _ => _.dimensions.x) + 'px',
      marginTop: idx(selection, _ => _.dimensions.y) + 'px',
      width: idx(selection, _ => _.dimensions.width)
        * idx(selection, _ => _.dimensions.scaleX) + 'px',
      height: idx(selection, _ => _.dimensions.height)
        * idx(selection, _ => _.dimensions.scaleY) + 'px',
      transform: 'rotate(' + idx(selection, _ => _.dimensions.rotation)
        + 'deg)'
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
            selectArtboard(id)
          }}>
          {this.props.children}
          <SelectionControl
            artboardId={id}
            isActive={selection.isActive}
            selectionControlStyles={selectionControlStyles}/>
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