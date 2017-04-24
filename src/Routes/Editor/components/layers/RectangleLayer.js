import React from 'react'
import PropTypes from 'prop-types'

class RectangleLayer extends React.Component {
  render() {

    const { layer } = this.props

    const { dimensions, fill } = layer.adjustments

    const shapeStyles = {
      width: dimensions.width * dimensions.scaleX + 'px',
      height: dimensions.height * dimensions.scaleY + 'px',
      backgroundColor: fill.backgroundColor
    }

    return (
      <div className="layer__shape" style={shapeStyles}></div>
    )
  }
}

RectangleLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default RectangleLayer