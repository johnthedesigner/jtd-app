import React from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'

class ColorInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
  }

  componentWillMount() {
    this.setState({
      value: this.props.valueFromProps
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.valueFromProps
    })
  }

  handleChangeComplete(color, event) {
    const { rgb } = color
    let newColor = `rgba(${ rgb.r },${ rgb.g },${ rgb.b },${ rgb.a })`
    this.setState({
      value: newColor
    })
    this.props.setLayerAdjustment(this.props.propertyName, this.state.value)
  }

  render() {
    const {
      propertyName,
      label,
    } = this.props

    const thumbnailStyles = {
      background: this.state.value,
      width: '20px',
      height: '20px',
      border: '#ddd solid 1px',
    }

    return (
      <div>
        <label htmlFor={'color-adjustment__' + propertyName}>{label}</label>
        <div style={thumbnailStyles}/>
        <div style={{display: 'none'}}>
          <SketchPicker
            color={this.state.value}
            onChangeComplete={this.handleChangeComplete}
            triangle='top-right'/>
        </div>
      </div>
    )
  }
}

ColorInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default ColorInput
