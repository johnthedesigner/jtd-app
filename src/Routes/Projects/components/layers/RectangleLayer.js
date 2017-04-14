import React from 'react'
import PropTypes from 'prop-types'

class RectangleLayer extends React.Component {
  render() {

    const { layer } = this.props

    const shapeStyles = {
      width: layer.dimensions.width * layer.dimensions.scaleX + 'px',
      height: layer.dimensions.height * layer.dimensions.scaleY + 'px',
      backgroundColor: layer.backgroundColor
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