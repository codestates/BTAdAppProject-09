import { combineReducers } from "redux";
import MainReducer from "./main/reducer";

const rootReducer = combineReducers({
  MainReducer,
});

export default rootReducer;
