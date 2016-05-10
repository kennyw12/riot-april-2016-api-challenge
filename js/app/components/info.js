import React from 'react';
import api from '../api/backend_api.js';

const Info = React.createClass({
  propTypes: {
    championMasteries: React.PropTypes.array
  },

  getInitialState() {
    return {
      info: [],
      sortBy: 'total',
      ascending: false,
      loading: false,
      tooltip: false
    }
  },

  componentWillMount() {
    const {championMasteries} = this.props;
    var tags = {};
    this.setState({loading: true});
    var promises = championMasteries.map((mastery) => {
      return api.getData(mastery.championId, 'tags').then((tagData) => {
        tagData.tags.map((tag) => {
          if (tags[tag]) {
            tags[tag].points = tags[tag].points + mastery.championPoints;
            tags[tag].count++;
            tags[tag].champions.push(tagData.name)
          } else {
            tags[tag] = {};
            tags[tag].points = mastery.championPoints;
            tags[tag].count = 1;
            tags[tag].champions = [tagData.name]
          }
        })
      })
    })
    Promise.all(promises).then(() => {
      var tagArray = [];
      Object.keys(tags).map((tag) => {
        tags[tag].tag = tag
        tagArray.push(tags[tag])
      })
      this.setState({info: tagArray, loading: false})
    })
  },

  sortByRole() {
    var {sortBy, ascending} = this.state;
    this.setState({
      sortBy: 'role',
      ascending: sortBy !== 'role' || !ascending
    })
  },

  sortByTotal() {
    var {sortBy, ascending} = this.state;
    this.setState({
      sortBy: 'total',
      ascending: sortBy !== 'total' || !ascending
    })
  },

  sortByAverage() {
    var {sortBy, ascending} = this.state;
    this.setState({
      sortBy: 'average',
      ascending: sortBy !== 'average' || !ascending
    })
  },

  showTooltip() {
    this.setState({tooltip: true});
  },

  hideTooltip() {
    this.setState({tooltip: false});
  },

  render() {
    const {info, sortBy, ascending, loading, tooltip} = this.state;
    var sortedTags = info.sort((tag1, tag2) => {
      if (sortBy === 'total') { return tag2.points - tag1.points; }
      if (sortBy === 'average') { return tag2.points/tag2.count - tag1.points/tag1.count; }
      if (sortBy === 'role') { return tag1.tag.localeCompare(tag2.tag); }
      return 0;
    })
    if (ascending) {
      sortedTags = sortedTags.reverse();
    }
    var style = {marginRight: '10px'};
    var upArrow = <span className="glyphicon glyphicon-chevron-up" style={style} />;
    var downArrow = <span className="glyphicon glyphicon-chevron-down" style={style} />;
    var tips = tooltip && <span>Champions sorted by largest influence in point totals.</span>
    return (
      <table className={`table table-hover${loading ? ' loading' : ''}`}>
        <thead>
          <tr>
            <th onClick={this.sortByRole}>
              {sortBy === 'role' && ascending && upArrow}
              {sortBy === 'role' && !ascending && downArrow}
              Role
            </th>
            <th onClick={this.sortByTotal}>
              {sortBy === 'total' && ascending && upArrow}
              {sortBy === 'total' && !ascending && downArrow}
              Total Points
            </th>
            <th onClick={this.sortByAverage}>
              {sortBy === 'average' && ascending && upArrow}
              {sortBy === 'average' && !ascending && downArrow}
              Average Points
            </th>
            <th>
              Champions
              <span className="glyphicon glyphicon-info-sign" style={{marginLeft: '20px', marginRight: '20px'}} onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}/>
              {tips}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTags.length > 0 && sortedTags.map((tag, key) => {
            return (
              <tr key={key} >
                <td>{tag.tag}</td>
                <td>{tag.points}</td>
                <td>{tag.points / tag.count}</td>
                <td>{tag.champions.join(' | ')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
})

module.exports = Info;
