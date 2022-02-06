import { combineReducers } from "redux";
import discussionReducer from "./discussion/discussion-reducer";

const rootReducer = combineReducers({
  discussion: discussionReducer,
});

export default rootReducer;
