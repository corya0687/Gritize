export default function reducer(state={
  calendar: {
    activities: {
      activities: [],
      updating: false,
      updated: false,
      error: null
    }
  },
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
    case "FETCH_ACTIVITES": {
      return {
        ...state,
        calendar: {
          activities: {
            updating: true,
            updated: false
          }
        }
      }
    }
    case "FETCH_ACTIVITES_REJECTED": {
      return {
        ...state,
        fetching: false,
        calendar: {
          activities: {
            ...activities,
            updating: false,
            updated: false,
            error: action.payload
          }
        }
      }
    }
    case "FETCH_ACTIVITIES_SUCCESS": {
      return {
        ...state,
        calendar: {
          activities: {
            updating: false,
            updated: true,
            activities: action.payload.items
          }
        }
      }
    }
    case "CREATE_ACTIVITY": {
      return {
        ...state,
        calendar: {
          activities: {
            updating: true,
            updated: false
          }
        }
      }
    }
    case "CREATE_ACTIVITY_REJECTED": {
      return {
        ...state,
        calendar: {
          activities: {
            updated: false,
            updating: false,
            error: action.payload
          }
        }
      }
    }
    case "CREATE_ACTIVITY_SUCCESS": {
      return {
        ...state,
        calendar: {
          activities: {
            updating: false,
            updated: true,
            activities: action.payload
          }
        }
      }
    }
  }
  return state
}
