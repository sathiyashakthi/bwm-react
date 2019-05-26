import React from 'react';
import {Link } from 'react-router-dom'
import{toUppercase,pretifyDate} from 'helpers'
import {RentalManageModal} from './RentalManageModal'
export function RentalManageCard(props){

    const {rentals:rental} =props;
return(
    <div className='col-md-4'>
      <div className='card text-center'>
        <div className='card-block'>
          <h4 className='card-title'>{rental.title} - {toUppercase(rental.city)}</h4>
          <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link> 
        { rental.bookings && rental.bookings.length>0 &&

          <RentalManageModal bookings ={rental.bookings}/> //RentalManageModal starts with button onclick only this componet will render

        }
        </div>
        <div className='card-footer text-muted'>
          Created at {pretifyDate(rental.createdAt)}
        </div>
      </div>
    </div>
)
    
}