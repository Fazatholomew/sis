import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../src/components/tabs';

describe('Tabs Component', () => {
	const data = {21: {name:'Jimmy', passenger:5}}
	const wrap = shallow(<Tabs data={data}/>).find('td');
	
	it('Tabs generates first data id as 1', () => {
		expect(wrap.at(0).text()).toBe('1');
	});
	
	it('Tabs generates second data name as JImmy', () => {
		expect(wrap.at(1).text()).toBe('Jimmy');
	});
	
	it('Tabs generates third data passenger as 5', () => {
		expect(wrap.at(2).text()).toBe('5');
	});
	
	
});