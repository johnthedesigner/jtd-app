import React from 'react'
import PropTypes from 'prop-types'

class ActionIcon extends React.Component {
  render() {

    const { iconType } = this.props

    return (
      <i className={'fa fa-' + iconType} onClick={this.props.onClick}></i>
    )
  }
}

ActionIcon.propTypes = {
  iconType : PropTypes.string.isRequired
}

export default ActionIcon