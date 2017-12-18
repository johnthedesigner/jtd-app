import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class RectangleLayer extends React.Component {
  render() {
    let { dimensions } = this.props;
    let { fill, stroke } = this.props.layer.adjustments;
    let { angle, start, end } = fill.gradient;
    let rotateOriginX = dimensions.x + dimensions.width / 2;
    let rotateOriginY = dimensions.y + dimensions.height / 2;

    return (
      <rect
        key={`rect${this.props.layer.id}`}
        draggable={false}
        x={dimensions.x}
        y={dimensions.y}
        width={dimensions.width}
        height={dimensions.height}
        fill={
          fill.type === "color"
            ? fill.color
            : `url(#gradient${this.props.layer.id})`
        }
        stroke={stroke.color}
        strokeWidth={stroke.width}
        transform={`rotate(${dimensions.rotation} ${rotateOriginX} ${
          rotateOriginY
        })`}
      />
    );
  }
}

RectangleLayer.propTypes = {
  layer: PropTypes.object.isRequired
};

export default RectangleLayer;
