import action_types from 'actions'

const initialState = {}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case action_types.FETCH_VIDEO:
      return {
        ...state,
        [action.payload.id]: action.payload
      }

    case action_types.CLEAR_VIDEO:
      return {}

    default:
      return state
  }
}

export default videoReducer