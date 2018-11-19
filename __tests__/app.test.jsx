import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../src/App';
import HelloWorld from '../src/components/hello-world';
import Forms from '../src/components/forms';

const mockStore = configureStore();
const store = mockStore({
	names: {}
});

describe('App components mounted', () => {
	const wrap = mount(<App store={store}/>);
	
	it('Header mounted', () => {
		expect(wrap.find('.hello-world').exists()).toBe(true);
	});
	
	it('Forms mounted', () => {
		expect(wrap.find(Forms).exists()).toBe(true);
	});
	
	
	
});
