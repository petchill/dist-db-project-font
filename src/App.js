import  React, {useState, useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux';
import Header from './component/header/header';
import SecondBar from './component/second-bar/second-bar';
import TopicTable from './component/topic-table/topic-table';
import SignIn from './component/sign-in/sign-in';
import SignUp from './component/sign-up/sign-up';
import SearchPage from './component/search-page/search-page'
import CreateRoom from './component/create-room/create-room';
import RoomPage from './component/room-page/room-page';

const App = props => {
  const [currentPage, setCurrentPage] = useState(props.page.pageState)
  useEffect(() => {
    async function main(){
      await setCurrentPage('roomPage');
    }
    main()
  },[currentPage]);
  const mainComponent = () => {
    switch (props.page.pageState) {
    // switch (currentPage) {
      case 'home':
        return (
          <div>
          <TopicTable />
          <SecondBar />
          </div>
        );
      case 'signIn':
        return <SignIn />
      case 'signUp':
        return <SignUp />
      case 'createRoom':
        return <CreateRoom />
      case 'roomPage':
        return <RoomPage />
      case 'searchPage':
        return <SearchPage />
      default:
        return (
        <TopicTable />,
        <SecondBar />
        )
    }
  }
  return (
    <div className="App">
      <Header />
      {/* <SecondBar /> */}
      {mainComponent()}
      {/* <TopicTable /> */}
    </div>
    
  );
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    page: state.page,
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    login:(username) => {
      dispatch({
        type: 'login',
        payload: username
      })
    },
    setRoom:  () => {
      dispatch({
        type: 'setRoom'
      })
    },
    addRoom: (payload) => {
      dispatch({
        type: 'addRoom',
        payload: payload
      })
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
