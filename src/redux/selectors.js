
export const getUsersState = store => store.users;

export const getUsersList = store =>
  getUsersState(store) ? getUsersState(store).users : [];

export const getUserById = (store, id) => {
    const el = store.users.filter(el => el.id === id).pop();
    if (el) return el;
    else return {};
};

export const getUsers = store => store.users;
export const getTransactions = store => store.transactions;
export const getUsersPending = store => store.pending;
export const getUsersError = store => store.error;

