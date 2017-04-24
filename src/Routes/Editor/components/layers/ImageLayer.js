import React from 'react'
import PropTypes from 'prop-types'

class ImageLayer extends React.Component {
  render() {

    const { layer } = this.props

    const { dimensions, image } = layer.adjustments

    const shapeStyles = {
      width: dimensions.width * dimensions.scaleX + 'px',
      height: dimensions.height * dimensions.scaleY + 'px'
    }

    return (
      <img
        className="layer__shape"
        style={shapeStyles}
        src={image.src}
        alt={layer.title}/>
    )
  }
}

ImageLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default ImageLayer