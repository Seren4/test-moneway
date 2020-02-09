import React from "react";
import User from "./User";
import Home from "./Home";
import EditUser from "./EditUser";
import faker from "faker";

import { Container } from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

// Miragejs API mocking
import {Model, Server, Factory, belongsTo} from "miragejs";
new Server({
  models: {
    user: Model,
    transaction: Model.extend({
      user: belongsTo(),
    }),
  },
  factories: {
    user: Factory.extend({
      name() {
        return faker.name.firstName();
      },
      surname() {
        return faker.name.lastName();
      },
      username() {
        return faker.internet.userName();
      },
      avatar() {
        return faker.image.avatar();
      },
      inscriptionDate() {
        return faker.date.past().toLocaleDateString()
      },
      phone() {
        return faker.phone.phoneNumber()
      },
      email() {
        return faker.internet.email();
      },
      status(i) {
        let status = ["Active", "Pending", "Blocked"];
        return status[i % status.length]
      },

    }),
    transaction: Factory.extend({
      amount() {
        return faker.finance.amount()
      },
      type() {
        return faker.finance.transactionType()
      },
      date() {
        return faker.date.past().toLocaleDateString()
      },
    }),
  },

  routes() {
    this.namespace = "api";

    this.get("/users", (schema, request) => {
      return schema.users.all()
    });

    this.get("/transactions/:userId", (schema, request) => {
      let userId = request.params.userId;
      return schema.transactions.where({ userId: userId })
    });

    this.post('/users/:id', (schema, request) => {
      let user = schema.users.find(JSON.parse(request.requestBody).id);
      user.update(JSON.parse(request.requestBody));
      return (schema.users.all())
    });
  },

  seeds(server) {
    server.createList("user", 20).forEach(user => {
      server.createList("transaction", 5, { user })
    })
  },
});


export default function App() {

  return (
    <MuiThemeProvider>
      <Container maxWidth="lg">
        <Router>
          <BottomNavigation >
            <BottomNavigationAction label="HOME" showLabel={true} component={Link} to="/">
            </BottomNavigationAction>
          </BottomNavigation>

          <Switch>
            <Route path="/user/:id/edit" component={EditUser}>
            </Route>
            <Route path="/user/:id" component={User}>
            </Route>
            <Route path="/" component={Home}>
            </Route>

          </Switch>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
}
