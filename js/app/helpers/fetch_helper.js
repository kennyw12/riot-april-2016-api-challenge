require('isomorphic-fetch');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response;
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetchJson(url) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var options = {headers, method: 'GET'};
  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.status === 204 ? {} : response.json());
}

const fetchHelper = {
  fetchJson
};

module.exports = fetchHelper;
