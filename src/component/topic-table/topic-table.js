import React, { Component } from 'react';
import { connect } from 'react-redux';
import './topic-table.css';
import axios from 'axios';
import { SERVER_URL } from '../../config/environment';

class TopicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: []
    }
  };

  goToRoom = (roomId) => {
    this.props.changeRoom(roomId)
    this.props.changePage('roomPage')
  }

  async componentDidMount() {
    async function renderTableData(parent) {
      const response = await axios.get(`${ SERVER_URL }/room`)
      const rawDataList = response.data.data;
      return rawDataList.map(currData => {
        const { room_topic, owner_name, room_tags, ...data } = currData //destructuring
        const roomComponent = (
          <a href="#" onClick={() => parent.goToRoom(data._id)}>{room_topic}</a>
        )
        const tagComponent = room_tags.map(currTag => {
          return (
            <a className="topic-tag-list" key={currTag}href='#' >{currTag}</a>
            )
        })
        return (
          <tr key = {data._id}>
              <td>{roomComponent}</td>
              <td>{owner_name}</td>
              <td>{tagComponent}</td>
          </tr>
        )
      })
    }
    const dataList = await renderTableData(this);
    this.setState({
      table: dataList
    })
  }

  render(){
    return (
      <div className="topic-table">
        <h1 id='title'>Topic Table</h1>
        <table id='students'>
            <tbody>
              <tr>
                <th>Topic</th>
                <th>Post By</th>
                <th>Tags</th>
              </tr>
              { this.state.table }
            </tbody>
        </table>
      </div>
    )
  }
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
    changeRoom:(roomId) => {
      dispatch({
        type: 'changeRoom',
        payload: roomId
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

export default connect(mapStatetoProps, mapDispatchtoProps)(TopicTable);
