import _ from "lodash";

import { artboards, artboardHistories } from "./artboardFactory";

const initialState = {
  Content: {
    artboards: artboards,
    history: artboardHistories,
    pasteBuffer: null
  }
};

export default initialState;
