import Immutable from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import sagas from './sagas';

const initialState = Immutable.Map();

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancer(applyMiddleware(thunk, sagaMiddleware));

const store = createStore (rootReducer, initialState, enhancer);
let sagaTask = sagaMiddleware.run(sagas);

export default store;