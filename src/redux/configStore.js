import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import User from './modules/user';
import Post from './modules/post';


const rootReducer = combineReducers({ User, Post });
const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);


const store = createStore(rootReducer, enhancer);

export default store;