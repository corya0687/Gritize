import googleCalendar from './api/googleCalendar'
import * as types from '../../utils/constants/actionTypes'
import {handleResponse} from './actionsHelpers'

export function fetchCalendar(accessToken, calendarId) {
  return function (dispatch) {
    dispatch(fetchingCalendar())
    return googleCalendar.getCalendarList(accessToken, calendarId)
      .then(response => {
        dispatch(handleResponse(response, fetchCalendarSuccess, fetchCalendarRejected})))
      .catch(error => dispatch(fetchCalendarRejected(error)))
  }
}

//TODO make add event and update events, and get Events actions

export function fetchingCalendar() {
  return {type: type.FETCH_CALENDAR}
}

function fetchCalendarSuccess(payload) {
  return {type: types.FETCH_CALENDAR_SUCCESS, payload: payload}
}

function fetchCalendarRejected(payload){
  return {type: types.FETCH_CALENDAR_REJECTED, payload: payload}
}
