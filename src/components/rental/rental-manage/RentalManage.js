import React from 'react';
import * as action from 'actions'
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {RentalManageCard} from './RentalManageCard'
export class RentalManage extends React.Component{

    constructor(){
        super();
        this.state={
            userRentals:[],
            errors:[],
            isFetching:false
        }
        this.deleteRental =this.deleteRental.bind(this);
    }

    componentWillMount(){
        this.setState({isFetching:true})
        action.getUserRental().then(
            (userRentals)=>{
                this.setState({userRentals,isFetching:false})
            },
            (errors)=>{
                this.setState({errors,isFetching:false})
            }
        )
    }
    renderRentalCard(rental){
        return(
            rental.map((rental,index) =><RentalManageCard key={index} rentals ={rental} rentalIndex={index} deleteRentalCb={this.deleteRental}/> ) 
        )
    }

    deleteRental(rentalId,rentalIndex){
        action.deleteRental(rentalId).then(
            ()=>{
                this.deleteRentalFromList(rentalIndex);
                toast.info("Booking Has been Deleted")

            },
            (errors)=>{
                debugger;
                toast.error(errors[0].detail)
            }
        )
    }  
    deleteRentalFromList(rentalIndex){
        const userRentals =this.state.userRentals.slice();// it will create copy of userRentals array and store in userRentals
        userRentals.splice(rentalIndex,1) // it will delete one element starting from rentalIndex
        this.setState({userRentals})
    }
    render(){

        const {userRentals,isFetching}= this.state;

        return(

    
<section id='userRentals'>
    <ToastContainer/>
  <h1 className='page-title'>My Rentals</h1>
  <div className='row'>
  {this.renderRentalCard(userRentals)}
  </div>{
      !isFetching && userRentals.length==0 &&
  
  <div className='alert alert-warning'>
    You dont have any rentals currenty created. If you want advertised your property
    please follow this link.
    <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
  </div>
  }
</section>
      
        )
}
}