import axios from 'axios'
import {FETCH_RENTALS,
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT} from './types'

const fetchRentalByIdInit =(rental) =>{
    return{
        type :FETCH_RENTAL_BY_ID_INIT,
        rental
    }
}
const fetchRentalByIdSucces =(rental) =>{
    return{
        type :FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}
const fetchRentalsSucces =(rentals) =>{
    return{
        type :FETCH_RENTALS_SUCCESS,
        rentals
    }
}
 export const fetchRentals =()=>{
     return dispatch => {
        axios.get('/api/v1/rentals/')
        .then(res=> res.data)
        .then(rentals=>dispatch(fetchRentalsSucces(rentals))
        );
     }
 }
 export const FetchRentalById =(rentalId)=>{

    return function(dispatch){
        //simulate server call
        dispatch(fetchRentalByIdInit());
        axios.get(`/api/v1/rentals/${rentalId}`)
        .then(res=>res.data)
        .then(rental=>dispatch(fetchRentalByIdSucces(rental))
        );
           
           //console.log(rental)
    }
}
