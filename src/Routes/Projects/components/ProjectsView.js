import React from 'react'
import PropTypes from 'prop-types'

import ProjectListItem from './ProjectListItem'

class ProjectsView extends React.Component {
  render() {

    const { Projects } = this.props

    return (
      <div className="projects-list__wrapper">
        <h1>Listing Our Projects</h1>
        <hr/>
        {Projects.map((project,index) => {
            return(
              <ProjectListItem key={project.slug} project={project}/>
            )
          }
        )}
      </div>
    )
  }
}

ProjectsView.propTypes = {
  Projects : PropTypes.array.isRequired
}

export default ProjectsView