import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Artboard from './Artboard'
import Layer from './layers/Layer'

class EditorWorkspace extends React.Component {
  render() {

    const {
      artboards,
      bumpLayers,
      dragLayers,
      highlightLayer,
      resizeLayers,
      selectArtboard,
      selectLayer,
      selections,
    } = this.props

    return (
      <div className="editor-workspace__artboard-List">
        {_.map(artboards,(artboard,index) => { return (
          <Artboard
            {...artboard}
            key={index}
            selectArtboard={selectArtboard}
            selections={selections}
            highlightLayer={highlightLayer}>
            {_.map(artboard.layers,(layer,index) => { return (
              <Layer
                artboardColor={artboard.artboardColor}
                bumpLayers={bumpLayers}
                dragLayers={dragLayers}
                key={index}
                layer={layer}
                resizeLayers={resizeLayers}
                selectedLayers={selections.layers}
                selectLayer={selectLayer}
                highlightLayer={highlightLayer}/>
            )})}
          </Artboard>
        )})}
      </div>
    )
  }
}

EditorWorkspace.propTypes = {
  artboards : PropTypes.array.isRequired
}

export default EditorWorkspace