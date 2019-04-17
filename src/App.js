import React, { Component } from 'react';
import {Header} from 'shared/Header'
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route,Redirect} from 'react-router-dom'
import  RentalListing  from 'components/rental/rental-listing/RentalListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail'
import Login from 'components/login/Login'
import {Register} from 'components/register/Register'
import * as actions from 'actions'
const store =require('./reducers').init()
class App extends Component {
  componentWillMount(){
    this.checkAuthState();
  }
checkAuthState(){
  debugger;
  store.dispatch(actions.checkAuthState());
}
  render() {
  
    return (
    <Provider store ={store}>
      <BrowserRouter>
      <div className='App'>
        <Header />
          <div className='container'>
            <Route exact path='/' render={()=> <Redirect to='/rentals' />}/> 
            <Route exact path='/rentals' component ={RentalListing}/>
            <Route exact path='/rentals/:id' component ={RentalDetail}/> 
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>

        </div>
      </div>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
