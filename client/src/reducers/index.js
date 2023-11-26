import { combineReducers } from "redux";

import storyReducer from "./stories";
import authenticationReducer from "./authentication";

export default combineReducers({
    stories: storyReducer,
    authentication: authenticationReducer
});