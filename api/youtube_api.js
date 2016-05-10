var fetchHelper = require('../js/app/helpers/fetch_helper');

const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3';
const youtubeApiKey = 'AIzaSyDYR2riLrTe17C5204CWHy7dYb4sJypZGM';

module.exports = {
  searchYoutube(query, token) {
    return fetchHelper.fetchJson(`${youtubeApiBaseUrl}/search?q=${query + ' league of legends'}&key=${youtubeApiKey}&part=snippet&maxResults=6&type=video${token ? '&pageToken=' + token : ''}`)
  }
}
