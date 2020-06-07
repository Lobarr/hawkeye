import "./index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./helpers/registerServiceWorker";
import { makeStore } from "./store/index";
import { Login, Signup, Dashboard } from "./views/index";
import { utils } from "./helpers/utils";

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

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      utils.isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      utils.isAuthenticated() === false ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const NotFound = () => <h1>Invalid Route</h1>;

ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
