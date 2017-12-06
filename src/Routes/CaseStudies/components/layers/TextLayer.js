import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { typeStyles } from '../adjustments/adjustmentOptions'
import { unscaleDimension } from '../../artboardUtils'

class TextLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    }
    this.layoutText = this.layoutText.bind(this)
  }

  componentDidMount() {
    this.setState({ text: this.props.text })
    this.layoutText(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text })
  }

  componentDidUpdate() {
    this.layoutText(this.props)
  }

  layoutText(props) {
    let { textTag } = this
    let { fontSize } = props.layer.adjustments.text
    let { height, width } = props.layer.dimensions
    // Prepare to track current row width and vertical offset
    let rowWidth = 0
    let lineHeight = fontSize * 1.2
    _.each(textTag.children, (child, index) => {
      // Get width of child element and see if it fits on the current row
      let childWidth = child.getComputedTextLength()
      if ((rowWidth + childWidth) < width) {
        // It fits! no x offset needed, lineHeight offset for first chunk only
        child.setAttribute('dx', 0)
        child.setAttribute('dy', (index === 0 ? lineHeight : 0))
        // Increment row width to track how long the row is getting
        rowWidth += childWidth
      } else {
        // It doesn't fit, offset this element to start next row
        child.setAttribute('dx', (-1 * rowWidth))
        child.setAttribute('dy', lineHeight)
        rowWidth = childWidth
      }
    })
  }

  render() {
    let {
      align,
      color,
      fontFamily,
      fontSize
    } = this.props.layer.adjustments.text
    let fontFamilyProps = _.find(typeStyles.families, (family) => {
      return (family.id === fontFamily)
    })
    let { x, y, width, height, rotation } = this.props.layer.dimensions
    let { text, isEditable } = this.props.layer
    let textArray = text.split(' ')
    let rotateOriginX = x + width / 2
    let rotateOriginY = y + height / 2
    // Default left-aligned text props
    let textAnchor = 'start'
    let dx = 0
    // Center-aligned text props
    if (align === 'center') {
      textAnchor = 'middle'
      dx = width / 2
    }
    // Right-aligned text props
    if (align === 'right') {
      textAnchor = 'end'
      dx = width
    }

    // Hide svg text while editing
    let textStyles = {
      visibility: (isEditable ? 'hidden' : 'visible'),
    }

    return (
      <text
        ref={t => this.textTag = t}
        draggable={false}
        fill={color}
        fontSize={fontSize}
        x={x}
        y={y}
        dx={dx}
        dy={fontSize}
        fontFamily={fontFamilyProps.value}
        style={textStyles}
        textAnchor={textAnchor}
        transform={
          `rotate(${rotation} ${rotateOriginX} ${rotateOriginY})`
        }>
        {_.map(textArray, (chunk, index) => { return(
          <tspan key={index} textAnchor={textAnchor}>{chunk + ' '}</tspan>
        )})}
      </text>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer
