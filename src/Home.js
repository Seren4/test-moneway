import React, { useEffect } from "react";
import {getUsersError, getUsers, getUsersPending} from './redux/selectors';
import {fetchUsers} from './redux/fetch';
import { bindActionCreators } from 'redux';

import {connect} from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MaterialTable from "material-table";

function Home(props) {

  useEffect(() => {
    if(!props.allUsers.length) {
      props.fetchUsers();
    }
  }, [props.allUsers.length]);

  return (
    <div>
      {props.allUsers &&
      <MaterialTable
        columns={[
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Status", field: "status" },
          { title: "Inscription Date", field: "inscriptionDate", type: "numeric" },
        ]}
        data={props.allUsers}
        isLoading={!props.allUsers.length}
        title="Users"
        actions={[
          {
            icon: VisibilityIcon,
            tooltip: 'Show',
            onClick: (event, row) => {
              props.history.push(`/user/${row.id}`);
            }
          }, {
            icon: EditIcon,
            tooltip: 'Edit',
            onClick: (event, row) => {
              props.history.push(`/user/${row.id}/edit`);
            }
          },
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
      }
    </div>

  );
}
const mapStateToProps = state => {
  const { users } = state;
  const error = getUsersError(users);
  const allUsers = getUsers(users);
  const pending = getUsersPending(users);
  return {error, allUsers, pending};
};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers: fetchUsers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
