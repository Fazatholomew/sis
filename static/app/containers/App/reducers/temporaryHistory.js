function temporaryHistory(state = { history: [] }, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'NAVIGATE':
      newState.history.push(action.payload);
      return newState;
    default:
      return state;
  }
}

export default temporaryHistory;
