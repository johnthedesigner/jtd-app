import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import TextInput from './inputs/TextInput'

class FillAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'fill'

    const { adjustments, layerId, adjustLayer } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayer(layerId, adjustmentGroup, propertyName, value)
    }

    let backgroundColor = idx(adjustments, _ => _.fill.backgroundColor)

    return (
      <div>
        <div className="adjustment-group__header">
          <hr/>
          Fill
        </div>
        <TextInput
          key={layerId + adjustmentGroup + 'backgroundColor'}
          handleChange={this.handleChange}
          propertyName={'backgroundColor'}
          label='Fill Color'
          setLayerAdjustment={setLayerAdjustment}
          value={backgroundColor}/>
      </div>
    )
  }
}

FillAdjustment.propTypes = {
  layer : PropTypes.object
}

export default FillAdjustment