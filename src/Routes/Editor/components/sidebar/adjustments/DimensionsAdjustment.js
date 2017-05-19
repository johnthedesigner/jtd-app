import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import TextInput from './inputs/TextInput'

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'dimensions'

    const { adjustments, layerId, adjustLayer } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayer(layerId, adjustmentGroup, propertyName, value)
    }

    let x = idx(adjustments, _ => _.x)
    if (!x) x = ''

    let y = idx(adjustments, _ => _.y)
    if (!y) y = ''

    let width = idx(adjustments, _ => _.width)
    if (!width) width = ''

    let height = idx(adjustments, _ => _.height)
    if (!height) height = ''

    if (adjustments) {
      return(
        <div>
          <div className="adjustment-group__header">
            <hr/>
            Dimensions
          </div>
          <TextInput
            key={layerId + adjustmentGroup + 'x'}
            propertyName={'x'}
            label='x'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={x}/>
          <TextInput
            key={layerId + adjustmentGroup + 'y'}
            propertyName={'y'}
            label='y'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={y}/>
          <TextInput
            key={layerId + adjustmentGroup + 'width'}
            propertyName={'width'}
            label='Width'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={width}/>
          <TextInput
            key={layerId + adjustmentGroup + 'height'}
            propertyName={'height'}
            label='Height'
            setLayerAdjustment={setLayerAdjustment}
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
