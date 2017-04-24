import React from 'react'
import PropTypes from 'prop-types'

class TextLayer extends React.Component {
  render() {

    const { layer } = this.props

    const { dimensions, type } = layer.adjustments

    const shapeStyles = {
      width: dimensions.width * dimensions.scaleX + 'px',
      height: dimensions.height * dimensions.scaleY + 'px',
      color: type.color
    }

    return (
      <span className="layer__shape" style={shapeStyles}>
        {layer.text}
      </span>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer