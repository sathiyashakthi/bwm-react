import axios from 'axios'
import * as jwt from 'jsonwebtoken';
import {FETCH_RENTALS,
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT} from './types'
import { promises } from 'fs';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service'
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
 export const fetchRentals =()=>{
     return dispatch => {
        axiosInstance.get('/rentals')
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
        .then(rental=>
            dispatch(fetchRentalByIdSucces(rental))
        );
           
        //
    }
}
// AUTH ACTIONS-----------------------
const loginSuccess=()=>{
    return{
        type:LOGIN_SUCCESS
        
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

export const createBooking =(booking)=>{
    debugger;
   return axiosInstance.post('/bookings')
    .then(res=> res.data)
    .catch(({response})=>response.data.errors)

}