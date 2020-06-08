import React from "react";
import { connect } from "react-redux";
import { VideoPLayer } from "../index";
import { isEmpty } from "underscore";
import "./Fullscreen.css";

class Fullscreen extends React.Component {
  render() {
    const { selectedStream } = this.props.stream;
    if (!isEmpty(selectedStream)) {
      const videoJsOptions = {
        autoplay: true,
        controls: true,
        src: selectedStream.url,
      };
      return (
        <div id="fullscreen">
          <VideoPLayer {...videoJsOptions} />
        </div>
      );
    }

    return (
      <div id="fullscreen-select">
        <h1>Select a stream...</h1>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Fullscreen);
