import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_FOLDER_KEY } from '../constants'

function UserBox(props) {
  if (props.user.loading)
    return <div id="userBox">Loading...</div>

  function logout() {
    var defFolder = localStorage.getItem(DEFAULT_FOLDER_KEY)
    localStorage.clear()
    localStorage.setItem(DEFAULT_FOLDER_KEY, defFolder)
    window.location.href = '/'
  }

  return (
    <div id="userBox">
      {props.user.data.username}
      <Link className="link" to="/settings">Settings</Link>
      <span className="link" onClick={logout}>Logout</span>
    </div>
  )
}

export default UserBox