const nameReducer = (state={}, {type, payload}) => {
	let newState = {...state}
	switch(type){
		case 'ADD_PERSON':
			newState[payload.id] = {name: payload.name, passenger: payload.passenger};
			return newState;
		
		case 'ADD_PEOPLE': //later on ID should be there. Check the condition.
			payload.map(person => newState[person.passenger] = {name: person.name, passenger: person.passenger})
			return newState;
		default:
			return state
	}
}

export default nameReducer