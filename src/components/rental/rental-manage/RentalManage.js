import React from 'react';
import * as action from 'actions'
import {Link} from 'react-router-dom';
import {RentalManageCard} from './RentalManageCard'
export class RentalManage extends React.Component{

    constructor(){
        super();
        this.state={
            userRentals:[],
            errors:[],
            isFetching:false
        }
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
            rental.map((rental,index) =><RentalManageCard key={index} rentals ={rental}/> ) 
        )
    }
    render(){

        const {userRentals,isFetching}= this.state;

        return(
    
<section id='userRentals'>
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