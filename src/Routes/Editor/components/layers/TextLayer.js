import React from 'react'
import PropTypes from 'prop-types'

class TextLayer extends React.Component {
  render() {

    const { layer, layerStyles } = this.props

    const { type } = layer.adjustments

    const textStyles = {
      ...layerStyles,
      color: type.color
    }

    return (
      <div className="layer__shape" style={textStyles}>
        {layer.text}
      </div>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer