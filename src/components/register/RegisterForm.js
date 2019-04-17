import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput} from 'components/shared/form/Bwminput'
import {BwmResError} from 'components/shared/form/BwmResError'
const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting,submitCb,valid,errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      
          <Field
            name="username"
            component="input"
            type="text"
            label='UserName'
            className='form-control'
            component={BwmInput}
          />
       
          <Field
            name="email"
            component="input"
            type="email"
            label='Email'
            className='form-control'
            component={BwmInput}
          />

          <Field
            name="password"
            component="input"
            type="password"
            label='Password'
            className='form-control'
            component={BwmInput}
          />

          <Field
            name="passwordConfirmation"
            component="input"
            type="password"
            label='PasswordConfirmation'
            className='form-control'
            component={BwmInput}
          />

      <div>
        <button className='btn btn-bwm btn-form'type="submit" disabled={!valid||pristine || submitting}>
          Submit
        </button>

      </div>
      <BwmResError errors={errors}/>
    </form>
  )
}

const validate =values=>{
  const errors={};
  if (values.username && values.username.length<4){
    errors.username='Username minimum length is 4 characters!'
  }
  if(!values.email){
    errors.email='Please enter email';
  }
  if(!values.passwordConfirmation){
    errors.passwordConfirmation='Please enter Password Confirmation';
  }
 else if( values.passwordConfirmation !=values.password){
    errors.passwordConfirmation='Password must be the same';
  }
  return errors;
}

export default reduxForm({
  form: 'registerForm',// a unique identifier for this form
  validate
})(RegisterForm)