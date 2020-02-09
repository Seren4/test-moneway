import axios from "axios";
import {fetchUsersPending, fetchUsersSuccess, fetchUsersError, fetchTransactionsSuccess, editUserSuccess} from './actions';

function fetchUsers() {
  return async dispatch => {
    dispatch(fetchUsersPending());
    await axios.get(`/api/users`)
      .then(({data: users}) => {
        dispatch(fetchUsersSuccess(users.users));
      })
      .catch(error => {
        //TODO fetch error
        dispatch(fetchUsersError(error));
      })
  }
}

function fetchUserTransactions(userId) {
  return async dispatch => {
    // dispatch(fetchUsersPending());

    await axios.get(`/api/transactions/${userId}`)
      .then(({data: transactions}) => {
        dispatch(fetchTransactionsSuccess(transactions.transactions));
      })
      .catch(error => {
        //TODO fetch error
        dispatch(fetchUsersError(error));
      })
  }
}

function editUser(user) {
  return async dispatch => {
    // dispatch(fetchUsersPending());
    await axios.post(`/api/users/${user.id}`, user  )
      .then(({data: users}) => {
        dispatch(editUserSuccess(users.users));
      })
      .catch(error => {
        //TODO fetch error
      });
  }
}

export { fetchUsers, fetchUserTransactions, editUser };
