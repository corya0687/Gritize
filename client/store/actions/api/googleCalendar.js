import GoogleAuth from './googleAuth';
import {CALENDAR_URI} from '../../../utils/utils'
import GCalEvent from './googleCalEvent'
import {handleResponse} from '../actionsHelpers'

class GoogleCalendar {

  static getCalendarList(token) {
    console.log(GoogleAuth.googleFetchConfig(token, 'GET'))
    return fetch(`${CALENDAR_URI}/users/me/calendarList`, GoogleAuth.googleFetchConfig(token, 'GET')).then(response => response.json())
    .catch(err => error.json())
  }

  static createCalendar(token, id) {
    return fetch(`${CALENDAR_URI}/calendars`, GoogleAuth.googleFetchConfig(token, 'POST', {summary: `gritize_${id}`, time_zone: 'America/New_York'}))
    .then(response => response.json())
    .catch(err => error.json())
  }

  static getCalendar(token, calendarId) {
    return fetching(`${CALENDAR_URI}/calendars/${calendarId}`, GoogleAuth.googleFetchConfig(token, 'GET'))
    .then(response => response.json())
    .catch(err => error.json())
  }

  static addEvent(token, calendarId, gCalEvent){
    let data = gCalEvent;
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, GoogleAuth.googleFetchConfig(token, 'POST', data ))
    .then(handleResponse)
    .catch(error => console.log(error))
  }
}

export default GoogleCalendar
