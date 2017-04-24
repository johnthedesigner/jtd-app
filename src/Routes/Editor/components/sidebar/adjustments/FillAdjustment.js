import React from 'react'
import PropTypes from 'prop-types'

class FillAdjustment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props.fill
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.fill
    })
  }

  handleChange(event) {
    let newValue = {}
    newValue[event.target.name] = event.target.value
    this.setState(newValue)
    event.preventDefault()
  }

  render() {
    const { adjustLayer, layerId } = this.props
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
            adjustLayer(layerId, 'fill', this.state)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              adjustLayer(layerId, 'fill', this.state)
              this[key + 'Input'].blur()
            }
          }}
          onFocus={() => this[key + 'Input'].select()}/>
      </div>
    )}

    return (
      <div>
        {textField('Color','color')}
      </div>
    )
  }
}

FillAdjustment.propTypes = {
  layer : PropTypes.object
}

export default FillAdjustment