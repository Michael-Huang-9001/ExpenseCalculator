import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const initial_state = {};
const middleware = [thunk];

const store = createStore(rootReducer, initial_state, applyMiddleware(...middleware));

export default store;