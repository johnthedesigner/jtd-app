import _ from "lodash";

import fakeCaseStudy from "./artboards/fakeCaseStudy";

export const layerTypes = {
  ellipse: "ellipse",
  image: "image",
  rectangle: "rectangle",
  text: "text"
};

const fakeCaseStudy2 = _.cloneDeep(fakeCaseStudy);
fakeCaseStudy2.id = "fake2";
const fakeCaseStudy3 = _.cloneDeep(fakeCaseStudy);
fakeCaseStudy3.id = "fake3";

export const artboards = _.keyBy(
  [fakeCaseStudy, fakeCaseStudy2, fakeCaseStudy3],
  "id"
);

// Assemble empty default histories for each artboard
export const artboardHistories = {};
_.each(artboards, artboard => {
  artboardHistories[artboard.id] = [];
});
