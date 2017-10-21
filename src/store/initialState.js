import _ from 'lodash'

import testCaseStudy from '../caseStudies/testCaseStudy'

const initialState = {
  CaseStudies: {
    caseStudies: _.keyBy([testCaseStudy], 'id'),
    pasteBuffer: null
  }
}

export default initialState