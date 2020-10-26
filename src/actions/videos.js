import action_types from 'actions'
import putio from 'lib/putio'

export function videosFetched(video) {
  return {
    type: action_types.FETCH_VIDEO,
    payload: video
  }
}

export function clearVideoData() {
  return {
    type: action_types.CLEAR_VIDEO
  }
}

export function fetchVideos(folderId) {
  return dispatch => {
    return putio.recursiveVideos(folderId, (video) => {
      dispatch(videosFetched(video))
    })
  }
}