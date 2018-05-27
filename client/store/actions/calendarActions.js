import googleCalendar from './api/googleCalendar'
import * as types from '../../utils/constants/actionTypes'
import {handleResponse} from './actionsHelpers'

export function fetchCalendar(accessToken, calendarId) {
  return function (dispatch) {
    dispatch(fetchingCalendar())
    return googleCalendar.getCalendarList(accessToken, calendarId)
      .then(response => {
        dispatch(handleResponse(response, fetchCalendarSuccess, fetchCalendarRejected))})
      .catch(error => {dispatch(fetchCalendarRejected(error))})
  }
}

export function addEvent(accessToken, calendarId, calEvent) {
  return function (dispatch) {
    dispatch(creatingEvent())
    return googleCalendar.createCalEvent(accessToken, calendarId, calEvent)
      .then( response => {
        if (!response.error) {
          dispatch(createEventSuccess())
          dispatch(fetchEvents(accessToken, calendarId))
        } else {
          dispatch(createEventRejected(response.error))
        }
      })
      .catch(error => {dispatch(fetchEventsRejected(error))})
  }
}

export function fetchEvents(accessToken, calendarId) {
  return function (dispatch) {
    dispatch(fetchingEvents())
    return googleCalendar.getTodaysEvents(accessToken, calendarId)
      .then(response => {
        let action = response.error ? fetchEventsRejected : fetchEventsSuccess
        dispatch(action(response))
      })
      .catch(error => {dispatch(fetchEventsRejected(error))})
      }
  }

//TODO make add event and update events, and get Events actions

function fetchingCalendar() {
  return {type: types.FETCH_CALENDAR}
}

function fetchCalendarSuccess(payload) {
  return {type: types.FETCH_CALENDAR_SUCCESS, payload: payload}
}

function fetchCalendarRejected(payload) {
  return {type: types.FETCH_CALENDAR_REJECTED, payload: payload}
}

function fetchingEvents() {
  return {type: types.FETCH_EVENTS}
}

function fetchEventsSuccess(payload) {
  return {type: types.FETCH_EVENTS_SUCCESS, payload: payload}
}

function fetchEventsRejected(error){
  return {type: types.FETCH_EVENTS_REJECTED, payload: error}
}

function creatingEvent() {
  return {type: types.CREATE_EVENT}
}

function createEventSuccess() {
  return {type: types.CREATE_EVENT_SUCCESS}
}

function createEventRejected(error) {
  return {type: types.CREATE_EVENT_REJECTED, payload: error}
}
