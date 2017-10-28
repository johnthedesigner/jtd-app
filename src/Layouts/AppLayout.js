import React from 'react'
import { Route } from 'react-router-dom'

import HomeContainer from '../Routes/CaseStudies/containers/HomeContainer'

import '../App.css'

class AppLayout extends React.Component {
  render() {

    return (
      <div className='app-layout__container'>
        <div className='app-layout__nav'>
        </div>
        <div className='app-layout__body'>
          <Route exact path='/' component={HomeContainer}/>
        </div>
      </div>
    )
  }
}

export default AppLayout
