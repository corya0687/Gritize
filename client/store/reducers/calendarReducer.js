export default function reducer(state={
  calendar: {},
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_CALENDAR": {
      return {...state, fetching: true}
    }
    case "FETCH_CALENDAR_REJECTED": {
      return {...state, fetching: true, error: action.payload}
    }
    case "FETCH_CALENDAR_SUCCESS": {
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
