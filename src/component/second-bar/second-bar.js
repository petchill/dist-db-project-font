import React from 'react';
import { connect } from 'react-redux';

import './second-bar.css';

const SecondBar = props => {

  const authen = props.user.isLoggedIn;
  let component;
  if(!authen) {
    component = (
      <div className="bar">
          <a className="myButton" href="#" onClick={ () => props.changePage('signIn')}><span>SIGN IN</span></a>
          <a className="myButton" href="#" onClick={ () => props.changePage('signUp')}><span>SIGN UP</span></a>
      </div>
    )
  }
  else {
    component = (
      <div className="bar">
        <a className="myButton" href="#" onClick={ () => props.changePage('createRoom')}><span>Create Post</span></a>
      </div>
    )
  }
  return (
    <div>
      <div className="secondBar">
        {component}
      </div>
    </div>
  );
  
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    page: state.page
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    changePage:(pageName) => {
      dispatch({
        type: 'changePage',
        payload: pageName
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SecondBar);