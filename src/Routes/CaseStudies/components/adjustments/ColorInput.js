import React from "react";
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
    this.props.handleChange(color);
  }

  render() {
    const { projectColors, propertyName, valueFromProps } = this.props;

    const thumbnailStyles = {
      background: valueFromProps,
      position: "relative"
    };

    return (
      <div>
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
          colors={projectColors}
          updateColor={this.updateColor}
          show={this.state.showPicker}
        />
      </div>
    );
  }
}

ColorInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  projectColors: PropTypes.array.isRequired,
  propertyName: PropTypes.string.isRequired,
  valueFromProps: PropTypes.string.isRequired
};

export default ColorInput;
