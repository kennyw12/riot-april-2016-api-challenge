import '../scss/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import api from '../api/backend_api.js';
import SummonerSearch from './summoner_search.js';
import ChampionMasteries from './champion_masteries.js';
import Info from './info.js';

const Application = React.createClass({
  getInitialState() {
    return {
      summonerName: '',
      championMasteries: [],
      searchResults: false,
      processing: false,
      page: 'masteries'
    };
  },

  setSummonerName(name) {
    this.setState({summonerName: name});
  },

  searchSummoner() {
    var {summonerName} = this.state;
    this.setState({championMasteries: [], processing: true})
    api.searchName(summonerName).then((response) => {
      this.setState({championMasteries: response, searchResults: true, processing: false});
    })
  },

  switchPage(page) {
    this.setState({page})
  },

  render() {
    const {summonerName, championMasteries, searchResults, processing, page} = this.state;
    return (
      <div>
        <SummonerSearch name={summonerName} searchResults={searchResults} page={page} switchPage={this.switchPage}
                        setSummonerName={this.setSummonerName} searchSummoner={this.searchSummoner} />
        {processing && <p className="loading">Looking up your champion masteries</p>}
        {page === 'masteries' && <ChampionMasteries championMasteries={championMasteries} />}
        {page === 'info' && <Info championMasteries={championMasteries} />}
      </div>
    )
  }
})

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
