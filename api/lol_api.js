var fetchHelper = require('../js/app/helpers/fetch_helper');

var riotApiBase = 'https://na.api.pvp.net/';
var api_key = '5eb221fb-f3d2-4a7b-84f5-b29fadb587cd';

function summonerIdLookup(name) {
  return fetchHelper.fetchJson(`${riotApiBase}api/lol/na/v1.4/summoner/by-name/${name}?api_key=${api_key}`);
}

function masteryLookup(playerId, count) {
  return fetchHelper.fetchJson(`${riotApiBase}championmastery/location/NA1/player/${playerId}/${count ? 'top' : ''}champions?api_key=${api_key}${count ? '&count=' + count : ''}`);
}

function championLookup(championId, dataType) {
  return fetchHelper.fetchJson(`${riotApiBase}api/lol/static-data/na/v1.2/champion/${championId}?champData=${dataType}&api_key=${api_key}`);
}

module.exports = {
  summonerIdLookup,
  masteryLookup,
  championLookup
}
