import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

const handleSource = {
  beginDrag(props, monitor, component) {
    return {
      directions: props.directions
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class ResizeHandle extends React.Component {
  render() {
    const { connectDragSource, isDragging, className } = this.props
    return connectDragSource(
      <div
        className={`resize-handle ${className}`}
        onClick={(e) => {console.log('clicked resize-handle')}}
        style={{ opacity: isDragging ? 0 : 1 }}/>
    )
  }
}

ResizeHandle.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

export default DragSource('RESIZEABLE', handleSource, collect)(ResizeHandle);
