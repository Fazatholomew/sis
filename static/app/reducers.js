/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import authReducer from './containers/App/reducers/auth';
import temporaryHistoryReducer from './containers/App/reducers/temporaryHistory';
import entries from './containers/App/reducers/entries';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

const rootReducer = combineReducers({
  auth: authReducer,
  temporaryHistory: temporaryHistoryReducer,
  entries: entries,
});

const mergeWithRouterState = connectRouter(history);
export default mergeWithRouterState(rootReducer);
