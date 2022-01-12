import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFile } from 'actions/file'
import { clearVideoData } from 'actions/videos'
import { humanFileSize } from 'utils/filesize'

class ExplorerBare extends Component {
  constructor(props) {
    super(props)
    this.file = this.props.file
    this.isExpanded = false
    if (!this.file) {
      this.file = {
        id: 0,
        file_type: 'FOLDER',
        name: 'Your Files'
      }
    }
  }

  isFolder() {
    return this.file.file_type === 'FOLDER'
  }

  isRoot() {
    return this.file.id === 0
  }

  isExpandable() {
    return this.isFolder() && !this.isRoot()
  }

  shouldFetchChildren() {
    return (
      this.isFolder() &&
      this.file.size !== 0 &&
      this.getChildren().length === 0
    )
  }

  expandFolder() {
    if (this.shouldFetchChildren()) {
      this.props.fetchFile(this.file.id, this.props.config)
      this.isExpanded = true
    } else {
      this.isExpanded = !this.isExpanded
      this.forceUpdate()
    }
  }

  clickHandler(e) {
    if (this.isFolder())
      this.expandFolder()
    e.stopPropagation()
  }

  getChildren() {
    var children = []
    if (this.props.data[this.file.id])
      children = this.props.data[this.file.id].files
    return children
  }

  selectionHandler(e) {
    if (this.props.selectHandler) {
      this.props.clearVideoData()
      this.props.selectHandler(this.file)
    }
    e.stopPropagation()
    window.location.href = '/putflix'
  }

  render() {
    if (this.isRoot() && !this.isExpanded) {
      this.expandFolder()
    }
    return (
      <div
        className="folder"
        onClick={this.clickHandler.bind(this)}
      >
        <div className={"name" + (this.isExpandable() && ' clickable')}>
          <span
            className="selector"
            onClick={this.selectionHandler.bind(this)}
          >
            {this.props.selectedId === this.file.id.toString() ?
              '[Selected]' : '[Select]'}
          </span>
          {this.file.name}
          {!this.isRoot() &&
            <span className="fileSize">
              ({humanFileSize(this.file.size)})
            </span>
          }
        </div>
        {this.isExpanded && (
          <div className="children">
            {this.getChildren().map(child => {
              return <Explorer
                key={child.id}
                file={child}
                config={this.props.config}
                selectHandler={this.props.selectHandler}
                selectedId={this.props.selectedId}
              />
            })}
          </div>
        )}
      </div>
    )
  }
}

// redux
const mapStateToProps = (state) => ({
  data: state.file
})

const mapDispatchToProps = {
  fetchFile,
  clearVideoData
}

const Explorer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExplorerBare)

export default Explorer