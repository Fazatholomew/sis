const apiReducer = (state = {isFetching: false}, {type, payload}) => {
	switch(type){
		case 'GET_NAMES':
			const newState = {...state};
			newState[payload.timestamp] = {loadTime: payload.loadTime, data: payload.data};
			return newState
		case 'SOME_ERROR':
			console.log('Error: ' + payload)
			return state
		default:
			return state
	}
}

export default apiReducer