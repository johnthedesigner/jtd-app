import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import TextInput from './TextInput'

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'dimensions'

    const { adjustments, adjustLayers, resizeLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, (value - 0))
    }

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

    const setLayerSize = ( newX, newY, newWidth, newHeight ) => {
      let delta = {
        x: newX - x,
        y: newY - y,
        width: newWidth - width,
        height: newHeight - height
      }
      resizeLayers(delta, 0, 0)
    }
    const setX = (newX) => { setLayerSize(newX, y, width, height) }
    const setY = (newY) => { setLayerSize(x, newY, width, height) }
    const setWidth = (newWidth) => { setLayerSize(x, y, newWidth, height) }
    const setHeight = (newHeight) => { setLayerSize(x, y, width, newHeight) }

    if (adjustments) {
      return(
        <div>
          <TextInput
            key={adjustmentGroup + 'x'}
            propertyName={'x'}
            label='x'
            setValue={setX}
            type='number'
            valueFromProps={x}/>
          <TextInput
            key={adjustmentGroup + 'y'}
            propertyName={'y'}
            label='y'
            setValue={setY}
            type='number'
            valueFromProps={y}/>
          <TextInput
            key={adjustmentGroup + 'width'}
            propertyName={'width'}
            label='Width'
            setValue={setWidth}
            type='number'
            valueFromProps={width}/>
          <TextInput
            key={adjustmentGroup + 'height'}
            propertyName={'height'}
            label='Height'
            setValue={setHeight}
            type='number'
            valueFromProps={height}/>
          <TextInput
            key={adjustmentGroup + 'rotation'}
            propertyName={'rotation'}
            label='Rotation'
            setLayerAdjustment={setLayerAdjustment}
            type='number'
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
