import React from 'react'

function Homepage(props) {
  return (
    <div id="home">
      <div id="logo" className="logoText">PUTFLIX</div>
      Putflix lists movies in your Put.io account with
      relevant information like plot and categories.
      <br />
      <a id="connectPutio" href={props.authUrl}>Connect with Put.io</a>
    </div>
  )
}

export default Homepage