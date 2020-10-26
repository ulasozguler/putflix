import action_types from 'actions'
import putio from 'lib/putio'

export function fileFetched(fileId, data) {
  return {
    type: action_types.FETCH_FILE,
    payload: {
      fileId, data
    }
  }
}

export function fetchFile(fileId = 0, config = {}) {
  return dispatch => {
    return putio.Files.Query(fileId, config)
      .then(resp => {
        dispatch(fileFetched(fileId, resp.data))
      })
  }
}