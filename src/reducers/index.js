import { combineReducers } from "redux";

import form from "./formReducer";
import schema from "./schemaReducer";
export default combineReducers({
  form,
  schema,
});
