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
      break;
    default:
      break;
  }
  return state;
}

const searchReducer = (state={
  searchAction: '',
  searchValue: ''
}, action) => {
  switch (action.type){
    case 'searchTopic':
      state = {
        searchAction: 'topic',
        searchValue: action.payload
      }
      break;
    case 'searchTag':
      state = {
        searchAction: 'tag',
        searchValue: action.payload
      }
      break;
    default:
      break;
  }
  return state;
}
const allReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
  search: searchReducer
});
export default allReducer;
