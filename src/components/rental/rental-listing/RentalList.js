import React, { Component } from 'react';
import { RentalCard } from './RentalCard';
export class RentalList extends Component{
   
    renderRentals(){
        
        return this.props.rentals.map((rental,index)=>{
            //console.log(rental);
            return(
               
                <RentalCard key ={index} colNum='col-md-3 col-xs-6'
                rental ={rental} />
            )
        })
    }

    render(){
        
       // this.props;
        return(
                 <div className='row'>
                 {this.renderRentals()}
                 </div>      
        )
    }
}
    