import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'
import _ from 'lodash'

import ColorInput from './ColorInput'
import SelectInput from './SelectInput'
import TextInput from './TextInput'

import { fontSizes, typeStyles } from './adjustmentOptions'

class TypeAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'text'

    const { adjustments, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, value)
    }

    let fontFamily = idx(adjustments, _ => _.fontFamily)
    if (!fontFamily) fontFamily = ''
    const fontFamilyOptions = _.map(typeStyles.families, (style) => {
      return { name: style.name, value: style.id }
    })
    const setFontFamily = (value) => {
      setLayerAdjustment('fontFamily', value)
    }

    let fontSize = idx(adjustments, _ => _.fontSize)
    if (!fontSize) fontSize = ''
    const fontSizeOptions = _.map(fontSizes, (size) => {
      return { name: size, value: size }
    })
    const setFontSize = (value) => {
      setLayerAdjustment('fontSize', value)
    }

    let color = idx(adjustments, _ => _.textColor)
    if (!color) color = ''

    if (adjustments) {
      return(
        <div className='adjustments-panel__adjustment-block'>
          <SelectInput
            key={adjustmentGroup + 'fontFamily'}
            propertyName={'fontFamily'}
            options={fontFamilyOptions}
            setValue={setFontFamily}
            valueFromProps={fontFamily}/>
          <SelectInput
            key={adjustmentGroup + 'fontSize'}
            propertyName={'fontSize'}
            label='Size'
            options={fontSizeOptions}
            setValue={setFontSize}
            valueFromProps={fontSize}/>
          <ColorInput
            key={adjustmentGroup + 'color'}
            propertyName={'color'}
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={color}/>
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
