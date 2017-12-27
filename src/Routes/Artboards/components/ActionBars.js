import PropTypes from "prop-types";
import React from "react";

import ActionIcon from "./ActionIcons";

class ActionBars extends React.Component {
  constructor(props) {
    super(props);
    this.addImage = this.addImage.bind(this);
    this.addRectangle = this.addRectangle.bind(this);
    this.addText = this.addText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  addEllipse = e => {
    e.target.blur();
    this.props.addLayer("ellipse");
  };

  addImage = e => {
    e.target.blur();
    this.props.addLayer("image");
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

  render() {
    return (
      <div>
        <div className="action-bar__top-right" onClick={this.handleClick}>
          <button className="action-bar__button" onClick={this.addRectangle}>
            <ActionIcon iconType="rectangle" fill={this.props.buttonFill} />
          </button>
          <button className="action-bar__button" onClick={this.addEllipse}>
            <ActionIcon iconType="ellipse" fill={this.props.buttonFill} />
          </button>
          <button className="action-bar__button" onClick={this.addImage}>
            <ActionIcon iconType="image" fill={this.props.buttonFill} />
          </button>
          <button className="action-bar__button" onClick={this.addText}>
            <ActionIcon iconType="textLayer" fill={this.props.buttonFill} />
          </button>
        </div>
        <div className="action-bar__bottom-right" onClick={this.handleClick}>
          <button
            className="action-bar__button"
            onClick={e => {
              this.props.moveLayers("front");
            }}
          >
            <ActionIcon iconType="bringToFront" fill={this.props.buttonFill} />
          </button>
          <button
            className="action-bar__button"
            onClick={e => {
              this.props.moveLayers("back");
            }}
          >
            <ActionIcon iconType="sendToBack" fill={this.props.buttonFill} />
          </button>
        </div>
      </div>
    );
  }
}

ActionBars.propTypes = {
  addLayer: PropTypes.func.isRequired
};

export default ActionBars;
