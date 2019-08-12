import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './rootReducer';

export default createStore(reducer, applyMiddleware(thunk, logger))