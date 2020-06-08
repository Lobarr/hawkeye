import React from "react";
import videojs from "video.js";
import "./VideoPlayer.css";
import "video.js/dist/video-js.css";

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(
      this.videoNode,
      Object.assign({}, this.props, {
        fluid: true,
        preload: "auto",
        flash: { swf: require("videojs-swf/dist/video-js.swf") },
      })
    );
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="video-player-container">
        <div data-vjs-player className="video-player">
          <video
            autoPlay="muted"
            height="100%"
            width="100%"
            controls
            ref={(node) => (this.videoNode = node)}
            className="video-js vjs-default-skin vjs-big-play-centered"
          ></video>
        </div>
      </div>
    );
  }
}
