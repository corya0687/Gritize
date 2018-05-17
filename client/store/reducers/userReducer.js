export default function reducer(state={
  user: {
    id: null,
    email: null,
    accessToken: null,
    calendar_id: null,
  },
  fetching: false,
  fetched: false,
  error: null,
  accessToken: null,
  calendarId: null,
}, action) {

  switch (action.type) {
    case "FETCH_USER": {
      return {...state, fetching: true}
    }
    case "FETCH_USER_REJECTED": {
      return {...state, fetching: true, error: action.payload}
    }
    case "FETCH_USER_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    }
  }
  return state
}
