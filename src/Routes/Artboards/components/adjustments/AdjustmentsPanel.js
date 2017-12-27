import React from "react";
import PropTypes from "prop-types";
import idx from "idx";

import BlendAdjustment from "./BlendAdjustment";
import DimensionsAdjustment from "./DimensionsAdjustment";
import FillAdjustment from "./FillAdjustment";
import StrokeAdjustment from "./StrokeAdjustment";
import TextAdjustment from "./TextAdjustment";

class AdjustmentsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const {
      adjustLayers,
      adjustments,
      bumpLayers,
      projectColors,
      dimensions,
      rotateLayer,
      scaleLayer
    } = this.props;

    // Only show adjustments panel if anything is selected
    let activeClass = dimensions.x !== null ? "active" : "";

    return (
      <div
        className={`adjustments-panel__wrapper ${activeClass}`}
        onClick={this.handleClick}
      >
        <DimensionsAdjustment
          adjustLayers={adjustLayers}
          bumpLayers={bumpLayers}
          rotateLayer={rotateLayer}
          scaleLayer={scaleLayer}
          adjustments={dimensions}
        />
        <FillAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.fill)}
          projectColors={projectColors}
        />
        <StrokeAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.stroke)}
          projectColors={projectColors}
        />
        <TextAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.text)}
          projectColors={projectColors}
        />
        <BlendAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.blending)}
        />
      </div>
    );
  }
}

AdjustmentsPanel.propTypes = {
  adjustments: PropTypes.object,
  projectColors: PropTypes.array.isRequired
};

export default AdjustmentsPanel;
