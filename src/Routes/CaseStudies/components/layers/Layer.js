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
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  componentWillMount() {
    let { dimensions, tempDimensions } = this.props.layer
    let { scaleFactor, scaleAllDimensions } = this.props
    let layerDimensions = {}
    if (tempDimensions !== undefined) {
      console.log('use temp dimensions')
      layerDimensions = tempDimensions
    } else {
      console.log('use dimensions')
      layerDimensions = dimensions
    }
    let scaledDimensions = scaleAllDimensions(layerDimensions,scaleFactor,true)
    this.setState(scaledDimensions)
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, tempDimensions } = nextProps.layer
    if (tempDimensions !== undefined) {
      console.log('use temp dimensions')
      console.log(tempDimensions)
      this.setState(tempDimensions)
    } else {
      console.log('use dimensions')
      console.log(dimensions)
      this.setState(dimensions)
    }
  }

  toggleHighlighted() {
    return (this.props.layer.isHighlighted) ? ' is-highlighted' : ''
  }

  toggleSelected() {
    return (this.props.layer.isSelected) ? ' is-selected' : ''
  }

  render() {
    console.log('render layer')
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
            dimensions={this.state}
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

    let { layer } = this.props

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
