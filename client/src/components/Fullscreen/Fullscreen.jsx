import React from "react";
import { connect } from "react-redux";
import { VideoPLayer, SelectStreamPlaceholder } from "../index";
import { isEmpty } from "underscore";
import "./Fullscreen.css";

class Fullscreen extends React.Component {
  render() {
    const { selectedStream } = this.props.stream;
    if (!isEmpty(selectedStream)) {
      const videoJsOptions = {
        src: selectedStream.url,
      };
      return (
        <div id="fullscreen">
          <VideoPLayer {...videoJsOptions} />
        </div>
      );
    }

    return <SelectStreamPlaceholder />;
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
