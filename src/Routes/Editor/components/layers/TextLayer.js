import React from 'react'
import PropTypes from 'prop-types'

class TextLayer extends React.Component {
  render() {

    const { layer, layerScaleStyles } = this.props

    const { type } = layer.adjustments

    const textStyles = {
      ...layerScaleStyles,
      color: type.color,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    }

    return (
      <span style={textStyles}>{layer.text}</span>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer