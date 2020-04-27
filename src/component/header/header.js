import React from 'react';
import { connect } from 'react-redux';
import logoYaso from '../../image/logoYaso-v2.png';
import './header.css';
require('dotenv').config()

const Header = props => {
  const changePage = (pageName) => {
    props.changePage(pageName);
  }

  const signInOrOut = () => {
    const SignInButton = (<li><a className="head" href="#" onClick={() => changePage('signIn')}>SIGN IN</a></li>);
    const SignOutButton = (<li><a className="head" href="#" onClick={() => props.logout()}>SIGN OUT</a></li>);
    return props.user.isLoggedIn ? SignOutButton : SignInButton;
  }

  return (
    <div >
      <div className="Header">
        <nav className="header-nav">
          <div>
            <img src={logoYaso} alt="logoTaso" className="logo-image" /> 
          </div>
          <ul>
            {/* eslint-disable-next-line */}
            <li><a className="head" href="#" onClick={() => changePage('home')}>HOME</a></li>{/* eslint-disable-next-line */}
            <li><a className="head" href="#" onClick={() => changePage('signUp')}>SIGN UP</a></li>{/* eslint-disable-next-line */}
            {/* <li><a className="head" href="#" onClick={() => changePage('signIn')}>SIGN IN</a></li> */}
            {signInOrOut()}

          </ul>
        </nav>
      </div>
      <div className="search-header">
        <nav className="search-nav">
          <div>
            <input type="text" className="search" placeholder="search Tag"></input>
            <button className="search-submit">search</button>
          </div>
          <div>
            <input type="text" className="search" placeholder="search Topic"></input>
            <button className="search-submit">search</button>
          </div>
        </nav>
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
    login:(payload) => {
      dispatch({
        type: 'login',
        payload: payload
      })
    },
    logout:() => {
      dispatch({
        type: 'logout',
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

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
