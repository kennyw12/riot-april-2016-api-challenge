import {fetchJson} from '../helpers/fetch_helper'

module.exports = {
  searchName(name) {
    return fetchJson(`/api/lol/search/${name.toLowerCase()}`);
  },

  championImage(championId) {
    return fetchJson(`/api/lol/champion/${championId}`);
  },

  searchVideos(championId) {
    return fetchJson(`/api/yt/champion_videos/${championId}`);
  },

  getPage(token, query) {
    return fetchJson(`/api/yt/get_videos/${query}/token/${token}`)
  },

  getData(id, type) {
    return fetchJson(`/api/lol/champion/${type}/data/${type}`)
  }
}
