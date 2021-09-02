import React, { useState } from 'react';
import axios from 'axios';
import history from '../../utils/history'
import PostView from './view';

export default function Post({ currentUser }) {
  const [postState, setPostState] = useState({
    idea: {
      title: '',
      description: '',
      user: {
        id: currentUser.user_id
      },
      topic: {
        title: ''
      }
    },
    message: ''
  });

  const handleChange = (object, prop) => (event) => {
    setPostState(state => ({
      ...state,
      [object]: {
        ...state?.[object],
        [prop]: event.target.value
      }
    }));
  };

  const handleChangeNested = (parent, child, prop) => (event) => {
    setPostState(state => ({
      ...state,
      [parent]: {
        ...state?.[parent],
        [child]: {
          ...state?.[parent].[child],
          [prop]: event.target.value
        }
      }
    }));
  };

  const handleKeyPress = () => (event) => {
    if (event?.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('Post with Idea', postState.idea)
    axios.post(`http://localhost:8080/content/post`, 
      postState.idea
    ).then((ideaResponse) => {
      console.log('Post response', ideaResponse)
      history.push(`/idea/${ideaResponse.data.id}`)
    }).catch(error => {
      console.log('Post error', error)
      setPostState(state => ({
        ...state,
        message: 'Post error'
      }));
    });
  };

  return (
    <React.Fragment>
      <PostView
        postState={postState}
        handleChange={handleChange}
        handleChangeNested={handleChangeNested}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
}