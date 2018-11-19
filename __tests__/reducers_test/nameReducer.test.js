import selectReducer from '../../src/reducers/nameReducer';
import { addName } from '../../src/actions/peopleAction';

describe('Name Reducer', () => {
  test('Return state with new name', () => {
    const action = { type: 'ADD_PERSON', payload: {id: 200, name: 'Jimmy', passenger: '20'} };
    const expectedState = {200: {name: 'Jimmy', passenger: '20'}};

    expect(selectReducer({}, action)).toEqual(expectedState);
  });
});