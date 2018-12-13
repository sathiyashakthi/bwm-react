import React, { Component } from 'react';
import {Header} from 'shared/Header'
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route,Redirect} from 'react-router-dom'
import  RentalListing  from 'components/rental/rental-listing/RentalListing';
import RentalDetail from 'components/rental/rental-detail/RentalDetail'
const store =require('./reducers').init()
class App extends Component {
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
        </div>
      </div>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
