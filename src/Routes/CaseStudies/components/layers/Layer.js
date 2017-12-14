import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { layerTypes } from '../../../../caseStudies/constants'
import EllipseLayer from './EllipseLayer'
import ImageLayer from './ImageLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'

class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: null,
      y: null,
      width: null,
      height: null,
      rotation: null
    }
    this.setLayerDimensions = this.setLayerDimensions.bind(this)
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  setLayerDimensions(dimensions, tempDimensions) {
    let layerDimensions = {}
    if (tempDimensions !== undefined) {
      layerDimensions = tempDimensions
    } else {
      layerDimensions = dimensions
    }
    this.setState(layerDimensions)
  }

  componentWillMount() {
    let { dimensions, tempDimensions } = this.props.layer
    this.setLayerDimensions(dimensions, tempDimensions)
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, tempDimensions } = nextProps.layer
    this.setLayerDimensions(dimensions, tempDimensions)
  }

  toggleHighlighted() {
    return (this.props.layer.isHighlighted) ? ' is-highlighted' : ''
  }

  toggleSelected() {
    return (this.props.layer.isSelected) ? ' is-selected' : ''
  }

  render() {
    const layerType = (layer) => {
      switch (layer.type) {
        case layerTypes.ellipse:
          return ( <EllipseLayer
            dimensions={this.state}
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}/> )

        case layerTypes.image:
          return ( <ImageLayer
            layer={layer}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer
            dimensions={this.state}
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}/> )

        case layerTypes.text:
          return ( <TextLayer
            scaleLayer={this.props.scaleLayer}
            dimensions={this.state}
            layer={layer}
            scaleFactor={this.props.scaleFactor}
            scaleLayer={this.props.scaleLayer}/> )

        default:
          console.log('Unrecognized layer type: ',layer.type)
      }
    }

    let { layer } = this.props

    return (
      <g key={`g${layer.id}`}>
        {layerType(layer)}
      </g>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired
}

export default Layer
