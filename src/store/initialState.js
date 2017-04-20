import _ from 'lodash'

import { Projects } from './entities/Projects'
import { Artboards } from './entities/Artboards'
import { Layers } from './entities/Layers'

const initialState = {
  Editor: {
    Projects: _.keyBy(Projects, 'id'),
    Artboards: _.keyBy(Artboards, 'id'),
    Layers: _.keyBy(Layers, 'id'),
    openProjects: [0], // TODO: Opening projects
    selections: {
      projectId: null,
      artboardId: null,
      layerId: null
    },
    highlights: {
      artboardId: null,
      layerId: null
    }
  }
}

export default initialState