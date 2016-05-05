import React from 'react';

const SummonerSearch = React.createClass({
  propTypes: {
    summonerName: React.PropTypes.string,
    searchSummoner: React.PropTypes.func,
    setSummonerName: React.PropTypes.func
  },

  change(e) {
    if (e.key === 'Enter') {
      this.props.searchSummoner();
    } else {
      this.props.setSummonerName(e.target.value);
    }
  },

  render() {
    const {summonerName, searchSummoner} = this.props;
    return (
      <div className="search-wrapper">
        <div className="search">
          <h3>Master Your Champions</h3>
          <input type="text" placeholder="Summoner Name" value={summonerName} onKeyUp={this.change} />
          <button onClick={searchSummoner}>
            <i className="glyphicon glyphicon-search" />
          </button>
        </div>
      </div>
    )
  }
});

module.exports = SummonerSearch;
