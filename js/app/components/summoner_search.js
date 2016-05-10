import React from 'react';

const SummonerSearch = React.createClass({
  propTypes: {
    summonerName: React.PropTypes.string,
    searchSummoner: React.PropTypes.func,
    setSummonerName: React.PropTypes.func,
    searchResults: React.PropTypes.bool,
    page: React.PropTypes.string,
    switchPage: React.PropTypes.func
  },

  searchSummoner() {
    this.props.searchSummoner();
  },

  change(e) {
    if (e.key === 'Enter') {
      this.searchSummoner();
    } else {
      this.props.setSummonerName(e.target.value);
    }
  },

  page() {
    const {page, switchPage} = this.props;
    if (page === 'info') {
      switchPage('masteries')
    } else {
      switchPage('info')
    }
  },

  render() {
    const {summonerName, searchResults, page} = this.props;
    return (
      <div className={`search-wrapper ${searchResults ? 'header' : ''}`}>
        <div className="search">
          <div className="title">
            <h3>Master Your Champions</h3>
          </div>
          {searchResults && <span style={{color: 'white', paddingRight: '10px'}} >Master Your Champion </span>}
          <input type="text" placeholder="Summoner Name" value={summonerName} onKeyUp={this.change} />
          <button onClick={this.searchSummoner}>
            <i className="glyphicon glyphicon-search" />
          </button>
          {searchResults && <span className="nav" onClick={this.page}>{page}</span>}
        </div>
      </div>
    )
  }
});

module.exports = SummonerSearch;
