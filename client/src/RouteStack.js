import React, { lazy } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import routes from "./routes";

import HomeScreen from "./screens/app/HomeScreen";
import LoginScreen from "./screens/app/LoginScreen";
const ConnectionDetailsScreen = lazy(() =>
  import("./screens/app/ConnectionDetailsScreen")
);
const ConnectionSummaryScreen = lazy(() =>
  import("./screens/app/ConnectionSummaryScreen")
);
const RealtimeScreen = lazy(() => import("./screens/app/RealtimeDataScreen"));
const MessageStatsScreen = lazy(() => import("./screens/app/MessageStatsScreen"));

const RouteStack = () => {
  const username = useSelector(state => state.auth.username);

  const PrivateRoute = ({component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props => username 
          ? <Component {...props} />
          : <Redirect to={{pathname: routes.LOGIN, state: {from: props.location}}} />}
      />
    )
  }

  return (
    <BrowserRouter>
    {username ? (
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute
          path={routes.HOME_SCREEN + "/:docid?"}
          component={HomeScreen}
        />
        <PrivateRoute
          path={routes.CONNECTION_DETAILS_SCREEN + "/:docid?"}
          component={ConnectionDetailsScreen}
        />
        <PrivateRoute
          path={routes.CONNECTION_SUMMARY_SCREEN + "/:docid?"}
          component={ConnectionSummaryScreen}
        />
        <PrivateRoute
          path={routes.REALTIME_SCREEN + "/:docid"}
          component={RealtimeScreen}
        />
        <PrivateRoute
          path={routes.MESSAGE_STATS_SCREEN}
          component={MessageStatsScreen}
        />      
      </Switch>
    ) : (
      <Route component={LoginScreen} />
    )}
    </BrowserRouter>
  );
};

export default RouteStack;

