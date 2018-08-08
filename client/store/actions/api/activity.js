import {backendConfig, BACKENDHOST} from './backendConfig'

class Activity {
  static createActivity(method, body) {
    return fetch(`${BACKENDHOST}/activities`, backendConfig(method, body))
    .then(response => response.json())
    .catch(error => error)
  }

  static getActivity(method, body, id) {
    return fetch(`${BACKENDHOST}/activities/${id}`, backendConfig(method, body))
    .then(response => response.json())
    .catch(error => error)
  }
}

export default Activity
