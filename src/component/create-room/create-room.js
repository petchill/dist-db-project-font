import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './create-room.css';
import axios from 'axios';
import { SERVER_URL } from '../../config/environment';

class CreateRoom extends Component {
  constructor(props){
    super(props)
    this.state = {
      tagList: []
    }
  };

  resetInput() {
    document.getElementById('topic-input').value = ""
    document.getElementById('describtion-input').value = ""
    this.setState({
      tagList: []
    })
  }

  async createPost() {
    const topic = document.getElementById('topic-input').value;
    const tags = this.state.tagList;
    const describtion = document.getElementById('describtion-input').value;
    if (topic === '' || describtion === ''){
      alert('please enter topic and describtion ');
      return;
    }
    try{
      const response = await axios({
        method: 'post',
        url: `${SERVER_URL}/room`,
        data: {
          owner_id: this.props.user.userId,
          owner_name: this.props.user.username,
          room_topic: topic,
          room_tags: tags,
          room_describe: describtion
        }
      });
      if (response) {
        alert('already add room');
        this.resetInput();
      }
    } catch (error) {
      console.error('post create room error ', error)
    }
  }

  async addTag() {
    const tag = document.getElementById('tag-input').value;
    await this.setState({
      tagList: this.state.tagList.concat(tag)
    })
    document.getElementById('tag-input').value = ""
  }

  removeTag(el) {
    const tagList = _.pull(this.state.tagList, el);
    this.setState({
      tagList: tagList
    });
    
  }

  tagNaveComponent() {
    const tagComponent = this.state.tagList.map(currTag => {
      return (
        <a id={`tag-name-${currTag}`}href="#" className="tag-list" key={currTag} onClick={() => this.removeTag(currTag)}>{currTag}</a>
      )
    })
    return tagComponent;
  }


  
  render (){
    return (
      <div >
        <div className = "create-room">
          <div className="create-room-title">
            <h1>Create Room</h1>
          </div>
          <div className="create-form">
            <div className="room-topic">
              <label> Room's Topic : </label>
              <input className="topic-input" id="topic-input"></input>
            </div>
            <div className="room-tag"> 
              <label> Room's Tags : </label>
              <input className="tag-input" id="tag-input" ></input>
              <a href="#" className="tag-submit" onClick={() => this.addTag()}  >add</a>
            </div>
            <div className="tag-nav">
              {this.tagNaveComponent()}
            </div>
            <div className="room-describtion">
              <label> Room's Describtion : </label>
              <br></br>
              <textarea className="describtion-input" id="describtion-input"></textarea>
            </div>
            <div className="create-submit">
              <a href="#" onClick={() => this.createPost()}>submit</a>
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
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(CreateRoom);
