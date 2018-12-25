import { FETCH_ENTRIES, NEW_ENTRY } from '../actions/types';

const initialState = { entries: [], logged_in: false }

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTRIES:
            return {
                ...state, // props spanning, gets all k-v pairs into this JSON
                entries: action.payload // Set entries to the fetch payload, which is the list of entries
            }
        default:
            return state;
    }
};