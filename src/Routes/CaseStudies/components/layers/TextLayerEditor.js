import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { scaleAllDimensions, scaleDimension } from '../../artboardUtils'

class TextLayerEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      textarea: '',
      dimensions: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    let { dimensions, text } = this.props.layer
    this.setState({
      dimensions,
      text,
      textarea: text
    })
    this.textarea.select()
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, text } = nextProps.layer
    this.setState({
      dimensions,
      text
    })
  }

  handleBlur() {
    this.props.enableTextEditor(null)
  }

  handleChange(e) {
    this.props.updateText(e.target.value)
    this.setState({ textarea: e.target.value })
  }

  handleClick(e) {
    e.stopPropagation()
  }

  render() {
    let { scaleFactor } = this.props
    let { dimensions } = this.state
    let { text } = this.props.layer.adjustments
    let fontSize = scaleDimension(text.fontSize, scaleFactor, true)
    dimensions = scaleAllDimensions(dimensions, scaleFactor, true)
    let editorStyles = {
      border: '#F00 solid 1px',
      position: 'absolute',
      top: dimensions.y,
      left: dimensions.x,
      width: dimensions.width,
      height: '1000px',
      paddingTop: 0,
      paddingLeft: 0,
      background: 'none',
      fontSize: `${fontSize}px`,
      lineHeight: `${fontSize * 1.25}px`
    }

    return (
      <textarea
        ref={(i) => { this.textarea = i }}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onChange={this.handleChange}
        style={editorStyles}
        value={this.state.textarea}/>
    )
  }
}

TextLayerEditor.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayerEditor
