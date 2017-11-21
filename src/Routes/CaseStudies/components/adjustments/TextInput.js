import React from 'react'
import PropTypes from 'prop-types'

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleFocus(event) {
    event.target.select()
  }

  handleBlur(event) {
    this.props.setValue(this.state.value)
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.target.blur()
    } else if (this.props.type === 'number') {
      // console.log(event.key)
    }
  }

  render() {
    const {
      propertyName,
      label,
      type,
    } = this.props

    return (
      <div>
        <label htmlFor={'dimensions-adjustment__' + propertyName}>{label}</label>
        <input
          type={type}
          value={this.state.value}
          placeholder={'-'}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}/>
      </div>
    )
  }
}

TextInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default TextInput
