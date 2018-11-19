import React from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ data }) => {
	const id = Object.keys(data);
	const tabsData = id.map((tab, i) => (
		<tr key={i}>
			<td>{i + 1}</td>
			<td>{data[tab].name}</td>
			<td>{data[tab].passenger}</td>
		</tr>
	))
	return (
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th> 
					<th>Passanger</th>
				</tr>
			</thead>
			<tbody>
			{tabsData}
			</tbody>
		</table>
	);
};

Tabs.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Tabs;