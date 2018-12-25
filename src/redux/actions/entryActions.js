import { FETCH_ENTRIES, NEW_ENTRY } from '../actions/types';

const initialState = { entries: [], logged_in: false }

export default function fetchEntries() {
    return function (dispatch) {
        if (localStorage.getItem("token")) {
            fetch(`/api/entries`, {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then(res => {
                if (res.status !== 200) {
                    if (res.status === 403) {
                        localStorage.removeItem("token");
                    }
                }
                return res.json();
            }).then(json => dispatch({
                type: FETCH_ENTRIES,
                payload: json // json is a list of entries
            }));
        }
    }
};