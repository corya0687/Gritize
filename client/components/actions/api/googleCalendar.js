import * as googleAuth from './googleAuth';

export const uri = 'https://www.googleapis.com/calendar/v3'

export function getCaldendarList(token) {
  return fetch(`${uri}/users/me/calendarList`, googleAuth.googleFetchConfig(token, 'GET')).then(response => {console.log(response)})
}

export function createCalendar(token, id) {
  return fetch(`${uri}/calendars`, googleAuth.googleFetchConfig(token, 'POST', {summary: `gritize_${id}`, time_zone: 'America/New_York'}))
  .then(response => response.json())
}

export function addEvent(calendarId, eventText){

}

// export function getCalendar(token, id) {
//   return fetch(`${uri}/calendars/calendarId`, fetchConfig(token,'GET'))
//   .then(response => {console.log(response)})
// }
