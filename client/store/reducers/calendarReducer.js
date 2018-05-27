export default function reducer(state={
  calendar: {
    events: {
      events: [],
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
    case "FETCH_EVENTS": {
      return {
        ...state,
        calendar: {
          events: {
            updating: true,
            updated: false
          }
        }
      }
    }
    case "FETCH_EVENTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        calendar: {
          events: {
            ...events,
            updating: false,
            updated: false,
            error: action.payload
          }
        }
      }
    }
    case "FETCH_EVENTS_SUCCESS": {
      return {
        ...state,
        calendar: {
          events: {
            updating: false,
            updated: true,
            events: action.payload.items
          }
        }
      }
    }
    case "CREATE_EVENT": {
      return {
        ...state,
        calendar: {
          events: {
            updating: true,
            updated: false
          }
        }
      }
    }
    case "CREATE_EVENT_REJECTED": {
      return {
        ...state,
        calendar: {
          events: {
            updated: false,
            updating: false,
            error: action.payload
          }
        }
      }
    }
    case "CREATE_EVENT_SUCCESS": {
      return {
        ...state,
        calendar: {
          events: {
            updating: false,
            updated: true,
            events: action.payload
          }
        }
      }
    }
  }
  return state
}
