import axios from 'axios';

export const getNames =  () => {
	return (dispatch) => { axios.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const json = response.data;
				const names = json.map(data => {return {name: data.name, passenger: data.id}})
				const data = {timestamp: 2000, loadTime: 1, data: names};
				dispatch( {type: 'ADD_PEOPLE', payload: names});
				dispatch( {type: 'GET_NAMES', payload: data} );
			}).catch(err => dispatch({ type: 'SOME_ERROR', err }))
	}
}