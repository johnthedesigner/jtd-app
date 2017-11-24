import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, DragSource, DropTarget } from 'react-dnd'

// import { scaleAllDimensions, unscaleDimension } from '../../artboardUtils'

class DragHandle extends React.Component {
  render() {
    const { connectDragSource, isDragging } = this.props
    const dragHandleStyles = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: isDragging ? 0 : 1,
    }
    return connectDragSource(
      <div
        className={`drag-handle`}
        onClick={(e) => {e.stopPropagation()}}
        style={dragHandleStyles}/>
    )
  }
}

const handleSource = {
  beginDrag(props, monitor, component) {
    return { directions: props.directions }
  }
}

const handleCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const DragHandleSource = DragSource(
  'DRAGGABLE',
  handleSource,
  handleCollect
)(DragHandle)

class DragControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
      },
      pointerOffset: {},
    }
  }

  componentDidMount() {
    this.setState({dimensions: this.props.layer.dimensions})
  }

  render() {
    const dragSourceStyles = {
      position: 'absolute',
      top: this.state.y,
      left: this.state.x,
      width: this.state.width,
      height: this.state.height,
      transform: `rotate(${this.state.rotation}deg)`
    }
    return(
      <DragHandleSource style={dragSourceStyles}/>
    )
  }
}

// Capture handle drag and drop activity
const dropTargetSpec = {
  drop(props, monitor, component) {
    // Prepare drag offset coordinates
    // let resizeDirectives = component.calculateLayerResize(
    //   monitor.getDifferenceFromInitialOffset(),
    //   monitor.getItem()
    // )
    // component.handleResize(delta)
  },
  hover(props, monitor, component) {
    let newPointerOffset = monitor.getDifferenceFromInitialOffset()
    if (
      newPointerOffset.x !== component.state.pointerOffset.x ||
      newPointerOffset.y !== component.state.pointerOffset.y
    ) {
      // Prepare drag offset coordinates
      // let resizeDirectives = component.calculateLayerResize(
      //   newPointerOffset,
      //   monitor.getItem()
      // )
      // Set latest pointer offset before dispatching drag event
      component.state.pointerOffset = newPointerOffset
      // component.dragLayers(delta)
    } else {
      component.state.pointerOffset = newPointerOffset
    }
  }
}

// Inject props from layer resize handle activity
function dropTargetCollect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

DragControl.propTypes = {
  layer: PropTypes.object.isRequired,
  scaleFactor: PropTypes.number.isRequired,
}

export default DragDropContext(HTML5Backend)(DropTarget('DRAGGABLE', dropTargetSpec, dropTargetCollect)(DragControl))
