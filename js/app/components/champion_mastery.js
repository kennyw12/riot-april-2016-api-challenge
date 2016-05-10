import React from 'react';
import api from '../api/backend_api.js';

const championSquareImageUrl = 'http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/'

const ChampionMastery = React.createClass({
  propTypes: {
    championMastery: React.PropTypes.object,
    selected: React.PropTypes.bool,
    onClick: React.PropTypes.func
  },

  getInitialState() {
    return {
      championInfo: {}
    }
  },

  componentWillMount() {
    const {championMastery} = this.props;
    championMastery && Object.keys(championMastery).length > 0 &&
      api.championImage(championMastery.championId).then((imageData) => {
        Object.assign(imageData, {level: championMastery.championLevel, points: championMastery.championPoints})
        this.setState({championInfo: imageData});
    });
  },

  render() {
    const {championInfo} = this.state;
    const {selected, onClick} = this.props;
    const infoExists = Object.keys(championInfo).length > 0;
    return (
      <div className={`champion-mastery ${selected ? '' : 'side-mastery'}`} onClick={onClick}>
        {
          infoExists && <div>
            <div className="name">{championInfo.name}</div>
            <div className="champion-title">{championInfo.title}</div>
            <img src={`${championSquareImageUrl + championInfo.image.full}`} crossOrigin="anonymous"/>
            <div>
              <span style={{marginRight: '10px'}}>Lv. {championInfo.level}</span>
              <span>Points: {championInfo.points}</span>
            </div>
          </div>
        }
        {
          !infoExists && <div>
            <div className="empty-champion-slot" />
          </div>
        }
      </div>
    )
  }
});

module.exports = ChampionMastery;
