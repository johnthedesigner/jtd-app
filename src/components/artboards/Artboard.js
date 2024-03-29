import PropTypes from "prop-types";
import React from "react";

import { scaleDimension } from "./artboardUtils";

class Artboard extends React.Component {
  constructor(props) {
    super(props);
    this.artboardClick = this.artboardClick.bind(this);
  }

  artboardClick(e) {
    e.stopPropagation();
    this.props.deselectLayers(this.props.id);
  }

  render() {
    const { isSelected, layerSelected, scaleFactor } = this.props;

    // Hard-coded artboard heights and widths
    let width = 1000;
    let height = 1000;

    const toggleSelected = () => {
      return isSelected || layerSelected ? " is-selected" : "";
    };

    const wrapperStyles = {
      width: scaleDimension(width, scaleFactor),
      height: "auto",
    };

    const frameStyles = {
      width: scaleDimension(width, scaleFactor),
      height: scaleDimension(height, scaleFactor),
    };

    const DelayRenderChildren = (props) =>
      props.isScaled ? "" : this.props.children;

    // console.log(this.props.isScaled);
    return (
      <div
        className="artboard"
        onClick={this.artboardClick}
        style={wrapperStyles}
      >
        <div
          className={"artboard__frame" + toggleSelected()}
          style={frameStyles}
        >
          <DelayRenderChildren showChildren={this.props.isScaled} />
        </div>
      </div>
    );
  }
}

Artboard.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  layerSelected: PropTypes.bool,
};

export default Artboard;
