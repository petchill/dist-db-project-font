import React from 'react';
import { connect } from 'react-redux';
import logoYaso from '../../image/logoYaso-v2.png';
import './header.css';

const Header = props => {
  const changePage = (pageName) => {
    props.changePage(pageName);
  }

  const signInOrOut = () => {
    const SignInButton = (<li><a className="head" href="#" onClick={() => changePage('signIn')}>SIGN IN</a></li>);
    const SignOutButton = (<li><a className="head" href="#" onClick={() => props.logout()}>SIGN OUT</a></li>);
    return props.user.isLoggedIn ? SignOutButton : SignInButton;
  }

  const searchTopic = () => {
    const topic = document.getElementById('search-topic').value;
    props.searchTopic(topic);
    props.changePage('searchPage');
    document.getElementById('search-topic').value = '';
  }

  const searchTag = () => {
    const tag = document.getElementById('search-tag').value;
    props.searchTag(tag);
    props.changePage('searchPage')
    document.getElementById('search-tag').value = '';
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
            <input type="text" id="search-tag" className="search" placeholder="search Tag"></input>
            <button onClick={() => searchTag()} className="search-submit">search</button>
          </div>
          <div>
            <input type="text" id="search-topic" className="search" placeholder="search Topic"></input>
            <button onClick={() => searchTopic()} className="search-submit">search</button>
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
    },
    searchTopic:(topic) => {
      dispatch({
        type: 'searchTopic',
        payload: topic
      })
    },
    searchTag:(tag) => {
      dispatch({
        type: 'searchTag',
        payload: tag
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Header);
