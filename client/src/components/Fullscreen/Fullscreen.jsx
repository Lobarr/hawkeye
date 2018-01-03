import React from "react";
import { connect } from "react-redux";
import { MediaElement, VideoPLayer } from "../";
import { isEmpty } from "underscore";
import "./Fullscreen.css";

class Fullscreen extends React.Component {
  render() {
    if (!isEmpty(this.props.stream.selectedStream)) {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: "rtmp://184.72.239.149/vod&mp4:bigbuckbunny_1500.mp4",
            type: "rtmp/mp4"
          }
        ]
      };
      return (
        <div id="fullscreen">
          {/* <MediaElement
            id="player1"
            url={this.props.stream.selectedStream.url}
          /> */}
          {/* <iframe
            src="https://player.twitch.tv/?channel=olvap377"
            style={{ height: "100%", width: "100%" }}
            frameborder="0"
            scrolling="no"
            allowfullScreen="true"
          /> */}
          <VideoPLayer {...videoJsOptions} />
        </div>
      );
    } else {
      return (
        <div id="fullscreen-select">
          <h1>Select a stream...</h1>
        </div>
      );
    }
    // return (
    //   <iframe
    //     src="https://player.twitch.tv/?channel=olvap377"
    //     style={{ height: "100%", width: "100%" }}
    //     frameborder="0"
    //     scrolling="no"
    //     allowfullScreen="true"
    //   />
    // );
  }
}

const mapStateToProps = state => {
  return {
    stream: state.stream
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Fullscreen);
