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
        <div className="adjustments-panel__header">Dimensions</div>
        <DimensionsAdjustment
          adjustLayers={adjustLayers}
          bumpLayers={bumpLayers}
          rotateLayer={rotateLayer}
          scaleLayer={scaleLayer}
          adjustments={dimensions}
        />
        <div className="adjustments-panel__header">Fill</div>
        <FillAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.fill)}
          projectColors={projectColors}
        />
        <div className="adjustments-panel__header">Stroke</div>
        <StrokeAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.stroke)}
          projectColors={projectColors}
        />
        <div className="adjustments-panel__header">Type</div>
        <TextAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.text)}
          projectColors={projectColors}
        />
        <div className="adjustments-panel__header">Blend &amp; Opacity</div>
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
