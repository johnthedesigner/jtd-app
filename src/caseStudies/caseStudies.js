import _ from 'lodash'

import testCaseStudy from 'testCaseStudy'

export default _.keyBy([
  testCaseStudy,
], 'id')