import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-rnd'
import _ from 'lodash'

import { layerTypes } from '../../../../caseStudies/constants'
import EllipseLayer from './EllipseLayer'
import ImageLayer from './ImageLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'
import {
  scaleDimension,
  unscaleDimension,
  scaleAllDimensions
} from '../../artboardUtils'

class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: '',
      y: '',
      width: '',
      height: '',
      editingLayer: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.setLayerAdjustment = this.setLayerAdjustment.bind(this)
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  componentWillMount() {
    const { dimensions } = this.props.layer.adjustments
    let { scaleFactor } = this.props
    let scaledDimensions = scaleAllDimensions(dimensions,scaleFactor,true)
    this.setState(scaledDimensions)
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions } = nextProps.layer.adjustments
    let { scaleFactor } = nextProps
    let scaledDimensions = scaleAllDimensions(dimensions,scaleFactor,true)
    this.setState(scaledDimensions)
    this.draggable.updatePosition(scaledDimensions)
    this.draggable.updateSize(scaledDimensions)
  }

  handleClick (e) {
    e.stopPropagation()
  }

  handleDrag(e, data) {
    let { scaleFactor } = this.props
    this.props.dragLayers(
      this.props.layer.id,
      unscaleDimension(data.x,scaleFactor),
      unscaleDimension(data.y,scaleFactor)
    )
  }

  handleDragStart(e, data) {
    e.stopPropagation()
    let { layer } = this.props
    this.props.selectLayer(layer.id, e.shiftKey)
  }

  setLayerAdjustment(value) {
    this.props.adjustLayers('type', 'text', value)
  }

  toggleHighlighted() {
    return (this.props.layer.isHighlighted) ? ' is-highlighted' : ''
  }

  toggleSelected() {
    return (this.props.layer.isSelected) ? ' is-selected' : ''
  }

  render() {
    const layerType = (layer, layerScaleStyles) => {
      switch (layer.type) {
        case layerTypes.ellipse:
          return ( <EllipseLayer
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.image:
          return ( <ImageLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer
            key={layer.adjustments.fill.backgroundColor}
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.text:
          return ( <TextLayer
            editingLayer={this.state.editingLayer}
            setLayerAdjustment={this.setLayerAdjustment}
            layer={layer}
            layerScaleStyles={layerScaleStyles}
            updateText={this.props.updateText}/> )

        default:
          console.log('Unrecognized layer type: ',layer.type)
      }
    }

    const {
      layer,
      highlightLayer,
      scaleFactor,
    } = this.props

    const layerScaleStyles = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
      userSelect: 'none',
    }

    const enableResize = {
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
    }

    return (
      <div
        className={
          'layer__wrapper'
          + this.toggleSelected()
          + this.toggleHighlighted()
        }
        onMouseEnter={() => {
          highlightLayer(layer.id)
        }}
        onMouseLeave={() => {
          highlightLayer(null)
        }}
        onClick={this.handleClick}>
        <Draggable
          className='layer__draggable-area'
          default={{
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height
          }}
          dragGrid={[
            scaleDimension(10,scaleFactor),
            scaleDimension(10,scaleFactor)
          ]}
          enableResizing={enableResize}
          height={this.state.height}
          onDrag={this.handleDrag}
          onDragStart={this.handleDragStart}
          ref={c => { this.draggable = c }}
          resizeGrid={[
            scaleDimension(10,scaleFactor),
            scaleDimension(10,scaleFactor)
          ]}
          style={{
            transform: 'none'
          }}
          width={this.state.width}>
          <div className={'layer__shape layer__shape--' + layer.type}>
            {layerType(layer, layerScaleStyles)}
          </div>
        </Draggable>
      </div>
    )
  }
}

Layer.propTypes = {
  adjustLayers: PropTypes.func.isRequired,
  dragLayers: PropTypes.func.isRequired,
  highlightLayer: PropTypes.func.isRequired,
  layer: PropTypes.object.isRequired,
  scaleFactor: PropTypes.number.isRequired,
  selectLayer: PropTypes.func.isRequired,
}

export default Layer