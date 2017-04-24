import React from 'react'
import PropTypes from 'prop-types'

class ActionIcon extends React.Component {
  render() {

    const { iconType, className } = this.props

    return (
      <i
        className={'material-icons ' + className}
        onClick={this.props.onClick}>
        {iconType}
      </i>
    )
  }
}

ActionIcon.propTypes = {
  iconType : PropTypes.string.isRequired
}

export default ActionIcon