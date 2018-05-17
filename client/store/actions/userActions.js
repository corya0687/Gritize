import * as types from '../../utils/constants/actionTypes'
import GoogleAuth from './api/googleAuth'
import * as googleCalendar from './api/googleCalendar'
import {handleResponse} from './actionsHelpers'

//TODO proper error handling from api to actions
export function fetchUser() {
  return function (dispatch) {
    dispatch(fetchingUser())
    return GoogleAuth.signIn().then((response) => {
      let action = response.id ? fetchUserSuccess : fetchUserRejected
      dispatch(action(response))
    })
    .catch(error => dispatch(fetchUserRejected(error)))
  }
}

function fetchingUser(){
  return {type: types.FETCH_USER}
}

function fetchUserSuccess(payload) {
  return {type: types.FETCH_USER_SUCCESS, payload: payload}
}

function fetchUserRejected(payload){
  return {type: types.FETCH_USER_REJECTED, payload: payload}
}
