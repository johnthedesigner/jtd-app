import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class EllipseLayer extends React.Component {
  render() {
    let { dimensions } = this.props;
    let { stroke } = this.props.layer.adjustments;
    let rotateOriginX = dimensions.x + dimensions.width / 2;
    let rotateOriginY = dimensions.y + dimensions.height / 2;

    return (
      <ellipse
        draggable={false}
        cx={dimensions.x + dimensions.width / 2}
        cy={dimensions.y + dimensions.height / 2}
        rx={dimensions.width / 2}
        ry={dimensions.height / 2}
        fill={`url(#gradient${this.props.layer.id})`}
        stroke={stroke.color ? stroke.color : "rgba(32,32,32)"}
        strokeWidth={stroke.width}
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
