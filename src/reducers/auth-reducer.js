import {LOGIN_SUCCESS,LOGIN_FAILURE} from '../actions/types'
const INITAL_STATE ={
   isAuth:false,
  
   errors:[]
}

export const authReducer =(state=INITAL_STATE,action)=> {
    switch(action.type){
        case LOGIN_SUCCESS:
            //return {...state ,data:action.rentals}
            return Object.assign({},state,{isAuth:true,errors:[]});

        case LOGIN_FAILURE:
            return Object.assign({},state,{errors:action.errors});

        default:
            return state;
    }
}