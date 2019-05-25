import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {BwmInput} from 'components/shared/form/Bwminput'
import {BwmTextArea} from 'components/shared/form/BwmTextArea'
import {BwmSelect} from 'components/shared/form/BwmSelect'
import {BwmResError} from 'components/shared/form/BwmResError';
import { BwmFileUpload } from '../../shared/form/BwmFileUpload';

//import{required,minLength4} from 'components/shared/form/Validators'
const RentalCreateForm = props => {
  const { handleSubmit, pristine, reset, submitting,submitCb,valid,errors,options } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      
    
          <Field
            name="title"
            type="text"
            label='Title'
            className='form-control'
            component={BwmInput}
          />
            <Field
            name="description"
            type="text"
            rows='6'
            label='Description'
            className='form-control'
            component={BwmTextArea}
          />

          <Field
            name="city"
            type="text"
            label='City'
            className='form-control'
            component={BwmInput}
          />
        <Field
            name="street"
            type="text"
            label='Street'
            className='form-control'
            component={BwmInput}
          />

        <Field
            options ={options}
            name="category"
            label='Category'
            className='form-control'
            component={BwmSelect}
          />

          <Field
            name="image"
            label='Image'
            component={BwmFileUpload}
          />

        <Field
            name="bedrooms"
            type="number"
            label='Bedrooms'
            className='form-control'
            component={BwmInput}
          />

        <Field
            name="dailyRate"
            type="text"
            symbol="$"
            label='Daily Rate'
            className='form-control'
            component={BwmInput}
          />
           <Field
            name="shared"
            type="checkbox"
            label='Shared'
            className='form-control'
            component={BwmInput}
          />
        <button className='btn btn-bwm btn-form'type="submit" disabled={!valid||pristine || submitting}>
          CreateRental
        </button>
        <BwmResError errors={errors}/>
    </form>
  )
}



export default reduxForm({
  form: 'loginForm',// a unique identifier for this form
  initialValues:{shared:false ,category:'apartment'}
})(RentalCreateForm)