import _ from "lodash";

import testCaseStudy from "../caseStudies/testCaseStudy";
import fakeCaseStudy from "../caseStudies/fakeCaseStudy";

const initialState = {
  CaseStudies: {
    caseStudies: _.keyBy([testCaseStudy, fakeCaseStudy], "id"),
    pasteBuffer: null
  }
};

export default initialState;
