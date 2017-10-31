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
      rotation: null,
      scaleX: null,
      scaleY: null
    }
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  componentWillMount() {
    const { dimensions } = this.props.layer
    let { scaleFactor, scaleAllDimensions } = this.props
    let scaledDimensions = scaleAllDimensions(dimensions,scaleFactor,true)
    this.setState(scaledDimensions)
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions } = nextProps.layer
    let { scaleFactor, scaleAllDimensions } = nextProps
    let scaledDimensions = scaleAllDimensions(dimensions,scaleFactor,true)
    this.setState(scaledDimensions)
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
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}/> )

        case layerTypes.image:
          return ( <ImageLayer
            layer={layer}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}/> )

        case layerTypes.text:
          return ( <TextLayer
            dimensions={this.state}
            editingLayer={this.state.editingLayer}
            layer={layer}
            scaleDimension={this.props.scaleDimension}
            setLayerAdjustment={this.setLayerAdjustment}
            unscaleDimension={this.props.unscaleDimension}
            updateText={this.props.updateText}/> )

        default:
          console.log('Unrecognized layer type: ',layer.type)
      }
    }

    const { layer } = this.props

    return (
      <g>
        {layerType(layer)}
      </g>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired
}

export default Layer