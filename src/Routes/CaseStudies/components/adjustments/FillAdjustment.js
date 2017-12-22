import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import _ from "lodash";

import ColorInput from "./ColorInput";
import GradientInput from "./GradientInput";
import SelectInput from "./SelectInput";
import { fillTypes } from "./adjustmentOptions";
import { colorsWithFallback } from "../../colorUtils";

class FillAdjustment extends React.Component {
  render() {
    const { adjustments, adjustLayers, projectColors } = this.props;

    const setGradientFill = gradient => {
      adjustLayers("fill", "gradient", gradient);
    };

    const setSolidFill = solid => {
      adjustLayers("fill", "color", solid);
    };

    const setFillType = value => {
      adjustLayers("fill", "type", value);
    };

    const fillTypeOptions = _.map(fillTypes, option => {
      return { name: option.name, value: option.type };
    });

    if (adjustments) {
      let type = idx(adjustments, _ => _.type);

      // Get solid color and gradient to use for each other's fallback
      let backgroundColor = idx(adjustments, _ => _.color);
      let linearGradient = idx(adjustments, _ => _.gradient);
      let fillColors = colorsWithFallback(backgroundColor, linearGradient);

      return (
        <div className="adjustments-panel__adjustment-block">
          <SelectInput
            options={fillTypeOptions}
            propertyName={"type"}
            setValue={setFillType}
            valueFromProps={type}
          />
          {type === "color" && (
            <ColorInput
              handleChange={setSolidFill}
              projectColors={projectColors}
              propertyName={"color"}
              valueFromProps={fillColors.solid}
            />
          )}
          {type === "gradient" && (
            <GradientInput
              handleChange={setGradientFill}
              projectColors={projectColors}
              propertyName={"gradient"}
              valueFromProps={fillColors.gradient}
            />
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

FillAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
  projectColors: PropTypes.array.isRequired
};

export default FillAdjustment;
