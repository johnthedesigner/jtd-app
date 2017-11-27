import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'
import _ from 'lodash'

import ColorInput from './ColorInput'
import SelectInput from './SelectInput'
import TextInput from './TextInput'

import { fontSizes } from './typeStyles'

class TypeAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'text'

    const { adjustments, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, value)
    }

    const setFontSize = (value) => {
      setLayerAdjustment('fontSize', value)
    }
    const fontSizeOptions = _.map(fontSizes, (size) => {
      return { name: size, value: size }
    })

    let color = idx(adjustments, _ => _.textColor)
    if (!color) color = ''
    let fontSize = idx(adjustments, _ => _.fontSize)
    if (!fontSize) fontSize = ''

    if (adjustments) {
      return(
        <div>
          <ColorInput
            key={adjustmentGroup + 'color'}
            propertyName={'color'}
            label='Text Color'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={color}/>
          <SelectInput
            key={adjustmentGroup + 'fontSize'}
            propertyName={'fontSize'}
            label='Size'
            options={fontSizeOptions}
            setValue={setFontSize}
            valueFromProps={fontSize}/>
        </div>
      )
    } else {
      return null
    }
  }
}

TypeAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
}

export default TypeAdjustment
