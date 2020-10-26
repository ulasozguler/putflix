import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './style/index.css'
import App from './app'
import OAuth2 from 'lib/oauth2'
import { PUTIO_AUTH_URL, PUTIO_CLIENT_ID } from './constants'
import putio from 'lib/putio'
import Homepage from 'components/homepage'

const oauth2 = new OAuth2({
  'client_id': PUTIO_CLIENT_ID,
  'auth_url': PUTIO_AUTH_URL
})

if (oauth2.isLoggedIn())
  putio.setToken(oauth2.getToken())

oauth2.handleCallback(() => window.location.href = '/putflix')

render(
  <Provider store={store}>
    {oauth2.isLoggedIn()
      ? (
        <App />
      ) : (
        <Homepage authUrl={oauth2.getAuthUrl()} />
      )}
  </Provider>,
  document.getElementById('root')
)