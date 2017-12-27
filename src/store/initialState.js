import _ from "lodash";

import testCaseStudy from "../caseStudies/testCaseStudy";
import fakeCaseStudy from "../caseStudies/fakeCaseStudy";

// Put all artboards into an object keyed by artboard ID
const packagedArtboards = _.keyBy([testCaseStudy, fakeCaseStudy], "id");

let artboardHistories = {};
_.each(packagedArtboards, artboard => {
  artboardHistories[artboard.id] = [];
});

const initialState = {
  Artboards: {
    artboards: packagedArtboards,
    history: artboardHistories,
    pasteBuffer: null
  }
};

export default initialState;
