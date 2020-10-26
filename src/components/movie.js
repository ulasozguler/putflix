import React, { Component } from 'react'
import { search as tmdbSearch, getMovie, getCast } from 'lib/tmdb'
import {
  PUTIO_VIDEO_URL,
  TMDB_BACKDROP_BASE,
  TMDB_POSTER_BASE,
  TMDB_ACTOR_BASE,
  YOUTUBE_ICON,
  IMDB_ICON
} from '../constants'

class Movie extends Component {
  constructor(props) {
    super(props)
    this.movie = { found: false }
  }

  toggleCast() {
    this.isCastVisible = !this.isCastVisible
    this.forceUpdate()
  }

  parseTitle() {
    var title = this.props.data.name
    var removeChars = ['.', '(', ')', ':', '1080p']
    const regex = /(..*?)([0-9]{4})/gi

    var cleanTitle = title
    for (let rChar of removeChars)
      cleanTitle = cleanTitle.replaceAll(rChar, ' ')

    const match = cleanTitle.match(regex)
    if (!match)
      return false

    var foundTitle = match[0].trim().slice(0, -4).trim()
    var foundYear = match[0].trim().slice(-4).trim()
    return {
      'title': foundTitle,
      'year': foundYear
    }
  }

  applyCast(result) {
    this.movie = Object.assign(this.movie, result)
    this.movie.done = true
    this.forceUpdate()
  }

  applyMedia(result) {
    this.movie = Object.assign(this.movie, result)
    getCast(this.movie.id, this.applyCast.bind(this))
  }

  applyTMDB(result) {
    if (result)
      result.found = true
    else
      return
    this.movie = Object.assign(this.movie, result)
    getMovie(this.movie.id, this.applyMedia.bind(this))
  }

  componentDidMount() {
    this.movie = this.parseTitle()
    if (this.movie) {
      tmdbSearch(
        this.movie.title,
        this.movie.year,
        this.applyTMDB.bind(this)
      )
    }
  }

  render() {
    var data = this.props.data

    if (!this.movie.found || !this.movie.done) {
      return (
        <div className="movie">
          <h1>
            <a
              href={PUTIO_VIDEO_URL + this.props.data.id}
              target="_blank"
              rel="noreferrer"
            >
              {data.name}
            </a>
          </h1>
        </div>
      )
    }


    var backdropUrl = TMDB_BACKDROP_BASE +
      (this.movie.backdrop_path || this.movie.poster_path)

    return (
      <div
        className="movie"
        style={{ backgroundImage: "url(" + backdropUrl + ")" }}
      >
        <h1>
          <a
            href={PUTIO_VIDEO_URL + this.props.data.id}
            target="_blank"
            rel="noreferrer"
          >
            <span>{this.movie.title} ({this.movie.year})</span>
            {this.movie.title !== this.movie.original_title && (
              <span className="originalTitle">
                {this.movie.original_title}
              </span>
            )}
          </a>

          <div className="vote">
            <span>★ {this.movie.vote_average}</span>
          </div>

          <div className="genres">
            {this.movie.genres.map(genre => {
              return (
                <span className="genre" key={genre.id}>
                  {genre.name}
                </span>
              )
            })}
          </div>
        </h1>

        <img
          className="poster"
          alt={this.movie.name + ' Poster'}
          src={TMDB_POSTER_BASE + this.movie.poster_path}
        />

        <div className="overview">
          <span>{this.movie.overview}</span>
        </div>

        <div className="links">
          {
            this.movie.videos.results
              .filter(video => {
                return (
                  video.type === 'Trailer' &&
                  video.site === 'YouTube'
                )
              })
              .map(video => {
                return <a
                  className="youtube"
                  key={video.id}
                  href={"https://youtu.be/" + video.key}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={YOUTUBE_ICON} alt="Watch Trailer" />
                </a>
              })
          }

          {
            this.movie.imdb_id && (
              <a
                className="imdb"
                href={
                  "https://www.imdb.com/title/" +
                  this.movie.imdb_id + "/"
                }
                target="_blank"
                rel="noreferrer"
              >
                <img src={IMDB_ICON} alt="View on IMDb" />
              </a>
            )
          }
        </div>

        <div className="clearfix"></div>
        {this.movie.cast.length > 0 && (
          <div className={
            'cast' +
            (this.isCastVisible ? ' visible' : '')
          }>
            {this.movie.cast.slice(0, 5).map(actor => {
              return <div className="actor" key={actor.id}>
                {actor.profile_path &&
                  <img
                    src={TMDB_ACTOR_BASE + actor.profile_path}
                    alt={actor.name}
                  />
                }
                {actor.name}
              </div>
            })}
          </div>
        )}
        <div className="clearfix"></div>

        {this.movie.cast.length > 0 && (
          <div
            className="castToggle"
            onClick={this.toggleCast.bind(this)}
          >
            <span>{
              this.isCastVisible ?
                '⇑ Hide' :
                '⇓ Show'
            } Cast</span>
          </div>
        )}
      </div>
    )
  }
}

export default Movie