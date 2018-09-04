import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import Tooltip from '@material-ui/core/Tooltip';

import MaskedTextInput from "./MaskedTextInput";

class DimensionsAdjustment extends React.Component {
  render() {
    let adjustmentGroup = "dimensions";

    const { adjustments, bumpLayers, rotateLayer, scaleLayer } = this.props;

    let x = idx(adjustments, _ => _.x);
    if (x !== 0 && !x) x = "";

    let y = idx(adjustments, _ => _.y);
    if (y !== 0 && !y) y = "";

    let width = Math.round(idx(adjustments, _ => _.width));
    if (width !== 0 && !width) width = "";

    let height = Math.round(idx(adjustments, _ => _.height));
    if (height !== 0 && !height) height = "";

    let rotation = Math.round(idx(adjustments, _ => _.rotation));
    if (rotation !== 0 && !rotation) rotation = "";

    const setX = newX => {
      let distance = Math.floor(newX - x);
      bumpLayers("x", distance);
    };
    const setY = newY => {
      let distance = Math.floor(newY - y);
      bumpLayers("y", distance);
    };
    const setWidth = newWidth => {
      let distance = Math.floor(newWidth - width);
      scaleLayer([{ direction: "right", distance }], false);
    };
    const setHeight = newHeight => {
      let distance = Math.floor(newHeight - height);
      scaleLayer([{ direction: "bottom", distance }], false);
    };
    const setRotation = degrees => {
      rotateLayer(Math.floor(degrees));
    };
    if (adjustments) {
      return (
        <div>
          <div className="adjustments-panel__header">Dimensions</div>
          <div className="adjustments-panel__adjustment-block">
            <MaskedTextInput
              key={adjustmentGroup + "x"}
              propertyName={"x"}
              label="X"
              setValue={setX}
              suffix="px"
              tooltipText="X offset"
              type="number"
              valueFromProps={x}
            />
            <MaskedTextInput
              key={adjustmentGroup + "y"}
              propertyName={"y"}
              label="Y"
              setValue={setY}
              suffix="px"
              tooltipText="Y offset"
              type="number"
              valueFromProps={y}
            />
            <MaskedTextInput
              key={adjustmentGroup + "width"}
              propertyName={"width"}
              label="W"
              setValue={setWidth}
              suffix="px"
              tooltipText="Width"
              type="number"
              valueFromProps={width}
            />
            <MaskedTextInput
              key={adjustmentGroup + "height"}
              propertyName={"height"}
              label="H"
              setValue={setHeight}
              suffix="px"
              tooltipText="Height"
              type="number"
              valueFromProps={height}
            />
            <MaskedTextInput
              key={adjustmentGroup + "rotation"}
              propertyName={"rotation"}
              label="R"
              setValue={setRotation}
              suffix="deg"
              tooltipText="Rotation"
              type="number"
              valueFromProps={rotation}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

DimensionsAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired
};

export default DimensionsAdjustment;
