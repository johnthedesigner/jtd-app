import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import _ from "lodash";

import SelectInput from "./SelectInput";
import MaskedTextInput from "./MaskedTextInput";

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
    blendMode = (!blendMode) ? blendModes[0] : blendMode;

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
        <div>
          <div className="adjustments-panel__header">Blend &amp; Opacity</div>
          <div className="adjustments-panel__adjustment-block">
            <label style={{ fontSize: 12 }}>Blending mode</label>
            <SelectInput
              propertyName={"mode"}
              options={blendModeOptions}
              setValue={setBlendMode}
              tooltipText="Blending mode"
              valueFromProps={blendMode}
            />
            <MaskedTextInput
              propertyName={"opacity"}
              setValue={setOpacity}
              tooltipText="Opacity"
              valueFromProps={opacity}
            />
          </div>
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
