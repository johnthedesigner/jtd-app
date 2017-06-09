import React from 'react'
import PropTypes from 'prop-types'
import { RIETextArea } from 'riek'
import _ from 'lodash'

class TextLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.layer.text,
      editingLayer: this.props.editingLayer
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.layer.text,
      editingLayer: nextProps.editingLayer
    })
    // if (nextProps.editingLayer) this.textEditor.focus()
  }

  componentDidMount() {
    // if (this.props.editingLayer) this.textEditor.focus()
  }

  componentDidUpdate() {
    // if (this.props.editingLayer) this.textEditor.focus()
  }

  handleChange(change) {
    console.log(change)
    this.props.setLayerAdjustment('test')
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
          <RIETextArea
            value={this.state.text}
            change={this.handleChange}
            propName='text'
            validate={_.isString} />
        )
      } else {
        return(this.props.layer.text)
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