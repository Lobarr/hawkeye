import React, { Component } from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import registerServiceWorker from "./helpers/registerServiceWorker";
import store from "./store";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "antd/dist/antd.css";

import { Login, Signup, Dashboard } from "./views/index";

class Index extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/" history={createBrowserHistory()}>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                store.getState().general.access ? <Dashboard /> : <Login />}
            />
            <Route
              exact
              path="/signup"
              render={() =>
                !store.getState().general.access ? (
                  <Signup />
                ) : (
                  <Redirect to="/" />
                )}
            />
            <Route
              exact
              path="/login"
              render={() =>
                !store.getState().general.access ? (
                  <Login />
                ) : (
                  <Redirect to="/" />
                )}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

// const Protected = ({ component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       sessionStorage.getItem("hawkeye") ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )}
//   />
// );

const NotFound = () => <h1>Invalid Route</h1>;

ReactDOM.render(<Index />, document.getElementById("root"));
registerServiceWorker();
