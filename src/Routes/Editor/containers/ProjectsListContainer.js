import { connect } from 'react-redux'
import _ from 'lodash'

import ProjectsView from '../components/ProjectsView'

const mapProjects = (state) => {
  const { Editor } = state
  const { Projects, Artboards, Layers } = Editor
  let mappedProjects = _.map(Projects, (project) => {
    return {
      ...project,
      artboards: _.map(project.artboards, (artboardId) => {
        return {
          ...Artboards[artboardId],
          layers: _.map(Artboards[artboardId].layers, (layerId) => {
            return Layers[layerId]
          })
        }
      })
    }
  })
  console.log(mappedProjects)
  return mappedProjects
}

const mapStateToProps = (state) => ({
  Projects: mapProjects(state)
})

const ProjectsListContainer = connect(
  mapStateToProps
)(ProjectsView)

export default ProjectsListContainer
