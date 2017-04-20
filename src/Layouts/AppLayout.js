import React from 'react'
import { Route } from 'react-router-dom'

import HomeView from '../Routes/Home/components/HomeView'
import ProjectsListContainer from '../Routes/Editor/containers/ProjectsListContainer'
import EditorContainer from '../Routes/Editor/containers/EditorContainer'

import '../App.css'

class AppLayout extends React.Component {
  render() {

    return (
      <div className='app-layout--container'>
        <div className='app-layout__body'>
          <Route exact path='/' component={HomeView}/>
          <Route exact path='/projects' component={ProjectsListContainer}/>
          <Route exact path='/editor/:projectId' component={EditorContainer}/>
        </div>
      </div>
    )
  }
}

export default AppLayout
