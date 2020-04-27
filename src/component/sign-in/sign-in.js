import React from 'react';
import { connect } from 'react-redux';
import './sign-in.css';
import axios from 'axios';
import { SERVER_URL } from '../../config/environment'

const SignIn = props => {
  async function connectLogIn() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    try{
      const response = await axios({
        method: 'post',
        url: `${SERVER_URL}/user/login`,
        data: {
          username: usernameInput,
          password: passwordInput
        }
      });
      const {username, user_id: userId} = response.data.data;
      props.login({ username, userId });
      props.changePage('home');
    } catch (error) {
      alert('Cannot login', error);
    }
  }

  

  return (
    <div>
      <div className="signin-form">
        <div className="form">
          <h1 className="head">Sign In</h1>
          <input placeholder="username" id="username"></input>
          <input placeholder="password" id="password"></input>
          <br />
          <br />
          <div className="signin"><a className="signin" href="#" type="button" onClick={ () => connectLogIn()}>submit</a></div>
        </div>
      </div>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    page: state.page
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    login:(payload) => {
      dispatch({
        type: 'login',
        payload: payload
      })
    },
    changePage:(pageName) => {
      dispatch({
        type: 'changePage',
        payload: pageName
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SignIn);
