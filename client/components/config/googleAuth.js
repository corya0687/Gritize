import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '575839948568-54qmehmckop0f41o63ac8gcld5in2pdq.apps.googleusercontent.com',
  redirectUrl: 'com.gritize:/oauth2redirect/google',
  scopes: ['openid', 'profile']
};

export function signIn(){
    authorize(config).then(data => {
      console.log(data)
    findOrCreateUser(data)
    data.loggedIn = true
    this.setState({'currentUser': data})
  })
  .catch(err => console.log(err));
}

function findOrCreateUser(authData){
  fetch('http://192.168.43.214:3000/users/sign_in', { headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },method: 'POST', body: JSON.stringify(authData)})
  .then(resp => {console.log(resp)})
  .catch(err => console.log(err))
}
