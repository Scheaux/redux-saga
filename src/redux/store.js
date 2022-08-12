import { applyMiddleware, configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import searchReducer from './slices/search';
import serviceReducer from './slices/services';
import createSagaMiddleware from 'redux-saga';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    search: searchReducer,
    services: serviceReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(saga);

export default store;
