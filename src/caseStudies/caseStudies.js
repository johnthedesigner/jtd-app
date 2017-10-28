import _ from 'lodash'

import testCaseStudy from 'testCaseStudy'
import fakeCaseStudy from 'fakeCaseStudy'

export default _.keyBy([
  testCaseStudy,
  fakeCaseStudy
], 'id')