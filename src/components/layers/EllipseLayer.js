import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import idx from "idx";

class EllipseLayer extends React.Component {
  render() {
    let { dimensions, layer } = this.props;
    let { stroke } = layer.adjustments;
    let rotateOriginX = dimensions.x + dimensions.width / 2;
    let rotateOriginY = dimensions.y + dimensions.height / 2;

    let opacity = idx(layer, _ => _.adjustments.blending.opacity);
    let blendMode = idx(layer, _ => _.adjustments.blending.mode);
    let layerStyles = {
      mixBlendMode: blendMode ? blendMode : "normal"
    };

    return (
      <ellipse
        draggable={false}
        cx={dimensions.x + dimensions.width / 2}
        cy={dimensions.y + dimensions.height / 2}
        rx={dimensions.width / 2}
        ry={dimensions.height / 2}
        fill={`url(#gradient${layer.id})`}
        opacity={opacity}
        stroke={stroke.color ? stroke.color : "rgba(32,32,32)"}
        strokeWidth={stroke.width}
        style={layerStyles}
        transform={`rotate(${dimensions.rotation} ${rotateOriginX} ${
          rotateOriginY
        })`}
      />
    );
  }
}

EllipseLayer.propTypes = {
  dimensions: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired
};

export default EllipseLayer;
