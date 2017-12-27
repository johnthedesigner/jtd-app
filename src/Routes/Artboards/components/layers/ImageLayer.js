import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import idx from "idx";

import imageLibrary from "./imageLibrary";

class ImageLayer extends React.Component {
  render() {
    let { dimensions, layer } = this.props;
    let rotateOriginX = dimensions.x + dimensions.width / 2;
    let rotateOriginY = dimensions.y + dimensions.height / 2;
    let selectedImage = imageLibrary[layer.imageId];

    let blendMode = idx(layer, _ => _.adjustments.blending.mode);
    let layerStyles = {
      mixBlendMode: blendMode ? blendMode : "normal"
    };

    let opacity = idx(layer, _ => _.adjustments.blending.opacity);

    return (
      <image
        key={`rect${layer.id}`}
        draggable={false}
        x={dimensions.x}
        y={dimensions.y}
        width={dimensions.width}
        height={dimensions.height}
        href={selectedImage.url}
        opacity={opacity}
        style={layerStyles}
        transform={`rotate(${dimensions.rotation} ${rotateOriginX} ${
          rotateOriginY
        })`}
      />
    );
  }
}

ImageLayer.propTypes = {
  layer: PropTypes.object.isRequired
};

export default ImageLayer;
