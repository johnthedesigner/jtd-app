import React from 'react'
import PropTypes from 'prop-types'

class TextLayer extends React.Component {
  render() {

    const { layer } = this.props

    const shapeStyles = {
      width: layer.dimensions.width * layer.dimensions.scaleX + 'px',
      height: layer.dimensions.height * layer.dimensions.scaleY + 'px'
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