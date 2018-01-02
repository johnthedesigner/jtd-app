import { combineReducers } from "redux";

import Content from "./reducer";
import History from "./historyReducer";

const Reducers = combineReducers({
  Content,
  History
});

export default Reducers;
