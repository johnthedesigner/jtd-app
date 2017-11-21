import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Editor, EditorState } from 'draft-js'

class TextLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      editingLayer: this.props.editingLayer
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.setTextEditorRef = ref => this.textEditor = ref
  }

  componentDidMount() {
    this.setState({
      text: this.props.layer.text,
      editingLayer: this.props.editingLayer
    })
    if (this.props.editingLayer) this.textEditor.focus()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.layer.text,
      editingLayer: nextProps.editingLayer
    })
    if (nextProps.editingLayer) this.textEditor.focus()
  }

  handleChange(editorState) {
    this.setState({editorState})
  }

  handleFocus(event) {
    event.target.select()
  }

  handleBlur(event) {
    console.log(this.state.editorState)
    this.setState({
      editingLayer: false
    })
    console.log(this.state.editorState.getCurrentContent())
    this.props.updateText(
      this.props.layer.id, this.state.editorState.getCurrentContent())
    this.textEditor.blur()
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }

  render() {
    let { align, color, fontSize } = this.props.layer.adjustments.text
    let { x, y, width, height, rotation } = this.props.layer.dimensions
    let { text } = this.props.layer
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
        ref={(t) => this.textBox = t}
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
        {text}
      </text>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer
