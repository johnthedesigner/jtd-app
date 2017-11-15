import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-rnd'
import _ from 'lodash'

import {
  scaleDimension,
  unscaleDimension,
  scaleAllDimensions
} from '../../artboardUtils'

class DragControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: null,
      y: null,
      width: null,
      height: null,
      rotation: null
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.setLayerAdjustment = this.setLayerAdjustment.bind(this)
    this.toggleHighlighted = this.toggleHighlighted.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  componentWillMount() {
    const { dimensions } = this.props.layer
    let { scaleFactor } = this.props
    let scaledDimensions = scaleAllDimensions(dimensions,scaleFactor,true)
    this.setState(scaledDimensions)
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions } = nextProps.layer
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
    const { scaleFactor } = this.props
    const { x, y, width, height, rotation } = this.state

    const draggableStyles = {
      transform: `rotate(${rotation}deg)`
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
          'layer__drag-control'
          + this.toggleSelected()
          + this.toggleHighlighted()
        }
        onClick={this.handleClick}>
        <Draggable
          className='layer__draggable-area'
          default={{
            x,
            y,
            width,
            height
          }}
          dragGrid={[
            scaleDimension(10,scaleFactor),
            scaleDimension(10,scaleFactor)
          ]}
          enableResizing={enableResize}
          height={height}
          onDrag={this.handleDrag}
          onDragStart={this.handleDragStart}
          ref={c => { this.draggable = c }}
          resizeGrid={[
            scaleDimension(10,scaleFactor),
            scaleDimension(10,scaleFactor)
          ]}
          style={draggableStyles}
          width={width}/>
      </div>
    )
  }
}

DragControl.propTypes = {
  adjustLayers: PropTypes.func.isRequired,
  dragLayers: PropTypes.func.isRequired,
  highlightLayer: PropTypes.func.isRequired,
  layer: PropTypes.object.isRequired,
  scaleFactor: PropTypes.number.isRequired,
  selectLayer: PropTypes.func.isRequired,
}

export default DragControl
