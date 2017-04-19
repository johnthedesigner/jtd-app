import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import ArtboardsPalette from './sidebar/ArtboardsPalette'
import EditorActionBar from './EditorActionBar'
import EditorWorkspace from './EditorWorkspace'

import './styles/editor.css'

class EditorView extends React.Component {
  render() {

    const {
      Projects,
      match,
      selectArtboard,
      selectLayer,
      highlightLayer,
      toggleArtboardItem,
    } = this.props
    const project = _.keyBy(Projects.items,'id')[match.params.projectId]

    return (
      <div className='editor-view__wrapper'>

        <div className='editor-view__tab-bar'>
          <Link to='/'>Home</Link>{' | '}<Link to='/Projects'>Projects</Link>
        </div>

        <div className='editor-view__body'>

          <div className='editor-view__main-area' onClick={() => {
            selectArtboard(null, null)
          }}>
            <EditorActionBar/>
            <EditorWorkspace
              selections={Projects.selections}
              highlights={Projects.highlights}
              artboards={project.artboards}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              highlightLayer={highlightLayer}/>
          </div>

          <div className='editor-view__sidebar'>
            <ArtboardsPalette
              match={match}
              selections={Projects.selections}
              highlights={Projects.highlights}
              artboards={project.artboards}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              highlightLayer={highlightLayer}
              toggleArtboardItem={toggleArtboardItem}/>
          </div>
        </div>
      </div>
    )
  }
}

EditorView.propTypes = {
  Projects : PropTypes.object.isRequired
}

export default EditorView