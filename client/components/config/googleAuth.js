import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '575839948568-54qmehmckop0f41o63ac8gcld5in2pdq.apps.googleusercontent.com',
  redirectUrl: 'com.gritize:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email']
};

const fakeResponse = {
"accessToken":"ya29.GluoBX-TkqEKHUguRkcsPq4hgeU9MWwknSgKZ4u8Qi7IWFfJJApHbbPuqJI8_oOsC_M8GT0rkCxY30prXC4hCgbtF9R2oW_C2QHidfoXS7Oi058EXWSLw5JrnHnN"
"accessTokenExpirationDate":"2018-04-25T09:22:30-0400"
"additionalParameters":idToken:"sdmfksadfsometoken"
"loggedIn":true
"refreshToken":"asdfkljasljdla"
"tokenType":"Bearer",
"email":'corya0687@gmail.com'
}

export function signIn(){
  // authorize(config).then(data => {
    const data = fakeResponse;
    findOrCreateUser(data)
    data.loggedIn = true
    this.setState({'currentUser': data})
  // })
  // .catch(err => console.log(err));
}

function findOrCreateUser(authData){
  fetch('http://192.168.43.214:3000/users/client_auth', { headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },method: 'POST', body: JSON.stringify(authData)})
  .then(resp => {console.log(resp)})
  .catch(err => console.log(err))
}
