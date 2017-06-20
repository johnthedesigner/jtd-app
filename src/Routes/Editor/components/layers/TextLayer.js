import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class TextLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.layer.text,
      editingLayer: this.props.editingLayer
    }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    this.setState({
      text: this.props.layer.text,
      editingLayer: this.props.editingLayer
    })
    // if (this.props.editingLayer) this.textEditor.focus()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.layer.text,
      editingLayer: nextProps.editingLayer
    })
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleFocus(event) {
    event.target.select()
  }

  handleBlur(event) {
    this.setState({
      editingLayer: false
    })
    this.props.updateText(this.props.layer.id, this.state.value)
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
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    }

    const showEditorOrText = () => {
      if (this.props.editingLayer) {
        return (
          <input
            autoFocus={true}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onFocus={this.handleFocus}
            placeholder='Double-click to edit.'
            type='text'
            value={this.state.text}/>
        )
      } else {
        return(this.state.text)
      }
    }

    return (
      <span style={textStyles}>
        {showEditorOrText()}
      </span>
    )
  }
}

TextLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default TextLayer