import testImage1 from "./images/test-image-1.jpg";
import testImage2 from "./images/test-image-2.jpg";

const imageFactory = (url, width, height) => {
  return { url, width, height };
};

const imageLibrary = {
  test1: imageFactory(testImage1, 1200, 1200),
  test2: imageFactory(testImage2, 1200, 1200)
};

export default imageLibrary;
