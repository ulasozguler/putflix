import { combineReducers } from 'redux'
import userReducer from 'reducers/user'
import fileReducer from 'reducers/file'
import videoReducer from 'reducers/video'

export const reducers = combineReducers({
  user: userReducer,
  file: fileReducer,
  video: videoReducer
})