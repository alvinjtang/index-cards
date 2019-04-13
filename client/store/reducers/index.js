import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cards from './cardsReducer';
import collections from './collectionsReducer';

const reducer = combineReducers({ cards, collections });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);

export default store;
