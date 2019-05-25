import {LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT} from '../actions/types'
const INITAL_STATE ={
   isAuth:false,
   username:'',
   errors:[]
}

export const authReducer =(state=INITAL_STATE,action)=> {
    switch(action.type){
        case LOGIN_SUCCESS:
            //return {...state ,data:action.rentals}
            return Object.assign({},state,{isAuth:true,errors:[],username:action.username});

        case LOGIN_FAILURE:
            return Object.assign({},state,{errors:action.errors});
            case LOGOUT:
            return Object.assign({},state,{isAuth:false ,username:''});

        default:
            return state;
    }
}