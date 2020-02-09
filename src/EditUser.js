import React from 'react'
import {connect} from "react-redux";
import { getUsersError, getUsersPending, getUserById} from "./redux/selectors";
import {bindActionCreators} from "redux";
import {editUser} from './redux/fetch'

import EditUserForm from './components/EditUserForm'
import Grid from '@material-ui/core/Grid';

function EditUser(props) {
  if (!props.user) props.history.push(`/`);

  const submit = (evt) => {
    props.editUser(evt);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <EditUserForm onSubmit={submit} initialValues={props.user}/>
      </Grid>
    </Grid>

  );
}

const mapStateToProps = (state, ownProps) => {
  const { users } = state;
  const error = getUsersError(users);
  const user = getUserById(users, ownProps.match.params.id);
  const pending = getUsersPending(users);
  return {error, pending, user};
};

const mapDispatchToProps = dispatch => bindActionCreators({
  editUser: editUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
