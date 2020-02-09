import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {connect} from "react-redux";
import { TextField } from 'redux-form-material-ui'
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';

let ContactForm = props => {
  const { handleSubmit, initialValues } = props;

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="editFormName">Name:</label>
      <div>
        <Field component={TextField} id="editFormName" label={"Name"} name="name" hintText="Name"/>
      </div>

      <label htmlFor="editFormSurname">Surname:</label>
      <div>
        <Field id="editFormSurname" name="surname" component={TextField} type="text" hintText="Surname"/>
      </div>

      <label htmlFor="editFormEmail">Email:</label>
      <div>
        <Field id="editFormEmail" name="email" component={TextField} type="email" hintText="Email"/>
      </div>

      <label htmlFor="editFormEmail">Status:</label>
      <div>
        <Field id="editFormStatus" name="status" component={TextField} type="text" hintText="Status"/>
      </div>

      <Button type="submit" variant="contained" color="primary">
        <span>Submit</span>
      </Button>

      {initialValues &&
      <Link to={`/user/${initialValues.id}`}>
        <Button variant="contained">
          <span>Back</span>
        </Button>
      </Link>
      }
    </form>
  )
};

export default connect(
)(reduxForm({
  form: 'editForm', // a unique identifier for this form
  enableReinitialize: true
})(ContactForm))
