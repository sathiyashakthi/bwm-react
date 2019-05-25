import React, { Component } from 'react';
import {RentalList} from './RentalList'
import {connect} from 'react-redux';
import {toUppercase} from 'helpers';
import * as actions from 'actions'
class RentalSearchListing extends Component{
   constructor(){
       super();
       this.state={
           searchedCity:''
       }
   }


   componentWillMount(){
    this.searchRentalsbyCity();

    //this.props.dispatch(actions.fetchRentals());
   }
   componentDidUpdate(prevProps){
       const currentUrlParam = this.props.match.params.city;
       const prevUrlParam =prevProps.match.params.city;
       
        if(currentUrlParam!=prevUrlParam){
            this.searchRentalsbyCity();
        }
   }
   searchRentalsbyCity(){

       const searchedCity =this.props.match.params.city;
        this.setState({searchedCity});
        this.props.dispatch(actions.fetchRentals(searchedCity));
    
   }
   renderTitle(){
       const {errors,data} =this.props.rentals;
       const {searchedCity}= this.state;
       let title='';
       if(errors.length>0){
           title=errors[0].detail;
       }
       if(data.length>0){
           title=`Your Home in City of  ${toUppercase(searchedCity)}`
       }
      return  <h1 className='page-title'>{title}</h1>
   }
    render(){
        
       // this.props;
        return(
            <section id='rentalListing'>
               {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data}/>
        
            </section>
        )
    }
}
    function mapStateToProps(state){
        return{
          rentals : state.rentals
        }
    }
    export default connect(mapStateToProps)(RentalSearchListing)
