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
      ascending: false
    }
  },

  componentWillMount() {
    const {championMasteries} = this.props;
    var tags = {};
    championMasteries.forEach((mastery) => {
      api.getData(mastery.championId, 'tags').then((tagData) => {
        tagData.tags.forEach((tag) => {
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
    var tagArray = [];
    Object.keys(tags).forEach((tag) => {
      tagArray.push(Object.assign(tags[tag], {tag}))
    })
    this.setState({info: tagArray});
  },

  sortByRole() {
    var {sortby, ascending} = this.state;
    this.setState({
      sortby: 'role',
      ascending: sortby !== 'role' || !ascending
    })
  },

  sortByTotal() {
    var {sortby, ascending} = this.state;
    this.setState({
      sortby: 'total',
      ascending: sortby !== 'total' || !ascending
    })
  },

  sortByAverage() {
    var {sortby, ascending} = this.state;
    this.setState({
      sortby: 'average',
      ascending: sortby !== 'average' || !ascending
    })
  },

  render() {
    const {info, sortBy, ascending} = this.state;
    var sortedTags = info.sort((tag1, tag2) => {
      if (sortBy === 'total') { return tag1.points - tag2.points; }
      if (sortBy === 'average') { return tag1.points/tag1.count - tag2.points/tag2.count; }
      if (sortBy === 'role') { return tag1.tag.localeCompare(tag2.tag); }
      return 0;
    })
    if (ascending) {
      sortedTags = sortedTags.reverse();
    }
    var style = {marginRight: '20px'};
    var upArrow = <span className="glyphicon glyphicon-chevron-up" style={style} />;
    var downArrow = <span className="glyphicon glyphicon-chevron-down" style={style} />;
    return (
      <table className="table table-hover">
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
              {sortBy === 'date' && ascending && upArrow}
              {sortBy === 'date' && !ascending && downArrow}
              Average Points
            </th>
            <th>Champions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTags.length > 0 && sortedTags.map((tag, key) => {
            return (
              <tr key={key} >
                <th>{tag.tag}</th>
                <th>{tag.points}</th>
                <th>{tag.points / tag.count}</th>
                <th>{tag.champions.join(' | ')}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
})

module.exports = Info;
