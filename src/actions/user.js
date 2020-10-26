import action_types from 'actions'
import putio from 'lib/putio'

export function userFetched(data) {
  return {
    type: action_types.FETCH_USER,
    payload: {
      data,
      loading: false
    }
  }
}

export function fetchUser() {
  return dispatch => {
    return putio.User.Info()
      .then(resp => {
        dispatch(userFetched(resp.data.info))
      })
  }
}