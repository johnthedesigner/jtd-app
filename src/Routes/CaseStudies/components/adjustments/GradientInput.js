import React from "react";
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
    this.props.handleChange(gradientParams);
  }

  updateGradientAngle(angle) {
    let fillUpdate = {
      color: undefined,
      gradient: {
        ...this.props.valueFromProps,
        ...{ angle }
      }
    };
    this.props.handleChange(fillUpdate);
  }

  render() {
    const { projectColors } = this.props;
    let { angle, start, end } = this.props.valueFromProps;

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

    return (
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
          colors={projectColors}
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
    );
  }
}

GradientInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  projectColors: PropTypes.array.isRequired,
  valueFromProps: PropTypes.object.isRequired
};

export default GradientInput;
