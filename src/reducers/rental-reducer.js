import {FETCH_RENTALS,FETCH_RENTAL_BY_ID_SUCCESS,FETCH_RENTAL_BY_ID_INIT} from '../actions/types'
const INITAL_STATE ={
    rentals :{
    data :[]
    },
    rental :{
        data:{}
    }
}

export const rentalReducer =(state=INITAL_STATE.rentals,action)=> {
    switch(action.type){
        case FETCH_RENTALS:
            return {...state ,data:action.rentals}
        default:
            return state;
    }
}
export const selectedRentalReducer =(state=INITAL_STATE.rental,action)=> {
    switch(action.type){
        case FETCH_RENTAL_BY_ID_INIT:
            return{...state,data:{}}
        case FETCH_RENTAL_BY_ID_SUCCESS:
            //return Object.assign({},state,{data:action.rental})
            debugger;
            return {...state ,data:action.rental}
        default:
            return state;
    }
}