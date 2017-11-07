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
        style={{ opacity: isDragging ? 0.5 : 1 }}/>
    )
  }
}

ResizeHandle.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

export default DragSource('HANDLE', handleSource, collect)(ResizeHandle);
