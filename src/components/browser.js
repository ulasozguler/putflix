import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchVideos } from 'actions/videos'
import { DEFAULT_FOLDER_KEY } from '../constants'
import Movie from 'components/movie'


class BrowserBare extends Component {
  componentDidMount() {
    this.props.fetchVideos(this.getDefaultFolderId())
  }

  getDefaultFolderId() {
    return localStorage.getItem(DEFAULT_FOLDER_KEY)
  }

  getVideos() {
    if (Object.keys(this.props.data).length === 0)
      return false

    if (!this.props.data)
      return false

    return Object.values(this.props.data).sort(
      (a, b) => b.created_at.localeCompare(a.created_at)
    )
  }

  isFolderSet() {
    return !!localStorage.getItem(DEFAULT_FOLDER_KEY)
  }

  render() {
    if (!this.isFolderSet())
      return <Redirect to="/settings" />

    var videos = this.getVideos()

    if (!videos)
      return 'Loading...'

    return (
      <div id="moviesWrapper">
        {videos.map(video => {
          return <Movie key={video.id} data={video} />
        })}
      </div>
    )
  }
}

// redux
const mapStateToProps = (state) => ({
  data: state.video
})

const mapDispatchToProps = {
  fetchVideos
}

const Browser = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowserBare)

export default Browser