import React from 'react'
import LoginForm from './LoginForm';
import * as actions from  'actions';
import {connect} from 'react-redux';
class Login extends React.Component {
    constructor(){
        super();
        this.loginUser=this.loginUser.bind(this);

    }

    loginUser(userData) {
        //.log(userData)
        this.props.dispatch(actions.login(userData))
        }
    render(){
        return(
            <section id="login">
            <div className="bwm-form">
              <div className="row">
                <div className="col-md-5">
                  <h1>Login</h1>
                  LOGIN FORM HERE
                  <LoginForm submitCb={this.loginUser}/>
                </div>
                <div className="col-md-6 ml-auto">
                  <div className="image-container">
                    <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                    <img src='' alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
}
function mapStateToProps(state){

    return{
      auth : state.auth 
    }
}
export default connect(mapStateToProps)(Login)