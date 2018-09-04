import React from "react";
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';

import ColorPicker from "./ColorPicker";

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

  render() {
    const { projectColors, tooltipText } = this.props;
    let { start, end } = this.props.valueFromProps;

    const startThumbnailStyles = {
      background: start
    };

    const endThumbnailStyles = {
      background: end
    };

    const gradientThumbPreviewStyles = {
      background: `linear-gradient(to right, ${start}, ${end})`
    };

    return (
      <div className="gradient-adjustment">
        <Tooltip title={tooltipText} placement="right">
          <div className="gradient-adjustment__gradient-thumbnail">
            <div
              className="gradient-adjustment__gradient-thumbnail-preview"
              style={gradientThumbPreviewStyles}
            />
            <div
              className={"gradient-adjustment__gradient-start-thumbnail"}
              onClick={() => this.showPicker("start")}
              style={startThumbnailStyles}
            />
            <div
              className={"gradient-adjustment__gradient-end-thumbnail"}
              onClick={() => this.showPicker("end")}
              style={endThumbnailStyles}
            />
          </div>
        </Tooltip>
        <ColorPicker
          colors={projectColors}
          updateColor={this.updateGradient}
          show={this.state.showPicker}
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
