import _ from "lodash";

import testImage1 from "./images/test-image-1.jpg";
import testImage2 from "./images/test-image-2.jpg";

const imageFactory = (id, url, width, height) => {
  return { id, url, width, height };
};

const imageLibrary = _.keyBy(
  [
    imageFactory("test1", testImage1, 1200, 1200),
    imageFactory("test2", testImage2, 1200, 1200)
  ],
  "id"
);

export default imageLibrary;
