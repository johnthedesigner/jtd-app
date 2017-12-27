import _ from "lodash";

import testCaseStudy from "./artboards/testCaseStudy";
import fakeCaseStudy from "./artboards/fakeCaseStudy";

export const layerTypes = {
  ellipse: "ellipse",
  image: "image",
  rectangle: "rectangle",
  text: "text"
};

export const artboards = _.keyBy([testCaseStudy, fakeCaseStudy], "id");

// Assemble empty default histories for each artboard
export const artboardHistories = {};
_.each(artboards, artboard => {
  artboardHistories[artboard.id] = [];
});
