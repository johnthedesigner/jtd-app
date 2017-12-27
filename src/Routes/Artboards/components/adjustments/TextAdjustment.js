import React from "react";
import PropTypes from "prop-types";
import idx from "idx";
import _ from "lodash";

import ColorInput from "./ColorInput";
import SelectInput from "./SelectInput";
import ToggleInput from "./ToggleInput";

import { fontSizes, typeStyles } from "./adjustmentOptions";

class TypeAdjustment extends React.Component {
  render() {
    const adjustmentGroup = "text";
    const { adjustments, adjustLayers, projectColors } = this.props;

    if (!adjustments) return null;

    let align = idx(adjustments, _ => _.align);
    if (!align) align = "left";

    let fontColor = idx(adjustments, _ => _.color);
    if (!fontColor) fontColor = "";

    let fontFamily = idx(adjustments, _ => _.fontFamily);
    if (!fontFamily) fontFamily = "";

    let fontSize = idx(adjustments, _ => _.fontSize);
    if (!fontSize) fontSize = "";

    let fontWeight = idx(adjustments, _ => _.fontWeight);
    if (!fontWeight) fontWeight = "";

    let italic = idx(adjustments, _ => _.italic);
    if (!italic) italic = "";

    let underline = idx(adjustments, _ => _.underline);
    if (!underline) underline = "";

    const alignOptions = _.map(["left", "center", "right"], option => {
      return { name: option, value: option };
    });

    const fontFamilyOptions = _.map(typeStyles.families, style => {
      return { name: style.name, value: style.id };
    });

    const fontSizeOptions = _.map(fontSizes, size => {
      return { name: size, value: size };
    });

    const currentFamily = _.find(typeStyles.families, { id: fontFamily });
    const fontWeightOptions = _.map(currentFamily.weights, weight => {
      return { name: weight, value: weight };
    });

    const alignText = alignment => {
      adjustLayers("text", "align", alignment);
    };

    const setFontColor = color => {
      adjustLayers("text", "color", color);
    };

    const setFontFamily = value => {
      adjustLayers("text", "fontFamily", value);
    };

    const setFontSize = value => {
      adjustLayers("text", "fontSize", value);
    };

    const setFontWeight = value => {
      adjustLayers("text", "fontWeight", value);
    };

    const toggleItalics = () => {
      adjustLayers("text", "italic", !italic);
    };

    const toggleUnderline = () => {
      adjustLayers("text", "underline", !underline);
    };

    if (adjustments) {
      return (
        <div>
          <div className="adjustments-panel__header">Text</div>
          <div className="adjustments-panel__adjustment-block">
            <SelectInput
              key={adjustmentGroup + "fontFamily"}
              propertyName={"fontFamily"}
              options={fontFamilyOptions}
              setValue={setFontFamily}
              valueFromProps={fontFamily}
            />
            <SelectInput
              key={adjustmentGroup + "fontWeight"}
              propertyName={"fontWeight"}
              label="Weight"
              options={fontWeightOptions}
              setValue={setFontWeight}
              valueFromProps={fontWeight}
            />
            <SelectInput
              key={adjustmentGroup + "fontSize"}
              propertyName={"fontSize"}
              label="Size"
              options={fontSizeOptions}
              setValue={setFontSize}
              valueFromProps={fontSize}
            />
            <SelectInput
              key={adjustmentGroup + "align"}
              propertyName={"align"}
              label="Align"
              options={alignOptions}
              setValue={alignText}
              valueFromProps={align}
            />
            <ColorInput
              key={adjustmentGroup + "color"}
              projectColors={projectColors}
              propertyName={"color"}
              handleChange={setFontColor}
              valueFromProps={fontColor}
            />
            <ToggleInput
              propertyName={"italic"}
              handleChange={toggleItalics}
              valueFromProps={italic}
            />
            <ToggleInput
              propertyName={"underline"}
              handleChange={toggleUnderline}
              valueFromProps={underline}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

TypeAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
  projectColors: PropTypes.array.isRequired
};

export default TypeAdjustment;
