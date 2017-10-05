import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import registerServiceWorker from "./helpers/registerServiceWorker";
import store from "./store";
import { App } from "./components/index";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/" history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const NotFound = () => <h1>Invalid Route</h1>;

ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
