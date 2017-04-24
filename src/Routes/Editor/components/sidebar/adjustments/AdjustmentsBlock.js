import React from 'react'
import PropTypes from 'prop-types'

class AdjustmentsBlock extends React.Component {
  render() {
    return (
      <div className="adjustments-block__wrapper">
        {this.props.children}
      </div>
    )
  }
}

AdjustmentsBlock.propTypes = {
  selectedLayer : PropTypes.object
}

export default AdjustmentsBlock