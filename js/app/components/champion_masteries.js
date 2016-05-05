import React from 'react';
import ChampionMastery from './champion_mastery';

const ChampionMasteries = React.createClass({
  propTypes: {
    championMasteries: React.PropTypes.array
  },
  render() {
    return (
      <div>
        {
          this.props.championMasteries.map((mastery, key) => {
            return <ChampionMastery championMastery={mastery} key={key} />
          })
        }
      </div>
    );
  }
});

module.exports = ChampionMasteries
