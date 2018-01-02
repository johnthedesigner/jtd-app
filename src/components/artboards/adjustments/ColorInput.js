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
      background: valueFromProps ? valueFromProps : "rgb(0,0,0)"
    };

    const previewStyles = {
      background: valueFromProps ? valueFromProps : "rgb(0,0,0)"
    };

    return (
      <div className="color-adjustment">
        <div className="color-adjustment__color-thumbnail">
          <div className="color-adjustment__preview" style={previewStyles} />
          <div
            className={`color-adjustment__thumbnail color-adjustment__thumbnail--${
              propertyName
            }`}
            onClick={this.togglePicker}
            style={thumbnailStyles}
          />
        </div>
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
