import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class TextLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      lines: [[]]
    }
    this.layoutText = this.layoutText.bind(this)
  }

  componentDidMount() {
    this.setState({ text: this.props.text })
    this.layoutText()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text })
    this.layoutText()
  }

  layoutText() {
    let { textTag } = this
    let { fontSize } = this.props.layer.adjustments.text
    let { width } = this.props.layer.dimensions
    // Prepare to track current row width and vertical offset
    let rowWidth = 0
    let lineHeight = fontSize * 1.2
    _.each(textTag.children, (child) => {
      // Get width of child element and see if it fits on the current row
      let childWidth = child.getComputedTextLength()
      if ((rowWidth + childWidth) < width) {
        // It fits! increment row width to track how long the row is getting
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
    let { align, color, fontSize } = this.props.layer.adjustments.text
    let { x, y, width, height, rotation } = this.props.layer.dimensions
    let { text } = this.props.layer
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
        textAnchor={textAnchor}
        transform={
          `rotate(${rotation} ${rotateOriginX} ${rotateOriginY})`
        }>
        {_.map(textArray, (chunk, index) => { return(
          <tspan key={index}>{chunk + ' '}</tspan>
        )})}
      </text>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer
