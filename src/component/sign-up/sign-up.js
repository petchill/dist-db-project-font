import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './sign-up.css';
import axios from 'axios';
import { SERVER_URL } from '../../config/environment'


const SignUp = props => {
  async function connectSignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try{
      const response = await axios({
        method: 'post',
        url: `${SERVER_URL}/user/register`,
        data: {
          username,
          password
        }
      });
      if (_.has(response,'data.error')){
        if (response.data.error.code === 11000) {
          alert('Your username has been already used')
          resetInput()
          return;
        }
      }
      const loginPayload = {
        username: response.data.data.username,
        userId: response.data.data._id
      }
      props.login(loginPayload)
      alert('sign up complete');

      props.changePage('home');
    } catch (error) {
    }
  }

  function resetInput() {
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
  }

  return (
    <div>
      <div className="signup-form">
        <div className="form">
          <h1 className="head">Sign Up</h1>
          <input placeholder="username" id="username"></input>
          <input placeholder="password" id="password"></input>
          <br />
          <br />
          <div className="signup"><a className="signup" href="#" type="button" onClick={ () => connectSignIn()}>submit</a></div>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUp);
