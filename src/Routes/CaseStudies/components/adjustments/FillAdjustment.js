import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import ColorInput from './ColorInput'

class FillAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'fill'

    const { adjustments, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, value)
    }

    let backgroundColor = idx(adjustments, _ => _.color)
    if (!backgroundColor) backgroundColor = ''

    if (adjustments) {
      return(
        <div>
          <div className="adjustment-group__header">
            Fill
          </div>
          <ColorInput
            key={adjustmentGroup + 'backgroundColor'}
            propertyName={'backgroundColor'}
            label='Color'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={backgroundColor}/>
        </div>
      )
    } else {
      return null
    }
  }
}

FillAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
}

export default FillAdjustment
