import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { scaleAllDimensions, scaleDimension } from "../artboards/artboardUtils";
import { typeStyles } from "../artboards/adjustments/adjustmentOptions";

class TextLayerEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textarea: "",
      dimensions: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let { dimensions, text } = this.props.layer;
    this.setState({
      dimensions,
      text,
      textarea: text
    });
    this.textarea.select();
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, text } = nextProps.layer;
    this.setState({
      dimensions,
      text
    });
  }

  handleBlur() {
    this.props.enableTextEditor(null);
  }

  handleChange(e) {
    // Strip some characters to prevent scripting
    let preppedText = e.target.value.replace(/[<>]/gi, "");
    this.props.updateText(preppedText);
    this.setState({ textarea: preppedText });
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    let { scaleFactor } = this.props;
    let { dimensions } = this.state;
    let { text } = this.props.layer.adjustments;
    let fontFamilyProps = _.find(typeStyles.families, family => {
      return family.id === text.fontFamily;
    });
    let fontSize = scaleDimension(text.fontSize, scaleFactor, true);
    dimensions = scaleAllDimensions(dimensions, scaleFactor, true);
    let editorStyles = {
      border: "#F00 solid 1px",
      position: "absolute",
      top: dimensions.y,
      left: dimensions.x,
      width: dimensions.width,
      height: "1000px",
      outline: "none",
      paddingTop: ".4rem",
      paddingLeft: 0,
      background: "none",
      color: text.color,
      fontFamily: fontFamilyProps.value,
      fontSize: `${fontSize}px`,
      fontWeight: text.fontWeight,
      lineHeight: `${fontSize * 1.125}px`,
      textAlign: text.align
    };

    return (
      <textarea
        ref={i => {
          this.textarea = i;
        }}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onChange={this.handleChange}
        style={editorStyles}
        value={this.state.textarea}
      />
    );
  }
}

TextLayerEditor.propTypes = {
  layer: PropTypes.object.isRequired
};

export default TextLayerEditor;
