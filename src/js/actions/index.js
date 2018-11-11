//const addEntry = (entry) => ({ type: "ADD_ENTRY", payload: entry });
const removeEntry = (entry) => ({ type: "REMOVE_ENTRY", payload: entry });
const updateEntry = (entry) => ({ type: "UPDATE_ENTRY", payload: entry });

export const addEntry = (entry) => ({ type: "ADD_ENTRY", payload: entry });