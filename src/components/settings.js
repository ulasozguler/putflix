import React, { Component } from 'react'
import Explorer from 'components/explorer'
import { DEFAULT_FOLDER_KEY } from '../constants'

class Settings extends Component {

  getDefaultFolder() {
    return localStorage.getItem(DEFAULT_FOLDER_KEY)
  }

  selectHandler(file) {
    localStorage.setItem(DEFAULT_FOLDER_KEY, file.id)
    this.forceUpdate()
  }

  render() {
    return (
      <>
        <h3>Select a folder to browse:</h3>
        <Explorer
          config={{ fileType: "FOLDER" }}
          selectHandler={this.selectHandler.bind(this)}
          selectedId={this.getDefaultFolder()}
        />
      </>
    )
  }
}

export default Settings