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

    const { layer, layerScaleStyles } = this.props

    const { type } = layer.adjustments

    const textStyles = {
      ...layerScaleStyles,
      color: type.color,
      fontFamily: type.fontFamily,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    }

    return (
      <span style={textStyles}>
        <Editor
          ref={this.setTextEditorRef}
          editorState={this.state.editorState}
          onChange={this.handleChange}
          onBlur={this.handleBlur}/>
      </span>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer