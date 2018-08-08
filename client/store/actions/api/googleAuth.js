import { authorize } from 'react-native-app-auth'
import GoogleCalendar from './googleCalendar'
import User from './user'

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
            return User.findOrCreateUser('POST', this.formatProfile(response))
              .then((userDataResponse)=>{
                const userData = userDataResponse
                userData.accessToken = accessToken
                userData.calendar_id = userDataResponse.calendar_id
                if(!userData.calendar_id) {
                  return GoogleCalendar.createCalendar(accessToken, userDataResponse.id)
                    .then((newCal)=> {
                      userData.calendar_id = newCal.id
                      return User.updateUser(userData, userData.id)})
                      .then( newCalUser => newCalUser)
                      .catch(error => error);
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
    .catch(error => error )
  }
}

export default GoogleAuth;
