import React, {useEffect} from 'react'
import {connect} from "react-redux";
import { resetTransactions } from "./redux/actions";
import {getTransactions, getUsersError, getUsersPending, getUserById, getUsers} from "./redux/selectors";
import {bindActionCreators} from "redux";
import {fetchUserTransactions} from "./redux/fetch";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MaterialTable from "material-table";

import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function User(props) {
  const classes = useStyles();
  if (!props.user) props.history.push(`/`);

  useEffect(() => {
    props.fetchUserTransactions(props.match.params.id);
    return () => {
      props.resetTransactions();
    }
  }, [props.match.params.id]);

  return (
    <Container maxWidth="md">
      {props.user &&
      <Card >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={props.user.avatar} className={classes.large} >
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <Link to={`/user/${props.user.id}/edit`}>
                <EditIcon></EditIcon>
              </Link>
            </IconButton>
          }
          title={props.user.name + ' ' + props.user.surname}
          subheader={props.user.username}
        />
        <CardContent>

          <Typography variant="body1">
            Inscription Date: {props.user.inscriptionDate}
          </Typography>

          <Typography variant="body1" component="p">
            Status: {props.user.status}
          </Typography>

          <Typography variant="body1" component="p">
            Phone: {props.user.phone}
          </Typography>

          <Typography variant="body1" component="p">
            Email: {props.user.email}
          </Typography>

        </CardContent>
        <CardActions>

        </CardActions>
      </Card>

      }
      {props.user &&
      <MaterialTable
        columns={[
          { title: "ID", field: "id" },
          { title: "Type", field: "type" },
          { title: "Amount", field: "amount" },
          { title: "Date", field: "date" },
        ]}
        data={props.transactions}
        title="Transactions"
        isLoading={!props.transactions.length}

      />
      }

    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { users } = state;
  const error = getUsersError(users);
  const transactions = getTransactions(users);
  const allUsers = getUsers(users);
  const user = getUserById(users, ownProps.match.params.id);
  const pending = getUsersPending(users);
  return {error, transactions, pending, allUsers, user};

};

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserTransactions: fetchUserTransactions,
  resetTransactions: resetTransactions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
