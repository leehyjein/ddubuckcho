import logo from './logo.svg';
import React from 'react';
import {Route} from "react-router-dom"
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import './App.css';

import MainPage from "./page/MainPage";
import Login from "./page/Login";
import Signup from "./page/Signup";
import PostWrite from './page/PostWrite';


import Header from './commponents/Header';


function App() {
  return (
    <div >
      <Header></Header>
      <ConnectedRouter  history={history}>
          <Route path="/" exact component={MainPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
          <Route path="/write" exact component={PostWrite}/>
        </ConnectedRouter>
    </div>
  );
}

export default App;
