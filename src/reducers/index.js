import playlistReducer from "./playlist";
import randomReducer from "./random";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    playlistReducer,
    randomReducer
});
export default allReducers;