import _ from 'lodash'

import { Artboards } from './entities/Artboards'
import { Layers } from './entities/Layers'
import { Projects } from './entities/Projects'

const initialState = {
  Editor: {
    Artboards: _.keyBy(Artboards, 'id'),
    Layers: _.keyBy(Layers, 'id'),
    Projects: _.keyBy(Projects, 'id'),
    openProjects: [0], // TODO: Opening projects
    selections: {
      dimensions: {},
      projectId: null,
      artboardId: null,
      layers: []
    },
    highlights: {
      artboardId: null,
      layerId: null
    },
    pasteBuffer: null
  }
}

export default initialState