import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "underscore";
import { SelectStreamPlaceholder, VideoPLayer } from "../index";
import "./TwoByTwo.css";

class TwoByTwo extends React.Component {
  renderSteams() {
    const renderedStreams = [];
    const { stream } = this.props;

    for (let i = 0; i < 4; i++) {
      if (stream.streams && stream.streams.length > i) {
        renderedStreams.push(
          <div className="stream" key={i}>
            <VideoPLayer src={stream.streams[i].url} />
          </div>
        );
      } else {
        renderedStreams.push(
          <div className="stream" key={i}>
            <div className="empty-slot">
              <p>No Stream to Preview</p>
            </div>
          </div>
        );
      }
    }

    return renderedStreams;
  }

  render() {
    const { stream } = this.props;
    if (!isEmpty(stream.streams)) {
      return <div id="twobytwo">{this.renderSteams()}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(TwoByTwo);
