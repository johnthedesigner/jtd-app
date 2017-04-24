import React from 'react'
import PropTypes from 'prop-types'

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
    event.preventDefault()
  }

  render() {
    const {
      propertyName,
      label,
      setLayerAdjustment,
      value
    } = this.props
    return (
      <div>
        <label htmlFor={'dimensions-adjustment__' + propertyName}>{label}</label>
        <input
          ref={(e) => { this[propertyName + 'Input'] = e }}
          type='text'
          id={'dimensions-adjustment__' + propertyName}
          name={propertyName}
          defaultValue={value}
          onChange={this.handleChange}
          onBlur={() => {
            setLayerAdjustment(propertyName, this.state.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              this[propertyName + 'Input'].blur()
            }
          }}
          onFocus={() => this[propertyName + 'Input'].select()}/>
      </div>
    )
  }
}

TextInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default TextInput