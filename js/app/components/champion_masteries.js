import React from 'react';
import ChampionMastery from './champion_mastery';
import Videos from './videos';

const ChampionMasteries = React.createClass({
  propTypes: {
    championMasteries: React.PropTypes.array
  },

  getInitialState() {
    return {
      selected: 0
    }
  },

  change(e) {
    this.setState({selected: e.target.value})
  },

  previousChampion() {
    this.setState({selected: Math.max(0, this.state.selected - 1)})
  },

  nextChampion() {
    this.setState({selected: Math.min(this.props.championMasteries.length - 1, this.state.selected + 1)})
  },

  render() {
    const {championMasteries} = this.props;
    const {selected} = this.state;
    const currentMastery = championMasteries.length > 0 ? <ChampionMastery championMastery={championMasteries[selected]} selected={true} key={selected} index={selected} /> : <ChampionMastery/>;
    const prevMastery = selected - 1 >= 0 ? <ChampionMastery championMastery={championMasteries[selected - 1]} selected={false} onClick={this.previousChampion} key={selected - 1} index={selected - 1} /> : <ChampionMastery />;
    const nextMastery = selected + 1 < championMasteries.length ? <ChampionMastery championMastery={championMasteries[selected + 1]} selected={false} onClick={this.nextChampion} key={selected + 1} index={selected + 1} /> : <ChampionMastery />;
    return (
      <div className="champion-masteries">
        {
          championMasteries.length > 0 && (
            <div>
              <div className="champion-display">
                {prevMastery}
                {currentMastery}
                {nextMastery}
              </div>
              <input className="slider" type="range" min="0" max={championMasteries.length} onInput={this.change} value={selected} />
              <br/>
              <Videos championId={championMasteries[selected].championId} key={selected} />
            </div>
          )
        }
      </div>
    );
  }
});

module.exports = ChampionMasteries
