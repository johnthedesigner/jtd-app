import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import TextInput from './TextInput'

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'dimensions'

    const { adjustments, layerIds, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(layerIds, adjustmentGroup, propertyName, (value - 0))
    }

    let x = idx(adjustments, _ => _.x)
    if (x !== 0 && !x) x = ''

    let y = idx(adjustments, _ => _.y)
    if (y !== 0 && !y) y = ''

    let width = Math.round(idx(adjustments, _ => _.width))
    if (width !== 0 && !width) width = ''

    let height = Math.round(idx(adjustments, _ => _.height))
    if (height !== 0 && !height) height = ''

    if (adjustments) {
      return(
        <div>
          <div className="adjustment-group__header">
            <hr/>
            Dimensions
          </div>
          <TextInput
            key={adjustmentGroup + 'x'}
            propertyName={'x'}
            label='x'
            setLayerAdjustment={setLayerAdjustment}
            type='number'
            valueFromProps={x}/>
          <TextInput
            key={adjustmentGroup + 'y'}
            propertyName={'y'}
            label='y'
            setLayerAdjustment={setLayerAdjustment}
            type='number'
            valueFromProps={y}/>
          <TextInput
            key={adjustmentGroup + 'width'}
            propertyName={'width'}
            label='Width'
            setLayerAdjustment={setLayerAdjustment}
            type='number'
            valueFromProps={width}/>
          <TextInput
            key={adjustmentGroup + 'height'}
            propertyName={'height'}
            label='Height'
            setLayerAdjustment={setLayerAdjustment}
            type='number'
            valueFromProps={height}/>
        </div>
      )
    } else {
      return null
    }
  }
}

DimensionsAdjustment.propTypes = {
  layer : PropTypes.object
}

export default DimensionsAdjustment
