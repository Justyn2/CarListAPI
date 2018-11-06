import { applyMiddleware,combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import app from './Reducers/App';

const store = createStore(combineReducers({
  app
  }),
  applyMiddleware(thunk)
);
export default store;