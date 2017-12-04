import React from "react";
import { connect } from "react-redux";
import { MediaElement } from "../";
import { isEmpty } from "underscore";
import "./Fullscreen.css";

class Fullscreen extends React.Component {
  render() {
    // if (!isEmpty(this.props.stream.selectedStream)) {
    //   return (
    //     <div id="fullscreen">
    //       <MediaElement
    //         id="player1"
    //         url={this.props.stream.selectedStream.url}
    //       />
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div id="fullscreen-select">
    //       <h1>Select a stream...</h1>
    //     </div>
    //   );
    // }
    return (
      <iframe
        src="https://player.twitch.tv/?channel=olvap377"
        style={{ height: "100%", width: "100%" }}
        frameBorder="0"
        scrolling="no"
        allowfullScreen="true"
      />
    );
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
