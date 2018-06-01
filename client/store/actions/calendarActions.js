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

export function updateEvent(accessToken, calendarId, eventId) {
  return function (dispatch) {
    dispatch(updatingEvent())
    return googleCalendar.updateEvent(accessToken, calendarId, eventId)
      .then( response => {
        debugger;
        if (!response.error) {
          dispatch(updateEventSuccess())
          dispatch(fetchEvents(accessToken, calendarId))
        } else {
          dispatch(updateEventRejected(response.error))
        }
      })
      .catch(error => {dispatch(fetchEventsRejected(error))})
  }
}

export function deleteEvent(accessToken, calendarId, eventId) {
  return function (dispatch) {
    dispatch(deletingEvent())
    return googleCalendar.deleteEvent(accessToken, calendarId, eventId)
      .then( response => {
        debugger;
        if (response['event'] === 'successfully deleted') {
          dispatch(deleteEventSuccess())
          dispatch(fetchEvents(accessToken, calendarId))
        } else {
          dispatch(deleteEventRejected(response['event']))
        }
      })
      .catch(error => {dispatch(deleteEventRejected(response[eventId]))})
  }
}

function fetchingCalendar() {
  return {type: types.FETCH_CALENDAR}
}

function fetchCalendarSuccess(payload) {
  return {type: types.FETCH_CALENDAR_SUCCESS, payload: payload}
}

function fetchCalendarRejected(payload) {
  return {type: types.FETCH_CALENDAR_REJECTED, payload: payload}
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

function fetchingEvents() {
  return {type: types.FETCH_EVENTS}
}

function fetchEventsSuccess(payload) {
  return {type: types.FETCH_EVENTS_SUCCESS, payload: payload}
}

function fetchEventsRejected(error){
  return {type: types.FETCH_EVENTS_REJECTED, payload: error}
}

function updatingEvent() {
  return {type: types.UPDATING_EVENT}
}

function updateEventSuccess() {
  return {type: types.UPDATE_EVENT_SUCCESS}
}

function updateEventRejected(error) {
  return {type: types.UPDATE_EVENT_REJECTED, payload: error}
}

function deletingEvent() {
  return {type: types.DELETE_EVENT}
}

function deleteEventSuccess() {
  return {type: types.DELETE_EVENT_SUCCESS}
}

function deleteEventRejected(error) {
  return {type: types.DELETE_EVENT_REJECTED, payload: error}
}
