import action_types from 'actions'

const initialState = {
  loading: true,
  data: {}
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case action_types.FETCH_USER:
      return action.payload

    default:
      return state
  }
}

export default userReducer