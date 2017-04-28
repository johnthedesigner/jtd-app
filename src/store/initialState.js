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
      projectId: null,
      artboardId: null,
      groupId: null,
      layers: []
    },
    highlights: {
      artboardId: null,
      layerId: null
    }
  }
}

export default initialState