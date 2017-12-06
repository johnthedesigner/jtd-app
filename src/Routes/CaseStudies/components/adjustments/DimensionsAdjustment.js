import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import TextInput from './TextInput'

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'dimensions'

    const { adjustments, bumpLayers, rotateLayer, scaleLayer } = this.props

    let x = idx(adjustments, _ => _.x)
    if (x !== 0 && !x) x = ''

    let y = idx(adjustments, _ => _.y)
    if (y !== 0 && !y) y = ''

    let width = Math.round(idx(adjustments, _ => _.width))
    if (width !== 0 && !width) width = ''

    let height = Math.round(idx(adjustments, _ => _.height))
    if (height !== 0 && !height) height = ''

    let rotation = Math.round(idx(adjustments, _ => _.rotation))
    if (rotation !== 0 && !rotation) rotation = ''

    const setX = (newX) => {
      let distance = Math.floor(newX - x)
      bumpLayers('x', distance)
    }
    const setY = (newY) => {
      let distance = Math.floor(newY - y)
      bumpLayers('y', distance)
    }
    const setWidth = (newWidth) => {
      let distance = Math.floor(newWidth - width)
      scaleLayer([
        { direction: 'right', distance }
      ], false)
    }
    const setHeight = (newHeight) => {
      let distance = Math.floor(newHeight - height)
      scaleLayer([
        { direction: 'bottom', distance }
      ], false)
    }
    const setRotation = (degrees) => {
      rotateLayer(Math.floor(degrees))
    }
    if (adjustments) {
      return(
        <div className='adjustments-panel__adjustment-block'>
          <TextInput
            key={adjustmentGroup + 'x'}
            propertyName={'x'}
            label='X'
            setValue={setX}
            suffix='px'
            type='text'
            valueFromProps={x}/>
          <TextInput
            key={adjustmentGroup + 'y'}
            propertyName={'y'}
            label='Y'
            setValue={setY}
            suffix='px'
            type='text'
            valueFromProps={y}/>
          <TextInput
            key={adjustmentGroup + 'width'}
            propertyName={'width'}
            label='W'
            setValue={setWidth}
            suffix='px'
            type='text'
            valueFromProps={width}/>
          <TextInput
            key={adjustmentGroup + 'height'}
            propertyName={'height'}
            label='H'
            setValue={setHeight}
            suffix='px'
            type='text'
            valueFromProps={height}/>
          <TextInput
            key={adjustmentGroup + 'rotation'}
            propertyName={'rotation'}
            label='R'
            setValue={setRotation}
            suffix='deg'
            type='text'
            valueFromProps={rotation}/>
        </div>
      )
    } else {
      return null
    }
  }
}

DimensionsAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
}

export default DimensionsAdjustment
