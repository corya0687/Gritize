import { authorize } from 'react-native-app-auth'
import GoogleCalendar from './googleCalendar'
import {BACK_END_HOST} from '../../../utils/utils'

class GoogleAuth {

  static googleFetchConfig(token, method, body){
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
        "Authorization" : `Bearer ${token}`
      },
      method: method,
      body: body ? JSON.stringify(body) : undefined
    }
  }

  static backendFetchConfig(method, body){
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      method: method,
      body: body ? JSON.stringify(body) : undefined
    }
  }

  static config() {
    return {
      issuer: 'https://accounts.google.com',
      clientId: '575839948568-54qmehmckop0f41o63ac8gcld5in2pdq.apps.googleusercontent.com',
      redirectUrl: 'com.gritize:/oauth2redirect/google',
      scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar']
    }
  };

  static signIn(){
    return authorize(this.config())
      .then(data => {
        const accessToken = data.accessToken
        return this.getProfileData(data)
          .then((response)=>{
            // need to move error handling to actions and break these actions up
            return this.findOrCreateUser('POST', this.formatProfile(response))
              .then((userDataResponse)=>{
                const userData = userDataResponse;
                userData.accessToken = accessToken
                userData.calendarId = userData.calendar_id
                if(!userDataResponse.calendar_id) {
                  return GoogleCalendar.createCalendar(accessToken, userDataResponse.id)
                    .then((newCal)=> {
                      userDataResponse.calendarId = newCal.id
                      return this.updateUser(userDataResponse, userDataResponse.id)})
                      .then( newCalUser => newCalUser)
                } else {
                  return userData
                }
              })
              .catch(error => error);
          })
      })
      .catch(error => error);
  }

  static formatProfile(profile){
    return {
      email: profile.emails[0].value,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName
    }
  }

  static getProfileData(data) {
    return fetch('https://www.googleapis.com/plus/v1/people/me', this.googleFetchConfig(data.accessToken, 'GET') )
    .then(response => response.json() )
    .catch(error => error.json() )
  }

  static findOrCreateUser(method, body) {
    return fetch(`${BACK_END_HOST}/users/find_or_create`, this.backendFetchConfig(method, body))
    .then(response => response.json())
    .catch(error => error.json())
  }

  static updateUser(body, id){
    return fetch(`${BACK_END_HOST}/users/${id}`,
     this.backendFetchConfig('PATCH', body))
    .then(response => response.json())
    .catch(error => error.json())
  }
}

export default GoogleAuth;
