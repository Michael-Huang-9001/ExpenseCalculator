const ADD_ENTRY = 'ADD_ENTRY';
const UPDATE_ENTRY = 'UPDATE_ENTRY';
const REMOVE_ENTRY = 'REMOVE_ENTRY';

const initialState = {
    entries: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ENTRY:
            // Adds the payload to tail of entries while spanning original entries
            return { entries: [...state.entries, action.payload] };
        case UPDATE_ENTRY:
            // Needs work
            return { entries: [] };
        case REMOVE_ENTRY:
            // Needs work
            return { entries: [] };
        default:
            return state;
    }
};

export default rootReducer;