import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "underscore";
import "./TwoByTwo.css";

class TwoByTwo extends React.Component {
  render() {
    if (!isEmpty(this.props.stream.selectedStream)) {
      return (
        <div id="twobytwo">
          <iframe
            className="stream"
            src="https://player.twitch.tv/?channel=olvap377"
            frameborder="0"
            scrolling="no"
            allowfullScreen="true"
          />
          <iframe
            className="stream"
            src="https://player.twitch.tv/?channel=olvap377"
            frameborder="0"
            scrolling="no"
            allowfullScreen="true"
          />
          <iframe
            className="stream"
            src="https://player.twitch.tv/?channel=olvap377"
            frameborder="0"
            scrolling="no"
            allowfullScreen="true"
          />
          <iframe
            className="stream"
            src="https://player.twitch.tv/?channel=olvap377"
            frameborder="0"
            scrolling="no"
            allowfullScreen="true"
          />
        </div>
      );
    }
    return (
      <div id="fullscreen-select">
        <h1>Select a stream...</h1>
      </div>
    );
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

const mapStateToProps = (state) => {
  return {
    stream: state.stream,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TwoByTwo);
