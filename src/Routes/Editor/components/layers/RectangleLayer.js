import React from 'react'
import PropTypes from 'prop-types'

class RectangleLayer extends React.Component {
  render() {

    const { layer, layerStyles } = this.props

    const { fill } = layer.adjustments

    const rectangleStyles = {
      ...layerStyles,
      backgroundColor: fill.backgroundColor
    }

    return (
      <div className='layer__shape' style={rectangleStyles}></div>
    )
  }
}

RectangleLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default RectangleLayer