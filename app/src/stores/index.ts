import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './saga';
import reducers from './store';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagas.forEach(saga => sagaMiddleware.run(saga));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
