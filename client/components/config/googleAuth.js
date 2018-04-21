import OAuthManager from 'react-native-oauth';

export function configureManager() {
  const manager = new OAuthManager('gritize')
  const config = {
    google: {
      callback_url: 'http://localhost/google',
      client_id: '575839948568-decaocv4pog0el9n2k6crjop8ue72s90.apps.googleusercontent.com',
      client_secret: 'ipeZu9C9bvkOpnPLs-eql6Wf',
      response_type: 'code',
      rawScopes: "true",
    }
  }
  manager.configure(config)
  return manager
}

export function signIn(googleManager){
  return googleManager.authorize('google',{scopes: 'https://www.googleapis.com/auth/calendar'})
  .then(data => {
    findOrCreateUser(data.response)
    this.setState({'currentUser': data.response})
  })
  .catch(err => console.log(err));
}

function findOrCreateUser(authData){
  fetch('http://localhost:3000/users/auth/google_oauth2/callback', { headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },method: 'POST', body: JSON.stringify(authData)})
  .then(resp => {console.log(resp)})
  .catch(err => console.log(err))
}
