import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

import { scaleAllDimensions } from "../../artboardUtils";

const handleSource = {
  beginDrag(props, monitor, component) {
    props.selectLayer(props.layer.id);
    return {
      layerId: props.layer.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DragHandle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        rotation: 0
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    const { layer, scaleFactor } = this.props;
    this.setState({
      dimensions: scaleAllDimensions(layer.dimensions, scaleFactor, true)
    });
  }

  componentWillReceiveProps(nextProps) {
    const { layer, scaleFactor } = nextProps;
    this.setState({
      dimensions: scaleAllDimensions(layer.dimensions, scaleFactor, true)
    });
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.selectLayer(this.props.layer.id, e.shiftKey);
  }

  handleDoubleClick(e) {
    e.stopPropagation();
    if (this.props.layer.type === "text") {
      this.props.enableTextEditor(this.props.layer.id);
    }
  }

  render() {
    const { connectDragSource, isDragging, layer } = this.props;
    const { x, y, width, height, rotation } = this.state.dimensions;

    const dragHandleStyles = {
      position: "absolute",
      top: y ? y : 0,
      left: x ? x : 0,
      width: width ? width : 0,
      height: height ? height : 0,
      transform: `rotate(${rotation}deg)`,
      opacity: isDragging ? 0 : 1
    };

    return connectDragSource(
      <div
        className={`drag-handle ${layer.isSelected ? "is-selected" : ""}`}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        onDrag={this.handleDrag}
        style={dragHandleStyles}
      />
    );
  }
}

DragHandle.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource("DRAGGABLE", handleSource, collect)(DragHandle);
