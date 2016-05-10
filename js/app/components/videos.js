import React from 'react';
import api from '../api/backend_api.js';
import Video from './video.js';

var youtubeUrl = 'http://www.youtube.com/embed/'

const Videos = React.createClass({
  propTypes: {
    championId: React.PropTypes.number
  },

  getInitialState() {
    return {
      items: [],
      prevToken: '',
      nextToken: '',
      query: ''
    }
  },

  handleVideos(videoData) {
    const {items, nextPageToken, prevPageToken, query} = videoData;
    this.setState({items, nextToken: nextPageToken, prevToken: prevPageToken, query});
  },

  componentWillMount() {
    const {championId} = this.props;
    championId && api.searchVideos(championId).then(this.handleVideos)
  },

  previousPage() {
    const {prevToken, query} = this.state;
    api.getPage(prevToken, query).then(this.handleVideos)
  },

  nextPage() {
    const {nextToken, query} = this.state;
    api.getPage(nextToken, query).then(this.handleVideos)
  },

  render() {
    const {items, prevToken, nextToken} = this.state;
    var videos = items.length > 0 ? items.map((video, key) => {
      return (<Video src={youtubeUrl + video.id.videoId} key={key} />)
    }) : [];
    return (
      <div className="videos">
        {videos}
        { prevToken && <div className="left-button" onClick={this.previousPage} />}
        { nextToken && <div className="right-button" onClick={this.nextPage} />}
      </div>
    )
  }
})

module.exports = Videos
