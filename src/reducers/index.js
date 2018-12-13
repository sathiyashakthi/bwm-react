import {rentalReducer,selectedRentalReducer} from './rental-reducer'
//import * as redux from 'redux';
import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
debugger;
export const init =() =>{
    const reducer =combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer
    })
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));
    return store;

}