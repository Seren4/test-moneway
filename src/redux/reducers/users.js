import {RESET_TRANSACTIONS, FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, FETCH_TRANSACTIONS_SUCCESS, EDIT_USERS_SUCCESS} from '../actionTypes';

const initialState = {
    users: [],
    transactions: [],
    pending: false,
    error: null
};


export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.payload
            };
        case EDIT_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.payload
            };
        case RESET_TRANSACTIONS:
            return {
                ...state,
                pending: false,
                transactions: action.payload
            };
        case FETCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                pending: false,
                transactions: action.payload
            };
        case FETCH_USERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}


// A reducer is a function which is given a state and an action.
// Depending on the action it will transform the state and then return the new state.
//reducers are pure functions. They never call something like an API or dispatch another action to redux.
// Redux-Thunk is pretty easy to understand. It is a so-called middleware for the redux store.
// It looks at every single action being dispatched and if it is a function, it calls the function.
