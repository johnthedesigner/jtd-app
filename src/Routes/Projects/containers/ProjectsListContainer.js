import { connect } from 'react-redux'
import _ from 'lodash'

import ProjectsView from '../components/ProjectsView'

const mapStateToProps = (state) => ({
  Projects: _.map(state.Projects.items,(p) => { return p })
})

const ProjectsListContainer = connect(
  mapStateToProps
)(ProjectsView)

export default ProjectsListContainer
