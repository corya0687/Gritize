import googleCalendar from './api/googleCalendar'
import * as types from '../../utils/constants/actionTypes'
import {handleResponse} from './actionsHelpers'
import Activity from './api/activity'
import backendConfig from './api/backendConfig'

export function fetchCalendar(accessToken, calendarId) {
  return function (dispatch) {
    dispatch(fetchingCalendar())
    return googleCalendar.getCalendarList(accessToken, calendarId)
      .then(response => {
        dispatch(handleResponse(response, fetchCalendarSuccess, fetchCalendarRejected))})
      .catch(error => {dispatch(fetchCalendarRejected(error))})
  }
}

export function addActivity(accessToken, calendarId, calEvent) {
  return function (dispatch) {
    dispatch(creatingActivity())
    return googleCalendar.createCalEvent(accessToken, calendarId, calEvent)
      .then( response => {
        if (!response.error) {
          Activity.createActivity('POST', response).then(resp => {
            dispatch(createActivitySuccess())
            dispatch(fetchActivities(accessToken, calendarId))
          })

        } else {
          dispatch(createActivityRejected(response.error))
        }
      })
      .catch(error => {dispatch(fetchActivitiesRejected(error))})
  }
}

export function fetchActivities(accessToken, calendarId) {
  return function (dispatch) {
    dispatch(fetchingActivities())
    return googleCalendar.getTodaysEvents(accessToken, calendarId)
      .then(response => {
        let action = response.error ? fetchActivitiesRejected : fetchActivitiesSuccess
        dispatch(action(response))
      })
      .catch(error => {dispatch(fetchActivitiesRejected(error))})
  }
}

export function updateActivity(accessToken, calendarId, eventId) {
  return function (dispatch) {
    dispatch(updatingActivity())
    return googleCalendar.updateActivity(accessToken, calendarId, eventId)
      .then( response => {
        if (!response.error) {
          dispatch(updateActivitySuccess())
          dispatch(fetchActivities(accessToken, calendarId))
        } else {
          dispatch(updateActivityRejected(response.error))
        }
      })
      .catch(error => {dispatch(fetchActivitiesRejected(error))})
  }
}

export function deleteActivity(accessToken, calendarId, eventId) {
  return function (dispatch) {
    dispatch(deletinActivity())
    return googleCalendar.deleteActivity(accessToken, calendarId, eventId)
      .then( response => {
        if (response['event'] === 'successfully deleted') {
          dispatch(deleteActivitySuccess())
          dispatch(fetchActivities(accessToken, calendarId))
        } else {
          dispatch(deleteActivityRejected(response['event']))
        }
      })
      .catch(error => {dispatch(deleteActivityRejected(response[eventId]))})
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

function creatingActivity() {
  return {type: types.CREATE_ACTIVITY}
}

function createActivitySuccess() {
  return {type: types.CREATE_ACTIVITY_SUCCESS}
}

function createActivityRejected(error) {
  return {type: types.CREATE_ACTIVITY_REJECTED, payload: error}
}

function fetchingActivities() {
  return {type: types.FETCH_ACTIVITIES}
}

function fetchActivitiesSuccess(payload) {
  return {type: types.FETCH_ACTIVITIES_SUCCESS, payload: payload}
}

function fetchActivitiesRejected(error){
  return {type: types.FETCH_ACTIVITIES_REJECTED, payload: error}
}

function updatingActivity() {
  return {type: types.UPDATING_ACTIVITY}
}

function updateActivitySuccess() {
  return {type: types.UPDATE_ACTIVITY_SUCCESS}
}

function updateActivityRejected(error) {
  return {type: types.UPDATE_ACTIVITY_REJECTED, payload: error}
}

function deletingActivity() {
  return {type: types.DELETE_ACTIVITY}
}

function deleteActivitySuccess() {
  return {type: types.DELETE_ACTIVITY_SUCCESS}
}

function deleteActivityRejected(error) {
  return {type: types.DELETE_ACTIVITY_REJECTED, payload: error}
}
