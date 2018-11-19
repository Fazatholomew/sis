import configureStore from 'redux-mock-store';

import * as selectActions from '../../src/actions/peopleAction';

const mockStore = configureStore();
const store = mockStore();

describe('People Actions', () => {
	beforeEach(() => {
		store.clearActions();
	});
	
	it('add a new person', () => {
		const expectedActions = [{
		'payload': {200: {name: 'Jimmy', passenger: 5}},
		'type': 'ADD_PERSON',
      }];
	  store.dispatch(selectActions.addName({200: {name: 'Jimmy', passenger: 5}}));
	  expect(store.getActions()).toEqual(expectedActions);
	});
  
});