import React from "react";
import QuestionsPage from "./QuestionsPage";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import ContributeQue from "./ContributeQue";
import PromptPage from "./PromptPage";

import { _useContext } from "../contextAPI/ContextProvider";

const routes = {
  QuestionsPage: { component: QuestionsPage },
  Profile: { component: Profile, requiresAuth: true },
  Login: { component: Login },
  Signup: { component: Signup },
  ContributeQue: { component: ContributeQue, requiresAuth: true },
  PromptPage: { component: PromptPage, requiresAuth: true },
};

const PageRouteManager = () => {
  const { _route, _setRoute, isAuthenticated } = _useContext();

  const route = routes[_route];

  if (!route) return <div>Page Not Found</div>;
  if (_route == "Login" || _route == "Signup") {
    if (isAuthenticated()) {
      console.log("❤️");
      _setRoute("QuestionsPage");
    }
  }
  // if (route.requiresAuth && !isAuthenticated()) {
  if (!isAuthenticated()) {
    // console.log("❤️");
    // _setRoute("Signup");
    // console.log("❤️❤️");
    if (_route == "Signup") return <Signup />;
    return <Login />;
  }

  const Component = route.component;
  return <Component />;
};

export default PageRouteManager;
