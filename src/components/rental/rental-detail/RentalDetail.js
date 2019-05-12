import React, { Component } from 'react';
import * as actions from  'actions';
import {connect} from 'react-redux';
import {RentalDetailInfo} from './RentalDetailInfo';
import { Booking } from '../../booking/Booking';
  class RentalDetail extends Component{
    componentWillMount(){
       const rentalId = this.props.match.params.id;
        console.log(rentalId)
       this.props.dispatch(actions.FetchRentalById(rentalId));

   }
   
   
    render(){
       // console.log(this.props.match.params.id)

      const  rental= this.props.rental;
      console.log(rental._id)
      

        if(rental._id){
        return(
            
<section id='rentalDetails'>
  <div className='upper-section'>
    <div className='row'>
      <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
      </div>
      <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
      </div>
    </div>
  </div>

  <div className='details-section'>
    <div className='row'>
      <div className='col-md-8'>
        <RentalDetailInfo rental={rental}/>
      </div>
      <div className='col-md-4'> <Booking rental ={rental}/></div>
    </div>
  </div>
</section>


              
                )
        }
        else{
            return(
                <h1>Loading!!!!!</h1>
            )
        }
    }
}

function mapStateToProps(state){

    return{
      rental : state.rental.data  
    }
}
export default connect(mapStateToProps)(RentalDetail)
