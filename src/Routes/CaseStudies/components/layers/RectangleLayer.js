import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class RectangleLayer extends React.Component {
  render() {
    let { dimensions } = this.props
    let { fill } = this.props.layer.adjustments
    let rotateOriginX = dimensions.x + dimensions.width / 2
    let rotateOriginY = dimensions.y + dimensions.height / 2
    return (
      <rect
        ref={r => {this.rect = r}}
        x={dimensions.x}
        y={dimensions.y}
        width={dimensions.width}
        height={dimensions.height}
        fill={fill.color}
        transform={
          `rotate(${dimensions.rotation} ${rotateOriginX} ${rotateOriginY})`
        }/>
    )
  }
}

RectangleLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default RectangleLayer