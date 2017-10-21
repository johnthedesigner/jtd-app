import { connect } from 'react-redux'

import HomeView from '../components/HomeView'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    Artboards: state.CaseStudies.caseStudies
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)

export default HomeContainer