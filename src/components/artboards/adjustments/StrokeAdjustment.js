import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import _ from "lodash";

import ColorInput from "./ColorInput";
import MaskedTextInput from "./MaskedTextInput";

class StrokeAdjustment extends React.Component {
  render() {
    let adjustmentGroup = "stroke";

    const { adjustments, adjustLayers, projectColors } = this.props;

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, value);
    };

    const setStrokeWidth = value => setLayerAdjustment("width", value);
    let strokeWidth = idx(adjustments, _ => _.width);
    if (!strokeWidth) strokeWidth = "";

    const setStrokeColor = value => setLayerAdjustment("color", value);
    let strokeColor = idx(adjustments, _ => _.color);
    if (!strokeColor) strokeColor = "";

    if (adjustments) {
      return (
        <div>
          <div className="adjustments-panel__header">Stroke</div>
          <div className="adjustments-panel__adjustment-block">
            <MaskedTextInput
              propertyName={"width"}
              label="Width"
              setValue={setStrokeWidth}
              suffix="px"
              tooltipText="Stroke width"
              type="text"
              valueFromProps={strokeWidth}
            />
            <ColorInput
              projectColors={projectColors}
              propertyName={"color"}
              handleChange={setStrokeColor}
              tooltipText="Stroke color"
              valueFromProps={strokeColor}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

StrokeAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired
};

export default StrokeAdjustment;
