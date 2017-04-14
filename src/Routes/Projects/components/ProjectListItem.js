import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ProjectListItem extends React.Component {
  render() {
    const { project } = this.props

    return (
      <div className='projects-list__project'>
        <h3><Link to={'/projects/'+project.id}>{project.title}</Link></h3>
        <hr/>
      </div>
    )
  }
}

ProjectListItem.propTypes = {
  project : PropTypes.object.isRequired
}

export default ProjectListItem