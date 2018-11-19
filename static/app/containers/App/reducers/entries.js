const entriesReducer = (state={offers: {}, requests: {}, users: {}}, {type, payload}) => {
	let newState = {...state}
	switch(type){
		case 'SAVE_ENTRIES':
			newState.offers = payload.offers;
			newState.requests = payload.requests;
			newState.users = payload.users;
			return newState;
		
		default:
			return state
	}
}

export default entriesReducer