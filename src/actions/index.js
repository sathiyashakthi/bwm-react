import axios from 'axios'


import * as jwt from 'jsonwebtoken';

import {FETCH_RENTALS,
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_FAILURE,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_USER_BOOKINGS_INIT,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT} from './types'
import { promises } from 'fs';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

//RENTAL ACTIONS---------------------
const axiosInstance = axiosService.getInstance()

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

const fectchRentalsInit =()=>{
    return{
        type: FETCH_RENTALS_INIT
    }
}

const fetchRentalsFailure =(errors)=>{
    return{
        type:FETCH_RENTALS_FAILURE,
        errors

    }
}
 export const fetchRentals =(city)=>{
     const url =city ? `/rentals?city=${city}`:'/rentals';
     
     return dispatch => {
        dispatch(fectchRentalsInit())
       axiosInstance.get(url)
        .then(res=> res.data)
        .then(rentals=>dispatch(fetchRentalsSucces(rentals)))
        .catch(({response})=>dispatch(fetchRentalsFailure(response.data.errors)))
     }
 }
 export const FetchRentalById =(rentalId)=>{

    return function(dispatch){
        //simulate server call
        dispatch(fetchRentalByIdInit());
        axios.get(`/api/v1/rentals/${rentalId}`)
        .then(res=>res.data)
        .then(rental=>
            dispatch(fetchRentalByIdSucces(rental))
        );
           
        //
    }
}

export const createRental=(rentalData)=>{
    return axiosInstance.post('/rentals',rentalData).then(
        res=>res.data,
        err=>Promise.reject(err.response.data.errors)   
    )
}

//UserBookings Actions
export const fetchUserBookingsInit=()=>{
    return{
        type:FETCH_USER_BOOKINGS_INIT
    }
}

export const fetchUserBookingsSuccess=(userBookings)=>{
    debugger;
    return{
        type:FETCH_USER_BOOKINGS_SUCCESS,
        userBookings
    }
}

export const fetchUserBookingsFail=(errors)=>{
    return{
        type:FETCH_USER_BOOKINGS_FAIL,
        errors
    }
}
export const createBooking =(booking)=>{
    debugger;
   return axiosInstance.post('/bookings',booking)
    .then(res=> res.data)
    .catch((response) =>  { 
        console.log("response :" + response)
        Promise.reject(response.data.errors)   
    })
}

export const fetchUserBookings=()=>{
    debugger;
    return dispatch=>{
        dispatch(fetchUserBookingsInit())
     axiosInstance.get('/bookings/manage')
    .then(res=>res.data)
    .then(userBookings=>dispatch(fetchUserBookingsSuccess(userBookings)))
    .catch((axiosRes) => { 
        const defaulErr = [{title: 'Error', detail:'Uuups Something Happened'}];
        return axiosRes.response ? fetchUserBookingsFail(axiosRes.response.data.errors) : fetchUserBookingsFail(defaulErr);
      })
      
      
}}





//USER RENTAL ACTION

export const getUserRental=()=>{
    return axiosInstance.get('/rentals/manage').then(
        res=>res.data,
        err=>Promise.reject(err.response.data.errors)
 
   )}


// AUTH ACTIONS-----------------------
const loginSuccess=()=>{
    const username= authService.getUsername()
    return{
        type:LOGIN_SUCCESS,
        username
        
    }
}
const loginFailure=(errors)=>{
    return{
        type:LOGIN_FAILURE,
        errors
    }
}
export const register=(userData)=>{
    return axios.post('/api/v1/users/register',userData).then(
        res=>res.data,
        err=>Promise.reject(err.response.data.errors)
        

        
    )
}


export const checkAuthState=()=>{
    return dispatch=>{
        if(authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
}
export const login=(userData)=>{
    return dispatch=>{
        return axios.post('api/v1/users/auth',userData)
        .then(res => res.data)
        .then(token=>{
            debugger;
            authService.saveToken(token);
            dispatch(loginSuccess());
        })
        .catch(({response})=>{
            dispatch(loginFailure(response.data.errors));
        })
    }
}

export const logout = ()=>{
    authService.invalidateUser();
    return {
        type:LOGOUT
    }
}

