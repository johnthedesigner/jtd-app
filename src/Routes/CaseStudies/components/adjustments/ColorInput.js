import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import ColorPicker from "./ColorPicker";

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
    this.togglePicker = this.togglePicker.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

  togglePicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  updateColor(color) {
    this.togglePicker();
    this.props.setLayerAdjustment(this.props.propertyName, color);
  }

  render() {
    const { projectColors, propertyName, label } = this.props;

    const thumbnailStyles = {
      background: this.props.valueFromProps,
      position: "relative"
    };

    let colors = ["#2F80ED", "#BB6BD9", "#FF8DC0", "#FFB26E"];

    return (
      <div>
        <label htmlFor={`color-adjustment__${propertyName}`}>{label}</label>
        <div
          className={`color-adjustment__thumbnail color-adjustment__thumbnail--${
            propertyName
          }`}
          onClick={this.togglePicker}
          ref={el => {
            this.target = el;
          }}
          style={thumbnailStyles}
        />
        <ColorPicker
          colors={colors}
          updateColor={this.updateColor}
          show={this.state.showPicker}
        />
      </div>
    );
  }
}

ColorInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default ColorInput;
