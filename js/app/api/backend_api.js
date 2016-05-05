import {fetchJson} from '../helpers/fetch_helper'

module.exports = {
  searchName: function (name) {
    return fetchJson('/api/lol/search/' + name.toLowerCase());
  },

  championImage: function (championId) {
    return fetchJson('/api/lol/champion/' + championId);
  }
}
