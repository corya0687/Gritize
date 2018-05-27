import GoogleAuth from './googleAuth';
import {CALENDAR_URI} from '../../../utils/utils'
import {handleResponse} from '../actionsHelpers'

class GoogleCalendar {

  static getCalendarList(token) {
    return fetch(`${CALENDAR_URI}/users/me/calendarList`, GoogleAuth.googleFetchConfig(token, 'GET')).then(response => response.json())
    .catch(errrror => {throw `Error ${error}`})
  }

  static createCalendar(token, id) {
    return fetch(`${CALENDAR_URI}/calendars`, GoogleAuth.googleFetchConfig(token, 'POST', {summary: `gritize_${id}`, time_zone: 'America/New_York'}))
    .then(response => response.json())
    .catch(err => {throw `Error ${error}`})
  }

  static getCalendar(token, calendarId) {
    return fetch(`${CALENDAR_URI}/calendars/${calendarId}`, GoogleAuth.googleFetchConfig(token, 'GET'))
    .then(response => response.json())
    .catch(err => {throw `Error ${error}`})
  }

  static createCalEvent(token, calendarId, gCalEvent){
    return fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, GoogleAuth.googleFetchConfig(token, 'POST', gCalEvent ))
    .then(response => response.json())
    .catch(error => {throw `Error ${error}`})
  }

  static getTodaysEvents(token, calendarId){
    let start = new Date();
    start.setHours(0,0,0,0);
    start = start.toISOString();

    let end = new Date();
    end.setHours(23,59,59,999);
    end = end.toISOString();

    const query = encodeURIComponent(`timeMin=${start}&timeMax=${end}`)
    return fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${query}`, GoogleAuth.googleFetchConfig(token, 'GET'))
    .then(response => response.json())
    .catch(error => {throw `Error ${error}`})
  }
}

export default GoogleCalendar
