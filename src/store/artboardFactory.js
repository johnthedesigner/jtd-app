import _ from "lodash";

import fakeCaseStudy from "./artboards/fakeCaseStudy";
import fakeCaseStudy2 from "./artboards/fakeCaseStudy2";

export const layerTypes = {
  ellipse: "ellipse",
  image: "image",
  rectangle: "rectangle",
  text: "text"
};

export const artboards = _.keyBy([fakeCaseStudy, fakeCaseStudy2], "id");

// Assemble empty default histories for each artboard
export const artboardHistories = {};
_.each(artboards, artboard => {
  artboardHistories[artboard.id] = [];
});
