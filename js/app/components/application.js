import '../scss/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import api from '../api/backend_api.js';
import SummonerSearch from './summoner_search.js';
import ChampionMasteries from './champion_masteries.js';

const Application = React.createClass({
  getInitialState() {
    return {
      summonerName: '',
      championMasteries: []
    };
  },

  setSummonerName(name) {
    this.setState({summonerName: name});
  },

  searchSummoner() {
    var {summonerName} = this.state;
    api.searchName(summonerName).then((response) => {
      this.setState({championMasteries: response});
    })
  },

  render() {
    const {summonerName, championMasteries} = this.state;
    return (
      <div>
        <SummonerSearch name={summonerName}
                        setSummonerName={this.setSummonerName}
                        searchSummoner={this.searchSummoner} />
        <ChampionMasteries championMasteries={championMasteries} />
      </div>
    )
  }
})

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
