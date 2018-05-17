import { combineReducers } from "redux"

import user from "./userReducer"
import calendar from "./calendarReducer"

export default combineReducers({
  user,
  calendar,
})
