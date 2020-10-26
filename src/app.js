import React, { Component } from "react"
import { connect } from "react-redux"
import UserBox from "components/user-box"
import { fetchUser } from "actions/user"
import Settings from "components/settings"
import Browser from "components/browser"
import { HashRouter as Router, Route, Link } from "react-router-dom"

class AppBare extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <Router basename="/">
        <div id="App">
          <div id="header">
            <Link to="/">
              <div id="logo" className="logoText logoLeft">
                PUTFLIX
              </div>
            </Link>
            <UserBox user={this.props.user} />
          </div>
          <Route exact path="/" component={Browser} />
          <Route exact path="/settings" component={Settings} />
        </div>
      </Router>
    )
  }
}

// redux
const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  fetchUser,
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppBare)

export default App
