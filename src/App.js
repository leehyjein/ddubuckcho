import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Signup from "./Signup";
import PostDetail from "./components/PostDetail";
import PostWrite from "./pages/PostWrite";

export default function App(){

  return(
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={Signup}/>
    <Route path="/PostDetail" component={PostDetail}/>
    <Route path="/PostWrite" component={PostWrite}/>
  </Switch>
  </BrowserRouter>
  );
 
};