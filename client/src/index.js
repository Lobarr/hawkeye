import React from "react";
import { Provider } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import ReactDOM from "react-dom";
import registerServiceWorker from "./helpers/registerServiceWorker";
import { makeStore } from "./store/index";
import { Login, Signup, Dashboard } from "./views/index";
import { AuthRoute, ProtectedRoute } from "./components/index";
import "./index.css";
import "antd/dist/antd.css";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.store = makeStore();
  }
  render() {
    const { store } = this;

    return (
      <Provider store={store}>
        <Router basename="/" history={createBrowserHistory()}>
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/signup" component={Signup} />
            <AuthRoute exact path="/login" component={Login} />
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
