import React from "react";
import "hls.js";
import "mediaelement";
import "mediaelement/build/mediaelementplayer.min.css";
import "mediaelement/build/mediaelement-flash-video.swf";

export default class MediaElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  success(media, node, instance) {
    // Your action when media was successfully loaded
    console.log("success playing video", media, node, instance);
  }

  error(media) {
    // Your action when media had an error loading
    console.log("error playing video", media);
  }

  render() {
    const mediaHtml = `<video id="${
      this.props.id
    }" controls="controls" preload="auto" width="100%" height="100%">
					<source src="${this.props.url}" type="video/rtmp" />
				</video>`;

    return <div dangerouslySetInnerHTML={{ __html: mediaHtml }} />;
  }

  componentDidMount() {
    const { MediaElementPlayer } = global;

    if (!MediaElementPlayer) {
      return;
    }

    const options = {
      pluginPath: "./build/static/media/",
      success: (media, node, instance) => this.success(media, node, instance),
      error: (media, node) => this.error(media, node)
    };

    this.setState({ player: new MediaElementPlayer(this.props.id, options) });
  }

  componentWillUnmount() {
    if (this.state.player) {
      this.state.player.remove();
      this.setState({ player: null });
    }
  }
}
