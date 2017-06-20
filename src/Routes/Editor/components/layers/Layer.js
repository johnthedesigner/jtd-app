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
      editingLayer: false,
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
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

  handleDoubleClick(e) {
    console.log('double click')
    e.stopPropagation()
    this.setState({
      editingLayer: true,
    })
  }

  handleDrag(e, data) {
    this.props.dragLayers(this.props.layer.id, data.x, data.y)
  }

  handleDragStart(e, data) {
    this.props.selectLayer(this.props.layer.id, e.shiftKey)
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
            editingLayer={this.state.editingLayer}
            setLayerAdjustment={this.setLayerAdjustment}
            layer={layer}
            layerScaleStyles={layerScaleStyles}
            updateText={this.props.updateText}/> )

        default:
          console.log('Unrecognized layer type')
      }
    }

    const {
      artboardColor,
      layer,
      highlightLayer,
    } = this.props

    const layerScaleStyles = {
      width: this.state.width
        * idx(layer, _ => _.adjustments.dimensions.scaleX) + 'px',
      height: this.state.height
        * idx(layer, _ => _.adjustments.dimensions.scaleY) + 'px',
      userSelect: 'none',
    }

    const highlightStyles = {
      ...layerScaleStyles,
      borderColor: artboardColor,
      boxShadow: '0 0 0 4px ' + Color(artboardColor).fade(0.7)
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
          + this.toggleHidden()
        }
        onDoubleClick={this.handleDoubleClick}
        onMouseEnter={() => {
          highlightLayer(layer.id)
        }}
        onMouseLeave={() => {
          highlightLayer(null)
        }}>
        <Draggable
          className='layer__draggable-area'
          default={{
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height
          }}
          dragGrid={[10,10]}
          enableResizing={enableResize}
          height={this.state.height}
          onDrag={this.handleDrag}
          onDragStart={this.handleDragStart}
          ref={c => { this.draggable = c }}
          resizeGrid={[10,10]}
          style={{
            transform: 'none'
          }}
          width={this.state.width}>
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