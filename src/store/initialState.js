import _ from "lodash";

import { artboards, artboardHistories } from "./artboardFactory";

const initialState = {
  Content: {
    artboards: artboards,
    currentArtboardId: null,
    history: artboardHistories,
    pasteBuffer: null
  }
};

export default initialState;
