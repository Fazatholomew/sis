import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension(),
);


const store = createStore(
  reducers, enhancers);

export default store