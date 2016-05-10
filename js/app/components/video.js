import React from 'react';

const Video = React.createClass({
  propTypes: {
    src: React.PropTypes.string
  },

  getInitialState() {
    return {loading: true};
  },

  finishLoad() {
    this.setState({loading: false})
  },

  render() {
    const {loading} = this.state;
    return (
      <div className={`video ${loading ? 'loading' : ''}`}>
        <iframe src={this.props.src} height="300" width="600" onLoad={this.finishLoad} className={loading ? 'hide' : ''}/>
      </div>
    )
  }
})

module.exports = Video;
