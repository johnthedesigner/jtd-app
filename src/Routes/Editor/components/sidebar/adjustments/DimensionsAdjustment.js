import React from 'react'
import PropTypes from 'prop-types'

import TextInput from './inputs/TextInput'

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'dimensions'

    const { adjustments, layerId, adjustLayer } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayer(layerId, 'dimensions', propertyName, value)
    }

    let dimensions = {}
    if (adjustments !== undefined) dimensions = adjustments.dimensions
    return (
      <div>
        <TextInput
          key={layerId + adjustmentGroup + 'x'}
          handleChange={this.handleChange}
          propertyName={'x'}
          label='x'
          setLayerAdjustment={setLayerAdjustment}
          value={dimensions.x}/>
        <TextInput
          key={layerId + adjustmentGroup + 'y'}
          handleChange={this.handleChange}
          propertyName={'y'}
          label='y'
          setLayerAdjustment={setLayerAdjustment}
          value={dimensions.y}/>
        <TextInput
          key={layerId + adjustmentGroup + 'width'}
          handleChange={this.handleChange}
          propertyName={'width'}
          label='Width'
          setLayerAdjustment={setLayerAdjustment}
          value={dimensions.width}/>
        <TextInput
          key={layerId + adjustmentGroup + 'height'}
          handleChange={this.handleChange}
          propertyName={'height'}
          label='Height'
          setLayerAdjustment={setLayerAdjustment}
          value={dimensions.height}/>
      </div>
    )
  }
}

DimensionsAdjustment.propTypes = {
  layer : PropTypes.object
}

export default DimensionsAdjustment