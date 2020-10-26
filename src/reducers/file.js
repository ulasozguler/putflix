import action_types from 'actions'

const initialState = {}

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case action_types.FETCH_FILE:
      return {
        ...state,
        [action.payload.fileId]: {
          ...action.payload.data.parent,
          files: action.payload.data.files,
          file_count: action.payload.data.total
        }
      }

    default:
      return state
  }
}

export default fileReducer