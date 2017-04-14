import { connect } from 'react-redux'

// import { updateSort } from '../actions'
import ProjectsView from '../components/ProjectsView'

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateSort: (sortColumn, sortDirection) => {
//       dispatch(updateSort(sortColumn, sortDirection))
//     }
//   }
// }

const mapStateToProps = (state) => ({
  Projects: state.Projects,
})

const ProjectsContainer = connect(
  mapStateToProps
)(ProjectsView)

export default ProjectsContainer
