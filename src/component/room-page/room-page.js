import React, {Component} from 'react';
import { connect } from 'react-redux';
import './room-page.css';
import axios from 'axios';
import _ from 'lodash';
import { SERVER_URL } from '../../config/environment';
import { TextareaAutosize, TextField } from '@material-ui/core';

class RoomPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      topic: '',
      describtion: '',
      owner: '',
      tags: [],
      commentValue: '',
      commentIdList: [],
      commentList: []
    };
  };
  
  genTagComponent = (tagList = []) => {
    return tagList.map( currTag => {
      return (
        <a key={currTag} href="#" className="tag-list">{currTag}</a>
      );
    });
  };

  genCommentComponent = async (commentIdList = []) => {
    let index = 1;
    const result = []
    for (const currCommentId of commentIdList) {
      const response = await axios.get(`${ SERVER_URL }/comment/${currCommentId}`)
      const data = response.data.data;
      const component = (
        <div className="comment-bubble">
          <p>comment {index}</p>
          <TextareaAutosize className="comment-text" claaria-label="empty textarea" placeholder="Empty" id="text-test" readOnly value={data.comment_describe}/>
          <p className="post-owner">post by: {data.owner_name}</p>
        </div>
      )
      result.push(component);
      index++;
    }
    return result;
  }

  createPost = async () => {
    const payload = {
      owner_id : this.props.user.userId,
      owner_name: this.props.user.username,
      room_id: this.props.page.roomState,
      comment_describe: this.state.commentValue
    };
    try {
      const response = await axios({
        method: 'post',
        url: `${SERVER_URL}/comment`,
        data: payload
      });
      const commentResponseId = response.data.data._id;
      this.setState({
        commentIdList: _.concat(this.state.commentIdList, commentResponseId),
        commentValue: ''
      })
      const transportCommentList = await this.genCommentComponent(this.state.commentIdList);
      this.setState({
        commentList: transportCommentList
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (event) => {
    this.setState({
      commentValue: event.target.value
    });
  };

  async componentDidMount(){
    const roomId = this.props.page.roomState;
    async function getRoomDetail(){
      try {
        const response = await axios.get(`${ SERVER_URL }/room/${roomId}`);
        const rawData = response.data.data;
        return rawData
      } catch (error) {
        console.error(error)
      }
    }
    const response = await getRoomDetail();
    const transportTagList = this.genTagComponent(response.room_tags || []);
    const transportCommentList = await this.genCommentComponent(response.room_comments || []);
    await this.setState({
      topic: response.room_topic,
      describtion: response.room_describe,
      owner: response.owner_name,
      tags: transportTagList,
      commentIdList: response.room_comments,
      commentList: transportCommentList
    })
  }

  render(){
    const postComment = (
      <div className="comment-bubble comment-post">
        <h2>create your comment</h2>
        <TextField
          id="standard-multiline-flexible"
          multiline
          value={this.state.commentValue}
          onChange={this.handleChange}
          className="comment-input"
        />
        <div className="create-submit">
              <a href="#" onClick={() => this.createPost()}>submit</a>
            </div>
      </div>
    )
    return(
      <div>
        <div className="room-page">
          <div className="main-form">
            <div className="main-topic">
              <h1>{this.state.topic}</h1>
            </div>
            <div className="tag-nav">
              {this.state.tags}
            </div>
            <div className="main-describtion">
              <TextareaAutosize className="describtion-text" claaria-label="empty textarea" placeholder="Empty" id="text-test" value={this.state.describtion} readOnly/>
            </div>
            <p className="post-owner">owner: {this.state.owner}</p>
          </div>
          <div className="comment-form">
            <div className="comment-list">
              {this.state.commentList}
              {this.props.user.isLoggedIn
                ? postComment
                : ''
              }
            </div>
          </div>
        </div>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(RoomPage);
