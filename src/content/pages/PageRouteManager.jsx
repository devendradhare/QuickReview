import React from "react";
import Home from "./Home";
import Notes from "./Notes";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import ContributeQue from "./ContributeQue";

import { _useContext } from "../contextAPI/ContextProvider";

const routes = {
  Home: { component: Home },
  Notes: { component: Notes },
  Profile: { component: Profile, requiresAuth: true },
  Login: { component: Login },
  Signup: { component: Signup },
  ContributeQue: { component: ContributeQue, requiresAuth: true },
};

const PageRouteManager = () => {
  const { _route, _setRoute, isAuthenticated } = _useContext();

  const route = routes[_route];

  if (!route) return <div>Page Not Found</div>;
  if (route.requiresAuth && !isAuthenticated()) {
    // console.log("❤️");
    // _setRoute("Signup");
    // console.log("❤️❤️");

    return <Signup />;
  }

  const Component = route.component;
  return <Component />;
};

export default PageRouteManager;
