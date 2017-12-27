import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import _ from "lodash";

import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "hue",
  "saturation",
  "color",
  "luminosity"
];

class BlendAdjustment extends React.Component {
  render() {
    const { adjustments, adjustLayers } = this.props;

    if (!adjustments) return null;

    let blendMode = idx(adjustments, _ => _.mode);
    if (!blendMode) blendMode = "normal";

    let opacity = idx(adjustments, _ => _.opacity);
    if (!opacity) opacity = "1";

    const blendModeOptions = _.map(blendModes, mode => {
      return { name: mode, value: mode };
    });

    const setBlendMode = mode => {
      adjustLayers("blending", "mode", mode);
    };

    const setOpacity = value => {
      adjustLayers("blending", "opacity", 1 * value);
    };

    if (adjustments) {
      return (
        <div className="adjustments-panel__adjustment-block">
          <SelectInput
            propertyName={"mode"}
            options={blendModeOptions}
            setValue={setBlendMode}
            valueFromProps={blendMode}
          />
          <TextInput
            propertyName={"opacity"}
            setValue={setOpacity}
            valueFromProps={opacity}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

BlendAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired
};

export default BlendAdjustment;
