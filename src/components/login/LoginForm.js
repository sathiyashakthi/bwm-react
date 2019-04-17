import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput} from 'components/shared/form/Bwminput'
import {BwmResError} from 'components/shared/form/BwmResError'
import{required,minLength4} from 'components/shared/form/Validators'
const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting,submitCb,valid } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      
    
          <Field
            name="email"
            component="input"
            type="email"
            label='Email'
            className='form-control'
            component={BwmInput}
            validate={[required,minLength4]}
          />

          <Field
            name="password"
            component="input"
            type="password"
            label='Password'
            className='form-control'
            component={BwmInput}
            validate={required}
          />

      <div>
        <button className='btn btn-bwm btn-form'type="submit" disabled={!valid||pristine || submitting}>
          Submit
        </button>

      </div>
    </form>
  )
}



export default reduxForm({
  form: 'loginForm',// a unique identifier for this form

})(LoginForm)