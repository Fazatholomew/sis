import React from 'react';
import { shallow } from 'enzyme';

import Dummie from '../src/components/dummie-result';

describe('Dummie Component', () => {
	const wrap = shallow(<Dummie payload='Dumb'/>);
	
	it('Dummie shows This is dumb', () => {
		expect(wrap.text()).toBe('Dumb');
	});
});