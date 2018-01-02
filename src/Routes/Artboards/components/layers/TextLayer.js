import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import idx from "idx";

import { typeStyles } from "../adjustments/adjustmentOptions";

class TextLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.layoutText = this.layoutText.bind(this);
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
    this.layoutText(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text });
    this.layoutText(this.props);
  }

  componentDidUpdate() {
    this.layoutText(this.props);
  }

  layoutText(props) {
    let { textTag } = this;
    let { align, fontSize } = props.layer.adjustments.text;
    let layerWidth = props.layer.dimensions.width;

    // Keep track of text rows
    let currentRow = 0; // Start with the first row (duh)

    // Set up array to contain rows, starting with first row
    let rows = [
      {
        firstChild: 0, // index of the current row's first element
        width: 0, // We'll increment this as we go
        offset: 0 // track offset if necessary for text alignment
      }
    ];

    const getAlignOffset = (layerWidth, rowWidth, align) => {
      let alignOffset = 0;
      if (align === "center") alignOffset = (layerWidth - rowWidth) / 2;
      if (align === "right") alignOffset = layerWidth - rowWidth;
      return alignOffset;
    };

    // Go through each text element and build rows
    _.each(textTag.children, (child, index) => {
      // Reset existing positioning
      child.setAttribute("dx", 0);
      child.setAttribute("dy", 0);

      // Get width of child element
      let childWidth = child.getComputedTextLength();

      if (rows[currentRow].width + childWidth < layerWidth) {
        // It fits! add to row width and update alignment offset
        rows[currentRow].width += childWidth;
        rows[currentRow].offset = getAlignOffset(
          layerWidth,
          rows[currentRow].width,
          align
        );
      } else {
        // It didn't fit. increment row and add new row to rows array
        currentRow++;
        rows[currentRow] = {
          firstChild: index,
          width: childWidth,
          offset: getAlignOffset(layerWidth, childWidth, align)
        };
      }
    });

    // Go through rows data and apply positioning
    let lineHeight = fontSize * 1.125; // How far to offset new rows vertically
    _.each(rows, (row, index) => {
      let firstWord = textTag.children[row.firstChild];
      let prevRow = rows[index - 1];
      let prevRowOffset = index > 0 ? (prevRow.width + prevRow.offset) * -1 : 0;
      firstWord.setAttribute("dx", prevRowOffset + row.offset);
      firstWord.setAttribute("dy", lineHeight);
    });
  }

  render() {
    let {
      color,
      fontFamily,
      fontSize,
      fontWeight,
      italic,
      underline
    } = this.props.layer.adjustments.text;
    let fontFamilyProps = _.find(typeStyles.families, family => {
      return family.id === fontFamily;
    });
    let { x, y, width, height, rotation } = this.props.layer.dimensions;
    let { text, isEditable } = this.props.layer;
    let textArray = text.split(" ");
    let rotateOriginX = x + width / 2;
    let rotateOriginY = y + height / 2;
    // Default left-aligned text props
    let textAnchor = "start";
    let dx = 0;

    let blendMode = idx(this.props.layer, _ => _.adjustments.blending.mode);

    let textStyles = {
      visibility: isEditable ? "hidden" : "visible",
      mixBlendMode: blendMode ? blendMode : "normal"
    };

    return (
      <text
        ref={t => (this.textTag = t)}
        draggable={false}
        fill={color}
        fontSize={fontSize}
        key={`rect${this.props.layer.id}`}
        x={x}
        y={y}
        dx={dx}
        dy={fontSize}
        fontFamily={fontFamilyProps.value}
        fontStyle={italic ? "italic" : "normal"}
        fontWeight={fontWeight}
        style={textStyles}
        textAnchor={textAnchor}
        textDecoration={underline ? "underline" : "none"}
        transform={`rotate(${rotation} ${rotateOriginX} ${rotateOriginY})`}
      >
        {_.map(textArray, (chunk, index) => {
          return (
            <tspan key={index} textAnchor={textAnchor}>
              {chunk + " "}
            </tspan>
          );
        })}
      </text>
    );
  }
}

TextLayer.propTypes = {
  layer: PropTypes.object.isRequired
};

export default TextLayer;
