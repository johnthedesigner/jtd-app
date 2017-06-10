import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import idx from 'idx'
import Draggable from 'react-rnd'
import _ from 'lodash'

import { layerTypes } from '../../../../store/entities/Layers'
import ImageLayer from './ImageLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'

class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: '',
      y: '',
      width: '',
      height: '',
    }
    this.handleDrag = this.handleDrag.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
    this.setLayerAdjustment = this.setLayerAdjustment.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  componentWillMount() {
    const { dimensions } = this.props.layer.adjustments
    this.setState({
      x: dimensions.x,
      y: dimensions.y,
      width: dimensions.width,
      height: dimensions.height,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.layer.adjustments.dimensions.x,
      y: nextProps.layer.adjustments.dimensions.y,
      width: nextProps.layer.adjustments.dimensions.width,
      height: nextProps.layer.adjustments.dimensions.height,
    })
    this.draggable.updatePosition(nextProps.layer.adjustments.dimensions)
    this.draggable.updateSize(nextProps.layer.adjustments.dimensions)
  }

  handleDrag(e, data) {
    this.props.dragLayers([this.props.layer.id], data.x, data.y)
  }

  handleResize(e, direction, ref, delta) {
    let xOffset = ( _.startsWith(direction, 'top'))
      ? delta.height * -1 : delta.height
    let yOffset = ( _.startsWith(direction, 'left'))
      ? delta.width * -1 : delta.width
    this.setState({
      x: this.state.x + xOffset,
      y: this.state.y + yOffset,
      width: this.props.layer.adjustments.dimensions.width + delta.width,
      height: this.props.layer.adjustments.dimensions.height + delta.height,
    })
  }

  handleResizeStop(e, direction, ref, delta) {
    let lowerDirection = _.toLower(direction)
    let yOffset = ( _.includes(lowerDirection, 'top'))
      ? delta.height * -1 : 0
    let xOffset = ( _.includes(lowerDirection, 'left'))
      ? delta.width * -1 : 0
    let { x, y } = this.props.layer.adjustments.dimensions
    this.props.resizeLayers([this.props.layer.id], delta)
    this.props.dragLayers(
      [this.props.layer.id],
      (x + xOffset),
      (y + yOffset)
    )
  }

  setLayerAdjustment(value) {
    this.props.adjustLayers([this.props.layer.id], 'type', 'text', value)
  }

  toggleHidden() {
    return (this.props.layer.hide) ? ' is-hidden' : ''
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
        case layerTypes.image:
          return ( <ImageLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.text:
          return ( <TextLayer
            setLayerAdjustment={this.setLayerAdjustment}
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        default:
          console.log('Unrecognized layer type')
      }
    }

    const {
      artboardColor,
      layer,
      highlightLayer,
      selectLayer,
    } = this.props

    const layerScaleStyles = {
      width: this.state.width
        * idx(layer, _ => _.adjustments.dimensions.scaleX) + 'px',
      height: this.state.height
        * idx(layer, _ => _.adjustments.dimensions.scaleY) + 'px',
    }

    const layerShapeStyles = {
      ...layerScaleStyles,
      marginLeft: idx(layer, _ => _.adjustments.dimensions.x) + 'px',
      marginTop: idx(layer, _ => _.adjustments.dimensions.y) + 'px',
      transform: 'rotate(' + idx(layer, _ => _.adjustments.dimensions.rotation)
        + 'deg)',
      userSelect: 'none'
    }
    const highlightStyles = {
      ...layerShapeStyles,
      borderColor: artboardColor,
      boxShadow: '0 0 0 4px ' + Color(artboardColor).fade(0.7)
    }

    return (
      <div
        className={
          'layer__wrapper'
          + this.toggleSelected()
          + this.toggleHighlighted()
          + this.toggleHidden()
        }
        onClick={(e) => {
          e.stopPropagation()
          selectLayer(layer.id, e.shiftKey)
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          highlightLayer(layer.id)
          selectLayer(layer.id)
        }}
        onMouseEnter={() => {
          highlightLayer(layer.id)
        }}
        onMouseLeave={() => {
          highlightLayer(null)
        }}>
        <Draggable
          ref={c => { this.draggable = c }}
          default={{
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height
          }}
          resizeGrid={[10, 10]}
          x={this.state.x}
          y={this.state.y}
          width={this.state.width}
          height={this.state.height}
          onDrag={this.handleDrag}
          onDragStop={this.handleDrag}
          onResize={this.handleResize}
          onResizeStop={this.handleResizeStop}
          style={{
            transform: 'none'
          }}>
          <div className={'layer__shape layer__shape--' + layer.type}>
            {layerType(layer, layerScaleStyles)}
          </div>
          <div className='layer__highlight-indicator' style={highlightStyles}></div>
        </Draggable>
      </div>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
}

export default Layer