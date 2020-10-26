class OAuth2 {
  constructor(config) {
    this.config = config
    this._state_key = 'oauth2_state'
    this._access_token_key = 'oauth2_access_token'
  }

  isLoggedIn() {
    return localStorage.getItem(this._access_token_key)
  }

  getToken() {
    return localStorage.getItem(this._access_token_key)
  }

  _getState() {
    var state = localStorage.getItem(this._state_key)
    if (state === null) {
      state = Math.random().toString(32).substring(2)
      localStorage.setItem(this._state_key, state)
    }
    return state
  }

  getAuthUrl(response_type = 'token') {
    var params = new URLSearchParams({
      'response_type': response_type,
      'client_id': this.config.client_id,
      'state': this._getState()
    })

    return this.config.auth_url + '?' + params.toString()
  }

  handleCallback(cb) {
    // check state existence and match
    var params = new URLSearchParams(window.location.search)
    if (params.get('state') === null)
      return false

    // return access_token
    var hashParams = new URLSearchParams(window.location.hash)
    var token = hashParams.get('access_token')
    localStorage.setItem(this._access_token_key, token)
    cb()
    return true
  }
}

export default OAuth2