import React from 'react'
import { Route } from 'react-router-dom'

import HomeView from '../Routes/Home/components/HomeView'
import ProjectsListContainer from '../Routes/Projects/containers/ProjectsListContainer'
import EditorContainer from '../Routes/Projects/containers/EditorContainer'

import Header from '../components/Header'
import '../App.css'

class AppLayout extends React.Component {
  render() {

    return (
      <div className='app-layout--container'>
        <Header />
        <div className='app-layout__body'>
          <Route exact path='/' component={HomeView}/>
          <Route exact path='/projects' component={ProjectsListContainer}/>
          <Route exact path='/projects/:id' component={EditorContainer}/>
        </div>
      </div>
    )
  }
}

export default AppLayout
