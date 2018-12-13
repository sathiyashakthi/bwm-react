import React, { Component } from 'react';
import * as actions from  'actions'
import {connect} from 'react-redux';

  class RentalDetail extends Component{
    componentWillMount(){
       const rentalId = this.props.match.params.id;
        console.log(rentalId)
        debugger;
       this.props.dispatch(actions.FetchRentalById(rentalId));

   }
   
   
    render(){
       // console.log(this.props.match.params.id)
       debugger;

      const  rental= this.props.rental;
        if(rental.id){
        return(
            <div>
                <h1 className='page-title'>{rental.title}</h1>
                <h1 className='page-title'>{rental.city}</h1>
                <h1 className='page-title'>{rental.description}</h1>
                <h1 className='page-title'>${rental.dailyRate}</h1>

            </div>   
                )
        }
        else{
            return(
                <h1>Loading!!!!!</h1>
            )
        }
    }
}
debugger
function mapStateToProps(state){

    return{
      rental : state.rental.data  
    }
}
export default connect(mapStateToProps)(RentalDetail)
