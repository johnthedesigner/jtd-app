import React from 'react'
import PropTypes from 'prop-types'

class SelectionControl extends React.Component {
  render() {

    const { isActive, selectionControlStyles } = this.props

    const toggleActive = () => {
      return (isActive) ? ' is-active' : ''
    }

    return (
      <div
        className={'selection-control__wrapper' + toggleActive()}
        style={selectionControlStyles}
        onClick={(e) => {
          console.log('click selection control')
          e.stopPropagation()
        }}>
        <div className='resize-handles__top-left'></div>
        <div className='resize-handles__top-center'></div>
        <div className='resize-handles__top-right'></div>
        <div className='resize-handles__right-middle'></div>
        <div className='resize-handles__bottom-right'></div>
        <div className='resize-handles__bottom-center'></div>
        <div className='resize-handles__bottom-left'></div>
        <div className='resize-handles__left-middle'></div>
      </div>
    )
  }
}

SelectionControl.propTypes = {
  selectionControlStyles : PropTypes.object.isRequired
}

export default SelectionControl