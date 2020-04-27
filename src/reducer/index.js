import { combineReducers } from 'redux';

const userReducer = (state={
  // isLoggedIn: true,
  // username: 'petchill2',
  // userId: '5e875ffbbfb9e02eb5a54669'
  isLoggedIn: false,
  username: '',
  userId: ''
}, action) => {
  switch (action.type) {
    case 'login' :
      state = {
        isLoggedIn: true,
        username: action.payload.username,
        userId: action.payload.userId
      }
      break;
    case 'logout' :
      state = {
        isLoggedIn: false,
        username: '',
        userId: ''
      }
      break;
    default:
      break;
  }
  return state;
}

const pageReducer = (state={
  pageState: 'home',
  roomState: '5ea3f4921e07f90512b05e2b'
}, action) => {
  switch (action.type) {
    case 'changePage' :
      state = {
        roomState: state.roomState,
        pageState: action.payload
      }
      break;
    case 'changeRoom' :
      state = {
        pageState: state.pageState,
        roomState: action.payload
      }
    default:
      break;
  }
  return state;
}
const allReducer = combineReducers({
  user: userReducer,
  page: pageReducer
});
export default allReducer;
