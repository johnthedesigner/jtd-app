import React from 'react'
import PropTypes from 'prop-types'

class DimensionsAdjustment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.layer.dimensions
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.layer.dimensions
    })
  }

  handleChange(event) {
    let newValue = {}
    newValue[event.target.name] = event.target.value
    this.setState(newValue)
    event.preventDefault()
  }

  render() {
    const { updateDimensions, layer } = this.props

    const textField = (label, key) => { return (
      <div>
        <label htmlFor={'dimensions-adjustment__' + key}>{label}</label>
        <input
          ref={(e) => { this[key + 'Input'] = e; }}
          type='text'
          id={'dimensions-adjustment__' + key}
          name={key}
          value={this.state[key]}
          onChange={this.handleChange}
          onBlur={() => {
            updateDimensions(layer.id, this.state)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              updateDimensions(layer.id, this.state)
              this[key + 'Input'].blur()
            }
          }}
          onFocus={() => this[key + 'Input'].select()}/>
      </div>
    )}

    return (
      <div>
        {textField('x','x')}
        {textField('y','y')}
        {textField('Width','width')}
        {textField('Height','height')}
      </div>
    )
  }
}

DimensionsAdjustment.propTypes = {
  layer : PropTypes.object.isRequired
}

export default DimensionsAdjustment