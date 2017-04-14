import React from 'react'
import PropTypes from 'prop-types'

class ImageLayer extends React.Component {
  render() {

    const { layer } = this.props

    const shapeStyles = {
      width: layer.dimensions.width * layer.dimensions.scaleX + 'px',
      height: layer.dimensions.height * layer.dimensions.scaleY + 'px'
    }

    return (
      <img
        className="layer__shape"
        style={shapeStyles}
        src={layer.src}
        alt={layer.title}/>
    )
  }
}

ImageLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default ImageLayer