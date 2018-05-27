import * as types from '../../utils/constants/actionTypes'
import GoogleAuth from './api/googleAuth'
import * as googleCalendar from './api/googleCalendar'
import {handleResponse} from './actionsHelpers'

//TODO proper error handling from api to actions
export function fetchUser() {
  return function (dispatch) {
    dispatch(fetchingUser())
    return GoogleAuth.signIn().then((response) => {
      let action = response.error ? fetchUserRejected : fetchUserSuccess
      dispatch(action(response))
    })
    .catch(error => {throw `Error: ${error}`})
  }
}

function fetchingUser(){
  return {type: types.FETCH_USER}
}

function fetchUserSuccess(payload) {
  return {type: types.FETCH_USER_SUCCESS, payload: payload}
}

function fetchUserRejected(error){
  return {type: types.FETCH_USER_REJECTED, payload: error}
}
