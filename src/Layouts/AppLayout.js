import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/Header'

class AppLayout extends React.Component {
  render() {
    return (
      <div className='app-layout--container'>
        <Header />
        <div className='app-layout__body'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

AppLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default AppLayout
