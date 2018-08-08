import {backendConfig, BACKENDHOST} from './backendConfig'

class User {
  static findOrCreateUser(method, body) {
    return fetch(`${BACKENDHOST}/users/find_or_create`, backendConfig(method, body))
    .then(response => response.json())
    .catch(error =>{console.log(error)})
  }

  static updateUser(body, id){
    return fetch(`${BACKENDHOST}/users/${id}`,
     backendConfig('PATCH', body))
    .then(response => response.json())
    .catch(error => console.log(error))
  }
}

export default User
