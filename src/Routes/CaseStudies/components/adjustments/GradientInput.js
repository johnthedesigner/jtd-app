import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import ColorPicker from "./ColorPicker";
import TextInput from "./TextInput";

class GradientInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      gradientSide: null
    };
    this.hidePicker = this.hidePicker.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.updateGradient = this.updateGradient.bind(this);
    this.updateGradientAngle = this.updateGradientAngle.bind(this);
  }

  hidePicker(gradientSide) {
    this.setState({ gradientSide, showPicker: false });
  }

  showPicker(gradientSide) {
    this.setState({ gradientSide, showPicker: true });
  }

  updateGradient(update) {
    let newColor = {};
    newColor[this.state.gradientSide] = update;
    let gradientParams = {
      ...this.props.valueFromProps,
      ...newColor
    };
    this.hidePicker();
    this.props.setLayerAdjustment(this.props.propertyName, gradientParams);
  }

  updateGradientAngle(angle) {
    let gradientParams = {
      ...this.props.valueFromProps,
      ...{ angle }
    };
    this.props.setLayerAdjustment(this.props.propertyName, gradientParams);
  }

  render() {
    const { projectColors, propertyName, label } = this.props;
    const { start, end, angle } = this.props.valueFromProps;

    const startThumbnailStyles = {
      background: start,
      position: "relative"
    };

    const endThumbnailStyles = {
      background: end,
      position: "relative"
    };

    const gradientThumbPreviewStyles = {
      background: `linear-gradient('${angle}, ${start}, ${end}')`
    };

    let colors = ["#2F80ED", "#BB6BD9", "#FF8DC0", "#FFB26E"];

    return (
      <div>
        <label htmlFor={`gradient-adjustment__${propertyName}`}>{label}</label>
        <div className="gradient-adjustment__gradient-thumbnail">
          <div
            className={"gradient-adjustment__gradient-start-thumbnail"}
            onClick={() => this.showPicker("start")}
            style={startThumbnailStyles}
          />
          <div
            className="gradient-adjustment__gradient-thumbnail-preview"
            style={gradientThumbPreviewStyles}
          />
          <div
            className={"gradient-adjustment__gradient-end-thumbnail"}
            onClick={() => this.showPicker("end")}
            style={endThumbnailStyles}
          />
          <ColorPicker
            colors={colors}
            updateColor={this.updateGradient}
            show={this.state.showPicker}
          />
          <TextInput
            propertyName={"angle"}
            label="Angle"
            setValue={this.updateGradientAngle}
            suffix="px"
            type="text"
            valueFromProps={angle}
          />
        </div>
      </div>
    );
  }
}

GradientInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default GradientInput;
