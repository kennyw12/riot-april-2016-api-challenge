import {fetchJson} from '../helpers/fetch_helper'

module.exports = {
  searchName(name) {
    return fetchJson(`/api/lol/search/${name.toLowerCase()}`);
  },

  searchVideos(championId) {
    return fetchJson(`/api/yt/champion_videos/${championId}`);
  },

  getPage(token, query) {
    return fetchJson(`/api/yt/get_videos/${query}/token/${token}`)
  },

  getData(id, type) {
    return fetchJson(`/api/lol/champion/${id}/data/${type}`)
  }
}
