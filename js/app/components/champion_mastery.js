import React from 'react';
import api from '../api/backend_api.js';

const ChampionMastery = React.createClass({
  propTypes: {
    championMastery: React.PropTypes.obj
  },

  getInitialState() {
    return {
      championInfo: {}
    }
  },

  componentDidMount() {
    api.championImage()
  },

  render() {
    return (
      <div>
      </div>
    )
  }
});

module.exports = ChampionMastery;
