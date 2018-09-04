import PropTypes from "prop-types";
import React from "react";
import Tooltip from '@material-ui/core/Tooltip';

import ActionIcon from "./ActionIcons";

class ActionBars extends React.Component {
  constructor(props) {
    super(props);
    this.addRectangle = this.addRectangle.bind(this);
    this.addText = this.addText.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
  }

  addEllipse = e => {
    e.target.blur();
    this.props.addLayer("ellipse");
  };

  addRectangle = e => {
    e.target.blur();
    this.props.addLayer("rectangle");
  };

  addText = e => {
    e.target.blur();
    this.props.addLayer("text");
  };

  handleClick = e => e.stopPropagation();

  showImagePicker = e => {
    e.target.blur();
    this.props.toggleImagePicker();
  };

  render() {
    return (
      <div>
        <div className="action-bar__top-right" onClick={this.handleClick}>
          <button className="action-bar__plus-icon">
            <ActionIcon iconType="plus" fill="rgba(0,0,0,.2)" />
          </button>
          <Tooltip title="Add rectangle" placement="left" style={tooltipStyles}>
            <button className="action-bar__button" onClick={this.addRectangle}>
              <ActionIcon iconType="rectangle" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
          <Tooltip title="Add ellipse" placement="left">
            <button className="action-bar__button" onClick={this.addEllipse}>
              <ActionIcon iconType="ellipse" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
          <Tooltip title="Add image" placement="left">
            <button className="action-bar__button" onClick={this.showImagePicker}>
              <ActionIcon iconType="image" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
          <Tooltip title="Add text" placement="left">
            <button className="action-bar__button" onClick={this.addText}>
              <ActionIcon iconType="textLayer" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
        </div>
        <div className="action-bar__bottom-right" onClick={this.handleClick}>
          <Tooltip title="Bring to top" placement="left">
            <button
              className="action-bar__button"
              onClick={e => {
                this.props.moveLayers("front");
              }}
            >
              <ActionIcon iconType="bringToFront" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
          <Tooltip title="Move to bottom" placement="left">
            <button
              className="action-bar__button"
              onClick={e => {
                this.props.moveLayers("back");
              }}
            >
              <ActionIcon iconType="sendToBack" fill={this.props.buttonFill} />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}

ActionBars.propTypes = {
  addLayer: PropTypes.func.isRequired
};

export default ActionBars;
