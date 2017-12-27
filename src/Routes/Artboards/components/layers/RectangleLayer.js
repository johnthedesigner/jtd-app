import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import idx from "idx";

class RectangleLayer extends React.Component {
  render() {
    let { dimensions, layer } = this.props;
    let { stroke } = this.props.layer.adjustments;
    let rotateOriginX = dimensions.x + dimensions.width / 2;
    let rotateOriginY = dimensions.y + dimensions.height / 2;

    let blendMode = idx(layer, _ => _.adjustments.blending.mode);
    let layerStyles = {
      mixBlendMode: blendMode ? blendMode : "normal"
    };

    return (
      <rect
        key={`rect${this.props.layer.id}`}
        draggable={false}
        x={dimensions.x}
        y={dimensions.y}
        width={dimensions.width}
        height={dimensions.height}
        fill={`url(#gradient${this.props.layer.id})`}
        stroke={stroke.color}
        strokeWidth={stroke.width}
        style={layerStyles}
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
