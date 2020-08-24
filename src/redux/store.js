import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {schemaReducer} from './reducer/schema-reducer';
import thunk from 'redux-thunk';

const initialState = {}
  
const reducer = combineReducers({schemaReducer});


const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(reducer, initialState, composedEnhancers)

export default store
