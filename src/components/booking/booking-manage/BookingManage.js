import React from'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {BookingCard} from './BookingCard';
import * as action from 'actions'
class BookingManage extends React.Component{

    componentWillMount(){
        debugger;
        this.props.dispatch(action.fetchUserBookings())        
    }
renderBookingCard(bookings){
    return(
        bookings.map((booking,index)=><BookingCard key={index} booking ={booking}/> 
     )
    )
}
    render(){
        const {data:bookings ,isFetching} = this.props.userBookings;
        
        return(
            <section id='userBookings'>
            <h1 className='page-title'>My Bookings</h1>
             <div className='row'>
             {this.renderBookingCard(bookings)}
             

    </div>
    {
        !isFetching && bookings.length==0 &&
    
  <div class='alert alert-warning'>
    You have no bookings created go to rentals section and book your place today.
    <Link style={{'margin-left': '10px'}} class='btn btn-bwm' to='/rentals'>Available Rental</Link>
  </div>
    }
</section>
        )
    }
}

function mapStateToProps(state){
    return{
    userBookings:state.userBookings
    }
}


export default connect(mapStateToProps)(BookingManage)
