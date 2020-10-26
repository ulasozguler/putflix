import { TMDB_TOKEN, TMDB_API_BASE } from '../constants'

function req(path, params, cb) {
  params['api_key'] = TMDB_TOKEN
  fetch(
    TMDB_API_BASE + path + '?' + new URLSearchParams(params)
  )
    .then(response => response.json())
    .then(cb)
}

export function search(name, year, cb) {
  req(
    'search/movie',
    {
      'query': name,
      'year': year,
      'include_adult': false
    },
    (data) => { process_search(name, data, cb) }
  )
}

function process_search(name, data, cb) {
  if (data.total_results === 1)
    return cb(data.results[0])

  name = name.toUpperCase()
  var filtered = data.results.filter(
    item => {
      return (
        item.title.toUpperCase() === name ||
        item.original_title.toUpperCase() === name
      )
    }
  )
  // not found
  if (filtered.length === 0)
    return cb(null)

  // exact match
  if (filtered.length === 1)
    return cb(filtered[0])

  // multi result, choose most voted
  return cb(
    filtered.reduce(
      (a, b) => a.vote_count > b.vote_count ? a : b
    )
  )
}

export function getMovie(id, cb) {
  req(
    'movie/' + id,
    { 'append_to_response': 'videos' },
    cb
  )
}

export function getCast(id, cb) {
  req('movie/' + id + '/credits', {}, cb)
}