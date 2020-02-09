import {
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_PENDING,
  FETCH_TRANSACTIONS_ERROR,
  RESET_TRANSACTIONS,
  EDIT_USERS_SUCCESS

} from "./actionTypes";



export function fetchUsersPending() {
  return {
    type: FETCH_USERS_PENDING
  }
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
export function editUserSuccess(user) {
  return {
    type: EDIT_USERS_SUCCESS,
    payload: user
  }
}
export function fetchTransactionsSuccess(transactions) {
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions
  }
}
export function resetTransactions() {
  return {
    type: RESET_TRANSACTIONS,
    payload: []
  }
}
export function fetchTransactionsPending() {
  return {
    type: FETCH_TRANSACTIONS_PENDING
  }
}

export function fetchTransactionsError(error) {
  return {
    type: FETCH_TRANSACTIONS_ERROR,
    error: error
  }
}
export function fetchUsersError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error: error
  }
}


// you dispatch actions onto redux, and based on those actions the state is modified.

// An action doesn't do anything.
// An action is just a plain object with a type key
// After an action is dispatched, it will be passed onto a so called REDUCER
