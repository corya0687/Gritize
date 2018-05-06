import { authorize } from 'react-native-app-auth'
import { createCalendar } from './googleCalendar'

const backendLocalHost = 'http://10.0.0.52:3000'

export function googleFetchConfig(token, method, body){
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

export function backendFetchConfig(method, body){
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type':'application/json',
    },
    method: method,
    body: body ? JSON.stringify(body) : undefined
  }
}

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '575839948568-54qmehmckop0f41o63ac8gcld5in2pdq.apps.googleusercontent.com',
  redirectUrl: 'com.gritize:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/calendar']
};

export function signIn(){
  const stateScope = this
  authorize(config)
    .then(data => {
      stateScope.setState({"accessToken":data.accessToken})
      getProfileData(data)
        .then((response)=>{
          findOrCreateUser('POST', formatProfile(response))
            .then((userData)=>{
              if(!userData.calendar_id) {
                createCalendar(stateScope.state.accessToken, userData.id)
                  .then((newCal)=> {
                    userData.calendar_id = newCal.id
                    return updateUser(userData, userData.id)})
                    .then((newCalUser)=>{stateScope.setState({'currentUser': newCalUser})
                  })
              } else {
                stateScope.setState({'currentUser': userData})
              }
            })
        })
    })
    .catch(err => {console.log(err)});

    // //***offline version
    // this.setState({'currentUser': fakePlusProfile})
    // fakePlusProfile.loggedIn = true;
    // let data = formatProfile(fakePlusProfile)
    // eateUser(data)
}

function formatProfile(profile){
  return {
    email: profile.emails[0].value,
    first_name: profile.name.givenName,
    last_name: profile.name.familyName
  }
}

const getProfileData = (data) => {
  return fetch('https://www.googleapis.com/plus/v1/people/me', googleFetchConfig(data.accessToken, 'GET') )
  .then(response => response.json() )
  .catch(err => {console.log(err)} )
}

const findOrCreateUser = (method, body) =>{
  return fetch(`${backendLocalHost}/users/find_or_create`, backendFetchConfig(method, body))
  .then(response => response.json())
  .catch(error => console.log(error))
}

export function updateUser(body, id){
  return fetch(`${backendLocalHost}/users/${id}`,
   backendFetchConfig('PATCH', body))
  .then(response => response.json())
  .catch(error => console.log(error))
}


const fakeAuthResponse = {
  "accessToken":"ya29.GluoBX-TkqEKHUguRkcsPq4hgeU9MWwknSgKZ4u8Qi7IWFfJJApHbbPuqJI8_oOsC_M8GT0rkCxY30prXC4hCgbtF9R2oW_C2QHidfoXS7Oi058EXWSLw5JrnHnN",
  "accessTokenExpirationDate":"2018-04-25T09:22:30-0400",
  "additionalParameters": {},
  "idToken":"sdmfksadfsometoken",
  "refreshToken":"asdfkljasljdla",
  "tokenType":"Bearer",
  "first_name":"test",
  "last_name": "user",
  "email":'test_userslkdf2349ujnmlkjef@gmail.com'
}

const fakePlusProfile = {
  circles: 16,
  displayName:"Cory Adams",
  emails: [
    {value: "testgritizeuser23498@gmail.com", type: "account"}
  ],
  gender:"male",
  id:"101549658643592368386", image:{url:'https://lh4.googleusercontent.com/-19cZmLUmfUc/AAAAAAAAAAI/AAAAAAAAE-U/Hi984Y_rUSU/photo.jpg?sz=50'},
  name:{familyName: "Gritizeuser", givenName: "Faketest"},
  objectType:"person"
}
