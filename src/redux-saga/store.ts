import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { state } from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(state, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;
