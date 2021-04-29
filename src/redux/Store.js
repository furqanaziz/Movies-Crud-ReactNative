import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootsaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
  );

  sagaMiddleware.run(rootsaga);

export default store;  